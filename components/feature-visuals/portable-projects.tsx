function NjpIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 28 26"
      className={className}
    >
      <path d="M19.361 0a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 .293.707v16a2 2 0 0 1-2 2h-3a1 1 0 0 1 0-2h3V9h-6a1 1 0 0 1-1-1V2h-11v9a1 1 0 0 1-2 0V2a2 2 0 0 1 2-2zm-6.049 15c.68 0 1.073.417 1.073 1.153v4.796c0 1.957-1.16 3.051-3.1 3.051-1.37 0-2.396-.61-2.847-1.655a2.2 2.2 0 0 1-.165-.822c0-.622.399-1.026.997-1.026.533 0 .837.253 1.007.839.141.507.487.785.985.785.633 0 .978-.41.978-1.19v-4.778c0-.736.393-1.153 1.072-1.153M6.37 15c.645 0 1.02.393 1.02 1.1v6.843c0 .67-.364 1.038-1.014 1.038-.434 0-.72-.174-1.031-.615l-3.258-4.634h-.047v4.15c0 .707-.38 1.1-1.02 1.1-.644 0-1.019-.393-1.019-1.1v-6.831C0 15.368.375 15 1.043 15c.41 0 .703.181 1.025.616L5.303 20.2h.047v-4.1c0-.707.38-1.1 1.02-1.1m13.055.133c1.816 0 3.047 1.214 3.047 3.087 0 1.86-1.295 3.074-3.176 3.074h-1.383v1.534c0 .737-.392 1.153-1.072 1.153s-1.078-.416-1.078-1.153v-6.535c0-.737.398-1.16 1.078-1.16zm-1.512 4.494h.932c.914 0 1.453-.49 1.453-1.401 0-.906-.54-1.396-1.442-1.396h-.943zM20.362 7h3.585l-3.586-3.586z" />
    </svg>
  )
}

// Grid settings
const GRID_COLS = 5
const ICON_SIZE = 24
const GAP = 48 // gap in pixels
const COL_WIDTH = ICON_SIZE + GAP

// Layout
const ROW_HEIGHT = ICON_SIZE + GAP
const VISIBLE_ROWS = 6
const BUFFER_ROWS = 1

// Animation duration in seconds (time to scroll one row height)
const ANIMATION_DURATION = 16

// Direction per column: 1 = down, -1 = up (matching the screenshot pattern)
const COLUMN_DIRECTIONS = [1, -1, 1, -1, 1]

// Fade effect (percentage of container height)
const FADE_START = 5 // top edge starts transparent
const FADE_VISIBLE_START = 40 // becomes fully visible
const FADE_VISIBLE_END = 60 // stays fully visible until
const FADE_END = 95 // bottom edge becomes transparent

export function PortableProjects() {
  const containerHeight = ROW_HEIGHT * VISIBLE_ROWS
  const gridWidth = GRID_COLS * ICON_SIZE + (GRID_COLS - 1) * GAP

  // Render rows per column - each column scrolls independently
  const totalRows = VISIBLE_ROWS + BUFFER_ROWS * 2
  const rows = Array.from({ length: totalRows }, (_, i) => i)

  return (
    <div className="aspect-square rounded-xs overflow-hidden relative flex items-center justify-center">
      <style>
        {`
          @keyframes scrollDown {
            from { transform: translateY(0); }
            to { transform: translateY(-${ROW_HEIGHT}px); }
          }
          @keyframes scrollUp {
            from { transform: translateY(0); }
            to { transform: translateY(${ROW_HEIGHT}px); }
          }
        `}
      </style>
      <div
        className="relative overflow-hidden"
        style={{
          height: containerHeight,
          width: gridWidth,
          maskImage: `linear-gradient(to bottom, transparent ${FADE_START}%, black ${FADE_VISIBLE_START}%, black ${FADE_VISIBLE_END}%, transparent ${FADE_END}%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent ${FADE_START}%, black ${FADE_VISIBLE_START}%, black ${FADE_VISIBLE_END}%, transparent ${FADE_END}%)`,
        }}
      >
        {/* Render each column independently */}
        {Array.from({ length: GRID_COLS }).map((_, colIndex) => {
          const direction = COLUMN_DIRECTIONS[colIndex]
          const animationName = direction === 1 ? 'scrollDown' : 'scrollUp'

          return (
            <div
              key={colIndex}
              className="absolute"
              style={{
                left: colIndex * COL_WIDTH,
                width: ICON_SIZE,
                height: '100%',
                animation: `${animationName} ${ANIMATION_DURATION}s linear infinite`,
                willChange: 'transform',
              }}
            >
              {rows.map((rowIndex) => {
                const baseTop = (rowIndex - BUFFER_ROWS) * ROW_HEIGHT

                return (
                  <div key={rowIndex} className="absolute" style={{ top: baseTop }}>
                    <NjpIcon size={ICON_SIZE} className="text-gray-500/80" />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
