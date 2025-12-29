import Image from 'next/image'

// Hexagon size and spacing
const HEX_WIDTH = 140
const HEX_GAP = 8
const HEX_CORNER_RADIUS = 4
const LOGO_SIZE = 40
const FADE_START = 40
const FADE_END = 70

// Provider logos with their grid positions (col, row)
const PROVIDERS = [
  // Row 0
  { logo: '/images/openai-symbol.svg', name: 'OpenAI', col: 0, row: 0 },
  { logo: '/images/replicate-symbol.svg', name: 'Replicate', col: 1, row: 0 },
  { logo: '/images/anthropic-symbol.svg', name: 'Anthropic', col: 2, row: 0 },
  { logo: '/images/gemini-symbol.svg', name: 'Gemini', col: 3, row: 0 },
  // Row 1
  { logo: '/images/fal-symbol.svg', name: 'Fal', col: 0, row: 1 },
  { logo: '/images/xai-symbol.svg', name: 'xAI', col: 1, row: 1 },
  { logo: '/images/openai-symbol.svg', name: 'OpenAI', col: 2, row: 1 },
  { logo: '/images/replicate-symbol.svg', name: 'Replicate', col: 3, row: 1 },
  // Row 2
  { logo: '/images/anthropic-symbol.svg', name: 'Anthropic', col: 0, row: 2 },
  { logo: '/images/gemini-symbol.svg', name: 'Gemini', col: 1, row: 2 },
  { logo: '/images/fal-symbol.svg', name: 'Fal', col: 2, row: 2 },
  { logo: '/images/xai-symbol.svg', name: 'xAI', col: 3, row: 2 },
  // Row 3
  { logo: '/images/openai-symbol.svg', name: 'OpenAI', col: 0, row: 3 },
  { logo: '/images/replicate-symbol.svg', name: 'Replicate', col: 1, row: 3 },
  { logo: '/images/anthropic-symbol.svg', name: 'Anthropic', col: 2, row: 3 },
  { logo: '/images/gemini-symbol.svg', name: 'Gemini', col: 3, row: 3 },
]

// Empty hexagon positions (col, row) - none needed since all hexagons have logos
const EMPTY_HEXES: { col: number; row: number }[] = []

// Calculate hex center position for flat-top hexagon honeycomb
function getHexPosition(col: number, row: number) {
  // For flat-top hexagons:
  // - Horizontal spacing = width * 0.75 (hexagons overlap horizontally)
  // - Vertical spacing = height (full height between rows)
  // - Odd columns are offset vertically by half the height
  const height = HEX_WIDTH * 0.866 // height = width * sin(60°)
  const horizSpacing = HEX_WIDTH * 0.75 + HEX_GAP * 0.75
  const vertSpacing = height + HEX_GAP
  const offsetY = col % 2 === 1 ? vertSpacing / 2 : 0
  return {
    x: col * horizSpacing + HEX_WIDTH / 2,
    y: row * vertSpacing + offsetY + height / 2,
  }
}

// Generate flat-top hexagon path with rounded corners
function hexPath(cx: number, cy: number, width: number, cornerRadius: number = HEX_CORNER_RADIUS) {
  // Flat-top hexagon: vertices at 0°, 60°, 120°, 180°, 240°, 300°
  const radius = width / 2
  const vertices = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    vertices.push({
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    })
  }

  // Build path with rounded corners using quadratic bezier curves
  let path = ''
  for (let i = 0; i < 6; i++) {
    const curr = vertices[i]
    const next = vertices[(i + 1) % 6]
    const prev = vertices[(i + 5) % 6]

    // Calculate points slightly before and after the vertex
    const toPrev = { x: prev.x - curr.x, y: prev.y - curr.y }
    const toNext = { x: next.x - curr.x, y: next.y - curr.y }
    const lenPrev = Math.sqrt(toPrev.x ** 2 + toPrev.y ** 2)
    const lenNext = Math.sqrt(toNext.x ** 2 + toNext.y ** 2)

    const startX = curr.x + (toPrev.x / lenPrev) * cornerRadius
    const startY = curr.y + (toPrev.y / lenPrev) * cornerRadius
    const endX = curr.x + (toNext.x / lenNext) * cornerRadius
    const endY = curr.y + (toNext.y / lenNext) * cornerRadius

    if (i === 0) {
      path = `M ${startX},${startY}`
    } else {
      path += ` L ${startX},${startY}`
    }
    path += ` Q ${curr.x},${curr.y} ${endX},${endY}`
  }
  path += ' Z'
  return path
}

export function MultiProvider() {
  const svgSize = 380
  const offsetX = -40
  const offsetY = -60

  return (
    <div className="aspect-square rounded-xs flex items-center justify-center overflow-hidden">
      <div
        className="relative"
        style={{
          maskImage: `radial-gradient(ellipse 80% 80% at center, black ${FADE_START}%, transparent ${FADE_END}%)`,
          WebkitMaskImage: `radial-gradient(ellipse 80% 80% at center, black ${FADE_START}%, transparent ${FADE_END}%)`,
        }}
      >
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
          {/* Empty hexagons */}
          {EMPTY_HEXES.map((hex, i) => {
            const pos = getHexPosition(hex.col, hex.row)
            return (
              <path
                key={`empty-${i}`}
                d={hexPath(pos.x + offsetX, pos.y + offsetY, HEX_WIDTH)}
                fill="rgba(255, 255, 255, 0.25)"
                stroke="rgba(156, 163, 175, 0.3)"
                strokeWidth="1"
              />
            )
          })}
          {/* Provider hexagons */}
          {PROVIDERS.map((provider, i) => {
            const pos = getHexPosition(provider.col, provider.row)
            return (
              <path
                key={`provider-${i}`}
                d={hexPath(pos.x + offsetX, pos.y + offsetY, HEX_WIDTH)}
                fill="rgba(255, 255, 255, 0.35)"
                stroke="rgba(156, 163, 175, 0.4)"
                strokeWidth="1"
              />
            )
          })}
        </svg>

        {/* Provider logos */}
        {PROVIDERS.map((provider, i) => {
          const pos = getHexPosition(provider.col, provider.row)
          return (
            <div
              key={`logo-${i}`}
              className="absolute flex items-center justify-center"
              style={{
                left: pos.x + offsetX - LOGO_SIZE / 2,
                top: pos.y + offsetY - LOGO_SIZE / 2,
                width: LOGO_SIZE,
                height: LOGO_SIZE,
              }}
            >
              <Image
                src={provider.logo}
                alt={provider.name}
                width={LOGO_SIZE}
                height={LOGO_SIZE}
                className="opacity-60"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
