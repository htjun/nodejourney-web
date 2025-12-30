'use client'

import { ShieldCheck } from 'lucide-react'

const CIRCLE_GAP = 28
const INNER_RADIUS = 60

export function PrivacyFirst() {
  return (
    <div className="aspect-square rounded-xs flex items-center justify-center">
      <div className="relative">
        {/* Animated circular paths - wave effect with fading opacity */}
        <svg width="180" height="180" viewBox="0 0 180 180" className="overflow-visible">
          {/* Innermost circle - strongest opacity */}
          <circle
            cx="90"
            cy="90"
            r={INNER_RADIUS}
            fill="none"
            stroke="rgba(156, 163, 175, 0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="pf-circuit-path"
          />
          {/* Second circle */}
          <circle
            cx="90"
            cy="90"
            r={INNER_RADIUS + CIRCLE_GAP}
            fill="none"
            stroke="rgba(156, 163, 175, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="pf-circuit-path"
          />
          {/* Third circle */}
          <circle
            cx="90"
            cy="90"
            r={INNER_RADIUS + CIRCLE_GAP * 2}
            fill="none"
            stroke="rgba(156, 163, 175, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="pf-circuit-path"
          />
          {/* Fourth circle */}
          <circle
            cx="90"
            cy="90"
            r={INNER_RADIUS + CIRCLE_GAP * 3}
            fill="none"
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="pf-circuit-path"
          />
          {/* Outermost circle - faintest */}
          <circle
            cx="90"
            cy="90"
            r={INNER_RADIUS + CIRCLE_GAP * 4}
            fill="none"
            stroke="rgba(156, 163, 175, 0.1)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="pf-circuit-path"
          />
        </svg>

        {/* Shield icon in center */}
        <ShieldCheck
          size={48}
          strokeWidth={1.5}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <style jsx>{`
        .pf-circuit-path {
          animation: pfCircuitFlow 3s linear infinite;
        }
        @keyframes pfCircuitFlow {
          to {
            stroke-dashoffset: -14;
          }
        }
      `}</style>
    </div>
  )
}
