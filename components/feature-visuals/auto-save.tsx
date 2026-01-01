'use client'

const CIRCLE_RADIUS = 16
const CHECK_PATH_LENGTH = 16
const CIRCUMFERENCE = 100.53 // 2 * PI * 16
const LINE_LENGTH = 60
const CHECKPOINT_SPACING = LINE_LENGTH + CIRCLE_RADIUS * 2 // 92

const CYCLE = 2 // seconds per cycle
const PART1_DURATION = CYCLE * 3 // 6s
const PART2_START = PART1_DURATION - 0.05 // Start Part 2 slightly early to prevent flicker

// Checkpoint configuration: position is multiplier for CHECKPOINT_SPACING offset from CENTER_X
// Part 1 (checkpoints 1-3): plays once, builds up 3 checkpoints
// Part 2 (checkpoints 4-6): infinite loop, 3 checkpoints at positions 1-3
const CHECKPOINTS = [
  { index: 1, position: 0, part: 1 },
  { index: 2, position: 1, part: 1 },
  { index: 3, position: 2, part: 1 },
  { index: 4, position: 1, part: 2 },
  { index: 5, position: 2, part: 2 },
  { index: 6, position: 3, part: 2 },
]

export function AutoSave() {
  const CENTER_X = 100

  return (
    <div className="aspect-square rounded-xs flex items-center justify-center overflow-hidden">
      <div className="relative">
        <svg width="200" height="60" viewBox="0 0 200 60" className="overflow-visible as-container">
          {CHECKPOINTS.map(({ index, position }) => {
            const cx = CENTER_X + CHECKPOINT_SPACING * position
            return (
              <g key={index} className={`as-checkpoint-${index}`}>
                <circle
                  cx={cx}
                  cy="30"
                  r={CIRCLE_RADIUS}
                  fill="rgba(255, 255, 255, 0.4)"
                  className={`as-bg-${index}`}
                />
                <polyline
                  points={`${cx - 5} 30 ${cx - 1.5} 33.5 ${cx + 5.5} 26`}
                  fill="none"
                  stroke="rgb(55, 65, 81)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`as-check-${index}`}
                />
                <circle
                  cx={cx}
                  cy="30"
                  r={CIRCLE_RADIUS}
                  fill="none"
                  stroke="rgba(156, 163, 175, 0.6)"
                  strokeWidth="1.5"
                  transform={`rotate(-90 ${cx} 30)`}
                  className={`as-circle-${index}`}
                />
                <g className={`as-line-${index}`}>
                  <line
                    x1={cx + CIRCLE_RADIUS}
                    y1="30"
                    x2={cx + CHECKPOINT_SPACING - CIRCLE_RADIUS}
                    y2="30"
                    stroke="rgba(156, 163, 175, 0.6)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </g>
              </g>
            )
          })}
        </svg>
      </div>

      <style>{`
        /*
         * Part 1: 3 cycles (6s) - plays once, builds up 3 checkpoints
         * Part 2: 1 cycle (2s) - infinite loop, continues the pattern
         * Per cycle: dot -> circle (0-25%) -> line + scroll (25-75%) -> hold (75-100%)
         */

        /* Container scroll */
        .as-container {
          animation: asScroll ${CYCLE * 3}s ease-in-out forwards;
        }
        /*
         * Keyframe timing: 3 cycles, each 33.33% of total duration
         * Per cycle phases:
         *   0-25%: dot appears, circle draws
         *   25-75%: line reveals, container scrolls
         *   75-100%: hold position
         *
         * Cycle 1 (0-33.33%):    0%, 8.33% (hold), 25% (scroll)
         * Cycle 2 (33.33-66.67%): 33.33%, 41.67% (hold), 58.33% (scroll)
         * Cycle 3 (66.67-100%):   66.67%, 75% (hold), 91.67% (scroll)
         */
        @keyframes asScroll {
          0%, 8.33%    { transform: translateX(0); }
          25%, 41.67%  { transform: translateX(-${CHECKPOINT_SPACING}px); }
          58.33%, 75%  { transform: translateX(-${CHECKPOINT_SPACING * 2}px); }
          91.67%, 100% { transform: translateX(-${CHECKPOINT_SPACING * 3}px); }
        }

        /* Shared keyframes */
        @keyframes asCheck {
          0% { stroke-dashoffset: ${CHECK_PATH_LENGTH}; }
          25%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes asCircle {
          0% { stroke-dashoffset: ${CIRCUMFERENCE}; }
          25%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes asLine {
          0%, 25% { clip-path: inset(0 100% 0 0); }
          75%, 100% { clip-path: inset(0 0% 0 0); }
        }

        /* Base styles */
        .as-bg-1, .as-bg-2, .as-bg-3, .as-bg-4, .as-bg-5, .as-bg-6 {
          opacity: 0;
        }
        .as-check-1, .as-check-2, .as-check-3, .as-check-4, .as-check-5, .as-check-6 {
          stroke-dasharray: ${CHECK_PATH_LENGTH};
          stroke-dashoffset: ${CHECK_PATH_LENGTH};
        }
        .as-circle-1, .as-circle-2, .as-circle-3, .as-circle-4, .as-circle-5, .as-circle-6 {
          stroke-dasharray: ${CIRCUMFERENCE};
          stroke-dashoffset: ${CIRCUMFERENCE};
        }
        .as-line-1, .as-line-2, .as-line-3, .as-line-4, .as-line-5, .as-line-6 {
          clip-path: inset(0 100% 0 0);
        }

        /* Background fade keyframes */
        @keyframes asBgFade {
          0% { opacity: 0; }
          25%, 100% { opacity: 1; }
        }

        /* GPU compositing to prevent Chrome flicker on animation loop restart */
        .as-checkpoint-4, .as-checkpoint-5, .as-checkpoint-6,
        .as-bg-6, .as-check-6, .as-circle-6, .as-line-6 {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          will-change: transform, opacity;
        }

        /* Part 1: Checkpoints 1-3 (disappear after Part 1 ends) */
        .as-bg-1     { animation: asBgFade ${CYCLE}s ease-in-out forwards, asHideBg 0s ${CYCLE * 3}s forwards; }
        .as-check-1  { animation: asCheck ${CYCLE}s ease-in-out forwards, asHideCheck 0s ${CYCLE * 3}s forwards; }
        .as-circle-1 { animation: asCircle ${CYCLE}s ease-in-out forwards, asHideCircle 0s ${CYCLE * 3}s forwards; }
        .as-line-1   { animation: asLine ${CYCLE}s ease-in forwards, asHideLine 0s ${CYCLE * 3}s forwards; }

        .as-bg-2     { animation: asBgFade ${CYCLE}s ease-in-out ${CYCLE}s forwards, asHideBg 0s ${CYCLE * 3}s forwards; }
        .as-check-2  { animation: asCheck ${CYCLE}s ease-in-out ${CYCLE}s forwards, asHideCheck 0s ${CYCLE * 3}s forwards; }
        .as-circle-2 { animation: asCircle ${CYCLE}s ease-in-out ${CYCLE}s forwards, asHideCircle 0s ${CYCLE * 3}s forwards; }
        .as-line-2   { animation: asLine ${CYCLE}s ease-in ${CYCLE}s forwards, asHideLine 0s ${CYCLE * 3}s forwards; }

        .as-bg-3     { animation: asBgFade ${CYCLE}s ease-in-out ${CYCLE * 2}s forwards, asHideBg 0s ${CYCLE * 3}s forwards; }
        .as-check-3  { animation: asCheck ${CYCLE}s ease-in-out ${CYCLE * 2}s forwards, asHideCheck 0s ${CYCLE * 3}s forwards; }
        .as-circle-3 { animation: asCircle ${CYCLE}s ease-in-out ${CYCLE * 2}s forwards, asHideCircle 0s ${CYCLE * 3}s forwards; }
        .as-line-3   { animation: asLine ${CYCLE}s ease-in ${CYCLE * 2}s forwards, asHideLine 0s ${CYCLE * 3}s forwards; }

        @keyframes asHideBg {
          to { opacity: 0; }
        }
        @keyframes asHideCheck {
          to { stroke-dashoffset: ${CHECK_PATH_LENGTH}; }
        }
        @keyframes asHideCircle {
          to { stroke-dashoffset: ${CIRCUMFERENCE}; }
        }
        @keyframes asHideLine {
          to { clip-path: inset(0 100% 0 0); }
        }

        /*
         * Part 2: Infinite loop with 3 checkpoints visible
         * - Checkpoint 4 (position 1): static, always visible after Part 1
         * - Checkpoint 5 (position 2): static, always visible after Part 1
         * - Checkpoint 6 (position 3): animates in each cycle (like Part 1 style)
         * - Container scrolls left by 1 spacing, then snaps back
         * - Loop duration: 2s (same as Part 1 cycle)
         */

        /* Part 2 container scroll - loops after Part 1 ends */
        .as-checkpoint-4, .as-checkpoint-5, .as-checkpoint-6 {
          animation: asPart2Scroll ${CYCLE}s ease-in-out ${PART2_START}s infinite;
        }
        @keyframes asPart2Scroll {
          0%, 25% { transform: translateX(0); }
          75%, 100% { transform: translateX(-${CHECKPOINT_SPACING}px); }
        }

        /* Checkpoints 4-5: static (already built), just appear after Part 1 */
        .as-bg-4     { animation: asShowBg 0s ${PART2_START}s forwards; }
        .as-check-4  { animation: asShowCheck 0s ${PART2_START}s forwards; }
        .as-circle-4 { animation: asShowCircle 0s ${PART2_START}s forwards; }
        .as-line-4   { animation: asShowLine 0s ${PART2_START}s forwards; }
        .as-bg-5     { animation: asShowBg 0s ${PART2_START}s forwards; }
        .as-check-5  { animation: asShowCheck 0s ${PART2_START}s forwards; }
        .as-circle-5 { animation: asShowCircle 0s ${PART2_START}s forwards; }
        .as-line-5   { animation: asShowLine 0s ${PART2_START}s forwards; }

        /* Checkpoint 6: animates in each loop cycle (same timing as Part 1) */
        .as-bg-6     { animation: asBgLoop ${CYCLE}s ease-in-out ${PART2_START}s infinite; }
        .as-check-6  { animation: asCheckLoop ${CYCLE}s ease-in-out ${PART2_START}s infinite; }
        .as-circle-6 { animation: asCircleLoop ${CYCLE}s ease-in-out ${PART2_START}s infinite; }
        .as-line-6   { animation: asLineLoop ${CYCLE}s ease-in ${PART2_START}s infinite; }

        @keyframes asShowBg {
          to { opacity: 1; }
        }
        @keyframes asShowCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes asShowCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes asShowLine {
          to { clip-path: inset(0 0% 0 0); }
        }

        /* Looping keyframes for Part 2 - same timing as Part 1 but resets at end */
        @keyframes asBgLoop {
          0% { opacity: 0; }
          25%, 100% { opacity: 1; }
        }
        @keyframes asCheckLoop {
          0% { stroke-dashoffset: ${CHECK_PATH_LENGTH}; }
          25%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes asCircleLoop {
          0% { stroke-dashoffset: ${CIRCUMFERENCE}; }
          25%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes asLineLoop {
          0%, 25% { clip-path: inset(0 100% 0 0); }
          75%, 100% { clip-path: inset(0 0% 0 0); }
        }
      `}</style>
    </div>
  )
}
