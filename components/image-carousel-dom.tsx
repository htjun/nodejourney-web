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
const FEATHER_WIDTH = 500

interface Point {
  x: number
  y: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface ImageCarouselDomProps {
  className?: string
}

export function ImageCarouselDom({ className }: ImageCarouselDomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const pendingTargetRef = useRef<number>(0)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [clickOrigin, setClickOrigin] = useState<Point | null>(null)
  const [progress, setProgress] = useState(0)
  const [cursorSide, setCursorSide] = useState<'left' | 'right' | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Track container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Keep pendingTargetRef in sync when not transitioning
  useEffect(() => {
    if (!isTransitioning) {
      pendingTargetRef.current = currentIndex
    }
  }, [currentIndex, isTransitioning])

  // Start transition animation
  const startTransition = useCallback(
    (targetIndex: number, origin: Point) => {
      // If already transitioning, update currentIndex to nextIndex (the revealed image becomes new base)
      if (isTransitioning && nextIndex !== null) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        setCurrentIndex(nextIndex)
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
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [isTransitioning, nextIndex]
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

  // Calculate reveal radius
  const easedProgress = easeOutCubic(progress)
  const maxRadius = Math.hypot(containerSize.width, containerSize.height)
  const revealRadius = easedProgress * maxRadius * 1.2
  const innerRadius = Math.max(0, revealRadius - FEATHER_WIDTH)

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full aspect-1400/900 overflow-hidden',
        cursorSide === 'left' && 'cursor-w-resize',
        cursorSide === 'right' && 'cursor-e-resize',
        !cursorSide && 'cursor-default',
        className
      )}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base layer - current image */}
      <img
        src={IMAGE_PATHS[currentIndex]}
        alt=""
        className="absolute inset-0 w-full h-full object-fill"
        draggable={false}
      />

      {/* Reveal layer - next image with circular mask */}
      {isTransitioning && nextIndex !== null && clickOrigin && (
        <>
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: `radial-gradient(circle at ${clickOrigin.x}px ${clickOrigin.y}px, black ${innerRadius}px, transparent ${revealRadius}px)`,
              maskImage: `radial-gradient(circle at ${clickOrigin.x}px ${clickOrigin.y}px, black ${innerRadius}px, transparent ${revealRadius}px)`,
            }}
          >
            <img
              src={IMAGE_PATHS[nextIndex]}
              alt=""
              className="w-full h-full object-fill"
              draggable={false}
            />
          </div>

          {/* Glow overlay at transition edge */}
          {revealRadius > FEATHER_WIDTH && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${clickOrigin.x}px ${clickOrigin.y}px, transparent ${Math.max(0, revealRadius - FEATHER_WIDTH - 20)}px, rgba(255,255,255,0.08) ${revealRadius - 10}px, transparent ${revealRadius + 10}px)`,
              }}
            />
          )}
        </>
      )}
    </div>
  )
}
