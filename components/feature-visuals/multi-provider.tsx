'use client'

import Image from 'next/image'
import { LogoIcon } from '@/components/icons/logo'

const PROVIDERS = [
  { logo: '/images/openai-symbol.svg', name: 'OpenAI' },
  { logo: '/images/anthropic-symbol.svg', name: 'Anthropic' },
  { logo: '/images/gemini-symbol.svg', name: 'Gemini' },
  { logo: '/images/xai-symbol.svg', name: 'xAI' },
  { logo: '/images/replicate-symbol.svg', name: 'Replicate' },
  { logo: '/images/fal-symbol.svg', name: 'Fal' },
]

const ORBIT_RADIUS = 130
const PROVIDER_CIRCLE_SIZE = 60
const CENTER_CIRCLE_SIZE = 80
const LOGO_SIZE = 20
const SVG_SIZE = 260

export function MultiProvider() {
  const center = SVG_SIZE / 2

  return (
    <div className="aspect-square rounded-xs flex items-center justify-center overflow-hidden">
      <div className="relative" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
        {/* Rotating wrapper for lines and provider circles */}
        <div className="absolute inset-0 rotating-ring">
          {/* SVG for dashed lines */}
          <svg width={SVG_SIZE} height={SVG_SIZE} className="absolute inset-0">
            {PROVIDERS.map((_, i) => {
              const angle = (i * 360) / PROVIDERS.length - 90
              const rad = (angle * Math.PI) / 180
              const x = center + ORBIT_RADIUS * Math.cos(rad)
              const y = center + ORBIT_RADIUS * Math.sin(rad)
              return (
                <line
                  key={`line-${i}`}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(156, 163, 175, 0.5)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className="dash-flow"
                />
              )
            })}
          </svg>

          {/* Provider circles */}
          {PROVIDERS.map((provider, i) => {
            const angle = (i * 360) / PROVIDERS.length - 90
            const rad = (angle * Math.PI) / 180
            const x = center + ORBIT_RADIUS * Math.cos(rad)
            const y = center + ORBIT_RADIUS * Math.sin(rad)
            return (
              <div
                key={`provider-${i}`}
                className="absolute bg-white/40 backdrop-blur-lg border border-gray-400/30 rounded-full flex items-center justify-center counter-rotate"
                style={{
                  width: PROVIDER_CIRCLE_SIZE,
                  height: PROVIDER_CIRCLE_SIZE,
                  left: x - PROVIDER_CIRCLE_SIZE / 2,
                  top: y - PROVIDER_CIRCLE_SIZE / 2,
                }}
              >
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={LOGO_SIZE}
                  height={LOGO_SIZE}
                  className="opacity-70"
                />
              </div>
            )
          })}
        </div>

        {/* Center circle (static, does not rotate) */}
        <div
          className="absolute bg-white/40 backdrop-blur-lg border border-gray-400/50 rounded-full shadow-xl/5 flex items-center justify-center"
          style={{
            width: CENTER_CIRCLE_SIZE,
            height: CENTER_CIRCLE_SIZE,
            left: center - CENTER_CIRCLE_SIZE / 2,
            top: center - CENTER_CIRCLE_SIZE / 2,
          }}
        >
          <LogoIcon className="size-7" />
        </div>
      </div>

      <style jsx>{`
        .rotating-ring {
          animation: rotate 120s linear infinite;
        }
        .counter-rotate {
          animation: counter-rotate 120s linear infinite;
        }
        .dash-flow {
          animation: dashFlow 2s linear infinite;
        }
        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counter-rotate {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes dashFlow {
          to {
            stroke-dashoffset: 14;
          }
        }
      `}</style>
    </div>
  )
}
