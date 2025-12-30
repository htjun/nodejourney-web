'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// Grid settings
const GRID_SIZE = 5
const ICON_SIZE = 24
const GRID_GAP = 12 // Tailwind gap-12 = 3rem

// Mask settings
const MASK_RADIUS = 120
const BASE_OPACITY = 0.15
const HIGHLIGHT_OPACITY = 0.7

// Animation settings
const ANIMATION_SPEED = 0.01
const WANDER_RANGE_X = 20
const WANDER_RANGE_Y = 20
const SECONDARY_RANGE_X = 10
const SECONDARY_RANGE_Y = 10
const FREQUENCY_X1 = 1
const FREQUENCY_X2 = 0.7
const FREQUENCY_Y1 = 0.8
const FREQUENCY_Y2 = 1.3

export function PortableProjects() {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    let animationId: number
    let time = 0

    const animate = () => {
      time += ANIMATION_SPEED
      const x =
        50 +
        Math.sin(time * FREQUENCY_X1) * WANDER_RANGE_X +
        Math.sin(time * FREQUENCY_X2) * SECONDARY_RANGE_X
      const y =
        50 +
        Math.cos(time * FREQUENCY_Y1) * WANDER_RANGE_Y +
        Math.cos(time * FREQUENCY_Y2) * SECONDARY_RANGE_Y
      setPosition({ x, y })
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const grid = (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gap: `${GRID_GAP * 0.25}rem`,
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
        <Image key={i} src="/images/njp-icon.svg" alt="" width={ICON_SIZE} height={ICON_SIZE} />
      ))}
    </div>
  )

  const maskGradient = `radial-gradient(circle ${MASK_RADIUS}px at ${position.x}% ${position.y}%, black 0%, transparent 100%)`

  return (
    <div className="aspect-square rounded-xs flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Base layer - faded */}
        <div style={{ opacity: BASE_OPACITY }}>{grid}</div>

        {/* Top layer - with circular mask that moves */}
        <div
          className="absolute inset-0"
          style={{
            opacity: HIGHLIGHT_OPACITY,
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
        >
          {grid}
        </div>
      </div>
    </div>
  )
}
