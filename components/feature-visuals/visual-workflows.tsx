'use client'

import { Image } from 'lucide-react'

function Node({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/40 backdrop-blur-sm border border-gray-400/80 rounded-xl shadow-md/5 w-20 h-20 flex items-center justify-center text-gray-700 font-medium text-sm">
      {children}
    </div>
  )
}

export function VisualWorkflows() {
  return (
    <div
      className="aspect-square rounded-xs flex flex-col items-center justify-center gap-6 p-6"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        backgroundPosition: '4px 4px',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Top row: Text -- line -- JSON */}
      <div className="flex items-center">
        {/* Text Node */}
        <Node>Text</Node>

        {/* Line between Text and JSON */}
        <svg width="80" height="2" className="overflow-visible -mx-px">
          <line
            x1="0"
            y1="1"
            x2="80"
            y2="1"
            stroke="rgba(156, 163, 175, 0.6)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            style={{ animation: 'dashFlow 2s linear infinite' }}
          />
        </svg>

        {/* JSON Node */}
        <Node>JSON</Node>
      </div>

      {/* Curved line from JSON bottom-center to Image top-center */}
      <svg width="80" height="48" className="overflow-visible -my-6 translate-x-10">
        <path
          d="M 80 0 C 80 24, 0 24, 0 48"
          fill="none"
          stroke="rgba(156, 163, 175, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          style={{ animation: 'dashFlowCurve 2s linear infinite' }}
        />
      </svg>

      {/* Image Node */}
      <Node>
        <Image size={24} strokeWidth={1.5} />
      </Node>

      <style jsx>{`
        @keyframes dashFlow {
          to {
            stroke-dashoffset: -14;
          }
        }
        @keyframes dashFlowCurve {
          to {
            stroke-dashoffset: -14;
          }
        }
      `}</style>
    </div>
  )
}
