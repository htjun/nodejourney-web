'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { IMAGE_THEMES } from '@/lib/data/home'
import { cn } from '@/lib/utils'

const IMAGES = [
  { path: '/images/app-05.jpg', alt: 'Nodejourney app screenshot' },
  {
    path: '/images/app-01.jpg',
    alt: 'Nodejourney canvas with AI-generated images and node connections',
  },
  {
    path: '/images/app-02.jpg',
    alt: 'Nodejourney workflow showing image generation pipeline',
  },
  {
    path: '/images/app-03.jpg',
    alt: 'Nodejourney interface with multiple AI provider options',
  },
  {
    path: '/images/app-04.jpg',
    alt: 'Nodejourney project with exported image results',
  },
]

const TRANSITION_DURATION = 1600
const HOVER_ZONE_WIDTH = 0.5
const FEATHER_WIDTH = 500
const AUTO_CHANGE_INTERVAL = 3000

interface Point {
  x: number
  y: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface ImageCarouselProps {
  className?: string
  onIndexChange?: (index: number) => void
}

export function ImageCarousel({ className, onIndexChange }: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const pendingTargetRef = useRef<number>(0)
  const autoProgressAnimationRef = useRef<number | null>(null)
  const autoProgressStartRef = useRef<number>(0)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [clickOrigin, setClickOrigin] = useState<Point | null>(null)
  const [progress, setProgress] = useState(0)
  const [cursorSide, setCursorSide] = useState<'left' | 'right' | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [autoProgress, setAutoProgress] = useState(0)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

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

  // Notify parent of index changes (when transition starts, not ends)
  useEffect(() => {
    if (isTransitioning && nextIndex !== null) {
      onIndexChange?.(nextIndex)
    } else if (!isTransitioning) {
      onIndexChange?.(currentIndex)
    }
  }, [currentIndex, nextIndex, isTransitioning, onIndexChange])

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
      setAutoProgress(0)
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
      // Stop auto-change on user interaction
      setHasUserInteracted(true)
      if (autoProgressAnimationRef.current) {
        cancelAnimationFrame(autoProgressAnimationRef.current)
        autoProgressAnimationRef.current = null
      }

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const zoneWidth = rect.width * HOVER_ZONE_WIDTH

      // Use pendingTargetRef to calculate from the "eventual" target during rapid clicks
      const baseIndex = isTransitioning && nextIndex !== null ? nextIndex : pendingTargetRef.current

      if (x < zoneWidth) {
        // Go to previous (loop)
        const prevIdx = (baseIndex - 1 + IMAGES.length) % IMAGES.length
        pendingTargetRef.current = prevIdx
        startTransition(prevIdx, { x, y })
      } else if (x > rect.width - zoneWidth) {
        // Go to next (loop)
        const nextIdx = (baseIndex + 1) % IMAGES.length
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
      if (autoProgressAnimationRef.current) {
        cancelAnimationFrame(autoProgressAnimationRef.current)
      }
    }
  }, [])

  // Auto-progress animation effect
  useEffect(() => {
    if (hasUserInteracted || isTransitioning) {
      return
    }

    // Reset progress and start animation
    setAutoProgress(0)
    autoProgressStartRef.current = performance.now()

    const animateProgress = (currentTime: number) => {
      if (hasUserInteracted) return

      const elapsed = currentTime - autoProgressStartRef.current
      const newProgress = Math.min(elapsed / AUTO_CHANGE_INTERVAL, 1)

      setAutoProgress(newProgress)

      if (newProgress < 1) {
        autoProgressAnimationRef.current = requestAnimationFrame(animateProgress)
      } else {
        // Progress complete, trigger slide transition
        const nextIdx = (currentIndex + 1) % IMAGES.length
        pendingTargetRef.current = nextIdx

        // Use bottom-right corner as origin
        const origin = { x: containerSize.width, y: containerSize.height }
        startTransition(nextIdx, origin)
      }
    }

    autoProgressAnimationRef.current = requestAnimationFrame(animateProgress)

    return () => {
      if (autoProgressAnimationRef.current) {
        cancelAnimationFrame(autoProgressAnimationRef.current)
        autoProgressAnimationRef.current = null
      }
    }
  }, [currentIndex, isTransitioning, hasUserInteracted, containerSize, startTransition])

  // Calculate reveal radius
  const easedProgress = easeOutCubic(progress)
  const maxRadius = Math.hypot(containerSize.width, containerSize.height)
  const revealRadius = easedProgress * (maxRadius + FEATHER_WIDTH + 100)
  const innerRadius = Math.max(0, revealRadius - FEATHER_WIDTH)

  // Determine displayed index for indicator (show target during transition)
  const displayedIndex = isTransitioning && nextIndex !== null ? nextIndex : currentIndex

  return (
    <div className="flex flex-col">
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
        {/* Preload all images with priority */}
        {IMAGES.map((image, index) => (
          <div
            key={image.path}
            className={cn('absolute inset-0', index !== currentIndex && 'invisible')}
            style={{
              background: `linear-gradient(to bottom right, ${IMAGE_THEMES[index].colors[0]}, ${IMAGE_THEMES[index].colors[1]}, ${IMAGE_THEMES[index].colors[2]})`,
            }}
          >
            <Image
              src={image.path}
              alt={image.alt}
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-fill"
              draggable={false}
            />
          </div>
        ))}

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
              <Image
                src={IMAGES[nextIndex].path}
                alt={IMAGES[nextIndex].alt}
                fill
                quality={100}
                sizes="100vw"
                className="object-fill"
                draggable={false}
              />
            </div>

            {/* Glow overlay at transition edge */}
            {revealRadius > FEATHER_WIDTH && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${clickOrigin.x}px ${
                    clickOrigin.y
                  }px, transparent ${Math.max(
                    0,
                    revealRadius - FEATHER_WIDTH - 20
                  )}px, rgba(255,255,255,0.08) ${
                    revealRadius - 10
                  }px, transparent ${revealRadius + 10}px)`,
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center items-center mt-6 gap-1.5">
        {IMAGES.map((_, index) => {
          const isSelected = index === displayedIndex
          const showProgress = isSelected && !hasUserInteracted

          return (
            <div
              key={index}
              className="relative h-1.5 rounded-full transition-all duration-300 ease-out overflow-hidden"
              style={{
                width: isSelected ? 28 : 6,
                backgroundColor: showProgress ? '#CFCFD8' : isSelected ? '#9FA0AC' : '#CFCFD8',
              }}
            >
              {/* Progress bar (only for selected dot, only in auto mode) */}
              {showProgress && (
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${autoProgress * 100}%`,
                    backgroundColor: '#9FA0AC',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
