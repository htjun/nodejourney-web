function NjpIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 20 19"
      className={className}
    >
      <path d="M9.127 12.09c.338 0 .541.206.541.564v3.732c0 1.238-.736 1.954-1.975 1.954-.87 0-1.551-.413-1.818-1.087a1.3 1.3 0 0 1-.094-.476c0-.32.2-.522.508-.522.275 0 .436.135.524.442.127.447.432.69.868.69.583 0 .9-.353.9-1.01v-3.723c0-.358.203-.564.546-.564M14.007.01c.107.022.202.075.275.148l5.052 5.031a.54.54 0 0 1 .13.218q.012.029.018.058.01.052.011.105v11.5c0 .334-.133.654-.37.89a1.27 1.27 0 0 1-.893.368h-2.166a.54.54 0 1 1 0-1.078h2.166a.18.18 0 0 0 .18-.18V6.11H13.9a.54.54 0 0 1-.543-.54V1.078h-8.12a.18.18 0 0 0-.18.18v8.49a.54.54 0 0 1-1.082 0v-8.49A1.255 1.255 0 0 1 5.237 0H13.9zM4.539 12.09c.33 0 .524.202.524.547v5.13c0 .345-.198.542-.553.543-.25 0-.394-.08-.568-.325l-2.85-4.008h-.038v3.786c0 .345-.2.547-.525.547-.33 0-.528-.202-.528-.547v-5.114c0-.349.216-.559.566-.56.241 0 .39.085.568.325l2.842 4.005h.038v-3.782c0-.345.199-.547.524-.547m8.611.071c1.214 0 2.055.822 2.055 2.034 0 1.213-.867 2.034-2.102 2.035h-1.235v1.515c0 .358-.202.564-.545.565-.338 0-.546-.207-.546-.565v-5.02c0-.353.208-.564.546-.564zm-1.282 3.193h.99c.783 0 1.24-.422 1.24-1.159 0-.728-.453-1.145-1.236-1.145h-.994zM14.44 5.03h3.205L14.44 1.84z" />
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
