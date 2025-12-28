'use client'

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
        <div className="bg-white border border-gray-200 rounded-xl shadow-md/5 w-20 h-14 flex items-center justify-center">
          <span className="text-gray-600 font-medium text-sm">Text</span>
        </div>

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
        <div className="bg-white border border-gray-200 rounded-xl shadow-md/5 w-20 h-14 flex items-center justify-center">
          <span className="text-gray-600 font-medium text-sm">JSON</span>
        </div>
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
      <div className="bg-white border border-gray-200 rounded-xl shadow-md/5 w-20 h-14 flex items-center justify-center">
        <svg width="20" height="16" viewBox="0 0 16 14" fill="none" className="text-gray-600">
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="13"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="5" cy="4" r="1.5" fill="currentColor" />
          <path
            d="M1 11l3.5-4 2.5 3 3-4 5 5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

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
