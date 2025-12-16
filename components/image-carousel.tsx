'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const IMAGE_PATHS = [
  '/images/app-01.jpg',
  '/images/app-02.jpg',
  '/images/app-03.jpg',
  '/images/app-04.jpg',
]

const TRANSITION_DURATION = 1600
const HOVER_ZONE_WIDTH = 0.5

interface Point {
  x: number
  y: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface ImageCarouselProps {
  className?: string
}

export function ImageCarousel({ className }: ImageCarouselProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map())
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const snapshotRef = useRef<HTMLCanvasElement | null>(null) // For interrupted transitions

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [clickOrigin, setClickOrigin] = useState<Point | null>(null)
  const [progress, setProgress] = useState(0)
  const [cursorSide, setCursorSide] = useState<'left' | 'right' | null>(null)
  const [resizeCount, setResizeCount] = useState(0)

  // Preload images
  useEffect(() => {
    const loadedImages = new Map<string, HTMLImageElement>()
    let loadedCount = 0

    IMAGE_PATHS.forEach((path) => {
      const img = new Image()
      img.onload = () => {
        loadedImages.set(path, img)
        loadedCount++
        if (loadedCount === IMAGE_PATHS.length) {
          imagesRef.current = loadedImages
          setImagesLoaded(true)
        }
      }
      img.src = path
    })
  }, [])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      // Trigger re-render after resize
      setResizeCount((c) => c + 1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Main render function
  const render = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || !imagesLoaded) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const currentImg = imagesRef.current.get(IMAGE_PATHS[currentIndex])
    if (!currentImg) {
      ctx.restore()
      return
    }

    // Helper to draw image scaled to fill canvas
    const drawImageFill = (
      targetCtx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      destWidth: number,
      destHeight: number
    ) => {
      targetCtx.drawImage(img, 0, 0, destWidth, destHeight)
    }

    if (isTransitioning && nextIndex !== null && clickOrigin) {
      const nextImg = imagesRef.current.get(IMAGE_PATHS[nextIndex])
      if (!nextImg) {
        ctx.restore()
        return
      }

      const easedProgress = easeOutCubic(progress)
      const maxRadius = Math.hypot(width, height)
      const revealRadius = easedProgress * maxRadius * 1.2
      const featherWidth = 500 // Width of the soft edge

      // Draw current image as base (use snapshot if available, otherwise the actual image)
      if (snapshotRef.current) {
        ctx.drawImage(snapshotRef.current, 0, 0, width, height)
      } else {
        drawImageFill(ctx, currentImg, width, height)
      }

      // Only draw the reveal effect once we have a positive radius
      if (revealRadius > 0) {
        // Create an offscreen canvas for the next image with gradient mask (at full DPR resolution)
        const offscreen = document.createElement('canvas')
        offscreen.width = width * dpr
        offscreen.height = height * dpr
        const offCtx = offscreen.getContext('2d')
        if (offCtx) {
          // Scale for DPR
          offCtx.scale(dpr, dpr)

          // Draw next image to offscreen canvas with cover fit
          drawImageFill(offCtx, nextImg, width, height)

          // Apply radial gradient as mask using destination-in
          offCtx.globalCompositeOperation = 'destination-in'
          const innerRadius = Math.max(0, revealRadius - featherWidth)
          const outerRadius = Math.max(1, revealRadius) // Ensure outer > 0
          const maskGradient = offCtx.createRadialGradient(
            clickOrigin.x,
            clickOrigin.y,
            innerRadius,
            clickOrigin.x,
            clickOrigin.y,
            outerRadius
          )
          maskGradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
          maskGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
          offCtx.fillStyle = maskGradient
          offCtx.fillRect(0, 0, width, height)

          // Draw the masked next image on top (scale back down for main canvas)
          ctx.drawImage(offscreen, 0, 0, width, height)
        }
      }

      // Draw subtle glow at the edge
      if (revealRadius > featherWidth) {
        const glowGradient = ctx.createRadialGradient(
          clickOrigin.x,
          clickOrigin.y,
          Math.max(0, revealRadius - featherWidth - 20),
          clickOrigin.x,
          clickOrigin.y,
          revealRadius + 10
        )
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        glowGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)')
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = glowGradient
        ctx.fillRect(0, 0, width, height)
      }
    } else {
      // Static: draw current image with cover fit
      drawImageFill(ctx, currentImg, width, height)
    }

    ctx.restore()
  }, [imagesLoaded, currentIndex, nextIndex, isTransitioning, clickOrigin, progress, resizeCount])

  // Render on state changes
  useEffect(() => {
    render()
  }, [render])

  // Start transition animation
  const startTransition = useCallback(
    (targetIndex: number, origin: Point) => {
      // If already transitioning, capture current canvas state as snapshot
      if (isTransitioning && canvasRef.current) {
        // Cancel the ongoing animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }

        // Capture current canvas state as snapshot
        const canvas = canvasRef.current
        const snapshot = document.createElement('canvas')
        snapshot.width = canvas.width
        snapshot.height = canvas.height
        const snapshotCtx = snapshot.getContext('2d')
        if (snapshotCtx) {
          snapshotCtx.drawImage(canvas, 0, 0)
        }
        snapshotRef.current = snapshot
      } else {
        // Fresh transition - clear any old snapshot
        snapshotRef.current = null
      }

      setNextIndex(targetIndex)
      setClickOrigin(origin)
      setIsTransitioning(true)
      setProgress(0)
      startTimeRef.current = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTimeRef.current
        const newProgress = Math.min(elapsed / TRANSITION_DURATION, 1)

        setProgress(newProgress)

        if (newProgress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          // Transition complete
          setCurrentIndex(targetIndex)
          setNextIndex(null)
          setIsTransitioning(false)
          setClickOrigin(null)
          setProgress(0)
          snapshotRef.current = null // Clear snapshot
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [isTransitioning]
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const zoneWidth = rect.width * HOVER_ZONE_WIDTH

    if (x < zoneWidth) {
      setCursorSide('left')
    } else if (x > rect.width - zoneWidth) {
      setCursorSide('right')
    } else {
      setCursorSide(null)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorSide(null)
  }, [])

  // Track the pending target for rapid clicks (use ref to avoid stale closure)
  const pendingTargetRef = useRef<number>(currentIndex)

  // Keep pendingTargetRef in sync when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      pendingTargetRef.current = currentIndex
    }
  }, [currentIndex, isTransitioning])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const zoneWidth = rect.width * HOVER_ZONE_WIDTH

      // Use pendingTargetRef to calculate from the "eventual" target during rapid clicks
      const baseIndex = isTransitioning && nextIndex !== null ? nextIndex : pendingTargetRef.current

      if (x < zoneWidth) {
        // Go to previous (loop)
        const prevIdx = (baseIndex - 1 + IMAGE_PATHS.length) % IMAGE_PATHS.length
        pendingTargetRef.current = prevIdx
        startTransition(prevIdx, { x, y })
      } else if (x > rect.width - zoneWidth) {
        // Go to next (loop)
        const nextIdx = (baseIndex + 1) % IMAGE_PATHS.length
        pendingTargetRef.current = nextIdx
        startTransition(nextIdx, { x, y })
      }
    },
    [isTransitioning, nextIndex, startTransition]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-1400/900',
        cursorSide === 'left' && 'cursor-w-resize',
        cursorSide === 'right' && 'cursor-e-resize',
        !cursorSide && 'cursor-default',
        className
      )}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="w-full h-full rounded-xs" />
    </div>
  )
}
