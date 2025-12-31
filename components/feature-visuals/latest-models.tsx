'use client'

import { useEffect, useMemo, useState } from 'react'

const MODELS = [
  'FLUX 2 Max',
  'Nano Banana Pro',
  'GPT-Image 1.5',
  'Imagen 4',
  'Seedream 4',
  'Lucid Origin',
  'Ideogram V3',
  'Recraft V3',
  'Stable Diffusion 3.5',
]

// Layout
const ITEM_HEIGHT = 36
const VISIBLE_ITEMS = 7
const BUFFER_ITEMS = 2 // Extra items above/below visible area

// Animation timing
const SECONDS_PER_ITEM = 1.5

export function LatestModels() {
  const [scrollOffset, setScrollOffset] = useState(0)
  const containerHeight = ITEM_HEIGHT * VISIBLE_ITEMS
  const centerIndex = 3 // Middle of 7 visible items (0-indexed)
  const totalItems = MODELS.length
  const totalRenderedItems = VISIBLE_ITEMS + BUFFER_ITEMS * 2

  // Continuous scroll - never resets, just keeps incrementing
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset((prev) => prev + 1)
    }, SECONDS_PER_ITEM * 1000)
    return () => clearInterval(interval)
  }, [])

  // Calculate which items to render based on scroll position
  const visibleItems = useMemo(() => {
    const items = []
    const startIndex = scrollOffset - BUFFER_ITEMS

    for (let i = 0; i < totalRenderedItems + 1; i++) {
      const virtualIndex = startIndex + i
      const modelIndex = ((virtualIndex % totalItems) + totalItems) % totalItems
      const positionFromCenter = i - (centerIndex + BUFFER_ITEMS)

      items.push({
        model: MODELS[modelIndex],
        virtualIndex,
        positionFromCenter,
      })
    }
    return items
  }, [scrollOffset, totalRenderedItems, totalItems, centerIndex])

  // Get color and scale based on distance from center
  const getItemStyle = (positionFromCenter: number) => {
    const distance = Math.abs(positionFromCenter)
    if (distance === 0) {
      return { color: 'rgb(75, 85, 99)', transform: 'scale(1.15)' }
    } else if (distance === 1) {
      return { color: 'rgba(156, 163, 175, 0.5)', transform: 'scale(1)' }
    } else if (distance === 2) {
      return { color: 'rgba(156, 163, 175, 0.35)', transform: 'scale(1)' }
    } else if (distance === 3) {
      return { color: 'rgba(156, 163, 175, 0.2)', transform: 'scale(1)' }
    }
    return { color: 'rgba(156, 163, 175, 0.15)', transform: 'scale(1)' }
  }

  return (
    <div className="aspect-square rounded-xs flex items-center justify-center">
      <div className="relative overflow-hidden w-full" style={{ height: containerHeight }}>
        {visibleItems.map(({ model, virtualIndex, positionFromCenter }) => {
          // Each item is positioned absolutely based on its position from center
          const top = (positionFromCenter + centerIndex) * ITEM_HEIGHT
          return (
            <div
              key={virtualIndex}
              className="absolute left-0 right-0 flex items-center justify-center font-medium whitespace-nowrap transition-all duration-300 ease-out"
              style={{
                height: ITEM_HEIGHT,
                fontSize: 14,
                top,
                ...getItemStyle(positionFromCenter),
              }}
            >
              {model}
            </div>
          )
        })}
      </div>
    </div>
  )
}
