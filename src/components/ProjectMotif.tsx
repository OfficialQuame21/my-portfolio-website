import { cx } from '../lib/utils'

type Accent = 'blue' | 'violet' | 'cyan'

const strokes: Record<Accent, string> = {
  blue: 'var(--c-accent)',
  violet: 'var(--c-violet)',
  cyan: 'var(--c-cyan)',
}

/**
 * A decorative, abstract motif for a project card — deliberately NOT a mock
 * screenshot, so nothing here can be mistaken for a product UI that does not
 * exist. Replace a card's motif by setting `image` on the project instead.
 *
 * The viewBox is wide and the motifs repeat horizontally, so the `slice` crop
 * reads as intentional at any card width from 320px to 1200px.
 */
export type MotifVariant = 'route' | 'broadcast' | 'community' | 'conversation'

const variantIndex: Record<MotifVariant, number> = { route: 0, broadcast: 1, community: 2, conversation: 3 }

export function ProjectMotif({
  accent,
  variant,
  className,
}: {
  accent: Accent
  variant: MotifVariant
  className?: string
}) {
  const stroke = strokes[accent]
  const id = variantIndex[variant]

  return (
    <svg
      viewBox="0 0 1200 140"
      role="presentation"
      aria-hidden="true"
      className={cx('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`pm-fade-${id}`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>

      {variant === 'route' ? (
        // Route graph: a shortest path threaded across the full width.
        <g fill="none" stroke={stroke} strokeWidth="1.3" opacity="0.6">
          <path
            d="M-20 112 L110 72 L250 92 L390 44 L530 86 L670 56 L810 100 L950 62 L1090 88 L1220 50"
            strokeOpacity="0.85"
          />
          <path
            d="M-20 112 L120 124 L280 108 L430 120 L580 104 L740 118 L880 102 L1030 116 L1220 98"
            strokeDasharray="5 7"
            strokeOpacity="0.32"
          />
          <path
            d="M110 72 L120 124 M390 44 L430 120 M670 56 L740 118 M950 62 L1030 116"
            strokeOpacity="0.2"
          />
          {[
            [110, 72],
            [250, 92],
            [390, 44],
            [530, 86],
            [670, 56],
            [810, 100],
            [950, 62],
            [1090, 88],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3} fill="var(--c-surface)" />
          ))}
        </g>
      ) : variant === 'broadcast' ? (
        // Broadcast: message bars fanning out across the width.
        <g stroke={stroke} fill="none" strokeWidth="1.3" opacity="0.55">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = -40 + i * 212
            return (
              <g key={i} opacity={i % 2 === 0 ? 1 : 0.62}>
                <rect x={x} y={26} width={132} height={18} rx="6" />
                <rect x={x + 16} y={56} width={104} height={18} rx="6" opacity="0.7" />
                <rect x={x + 32} y={86} width={78} height={18} rx="6" opacity="0.45" />
                <circle cx={x + 164} cy={64} r="3.5" fill={stroke} stroke="none" opacity="0.8" />
                <path d={`M${x + 176} 54 h24 M${x + 176} 64 h18 M${x + 176} 74 h22`} strokeOpacity="0.3" strokeLinecap="round" />
              </g>
            )
          })}
        </g>
      ) : variant === 'conversation' ? (
        // Conversation: question and answer bubbles alternating across the width.
        <g stroke={stroke} fill="none" strokeWidth="1.3" opacity="0.55">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = -60 + i * 212
            return (
              <g key={i} opacity={i % 2 === 0 ? 1 : 0.6}>
                {/* Incoming bubble, tail bottom-left. */}
                <path d={`M${x + 14} 22 h104 a10 10 0 0 1 10 10 v24 a10 10 0 0 1 -10 10 h-86 l-14 12 v-12 h-4 a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10 z`} />
                {/* Reply bubble, tail bottom-right, offset and lighter. */}
                <path
                  d={`M${x + 76} 76 h96 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-96 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10 z`}
                  strokeOpacity="0.55"
                />
                <path d={`M${x + 30} 40 h58 M${x + 30} 52 h38`} strokeOpacity="0.3" strokeLinecap="round" />
                <path d={`M${x + 92} 92 h64 M${x + 92} 104 h44`} strokeOpacity="0.22" strokeLinecap="round" />
              </g>
            )
          })}
        </g>
      ) : (
        // Community: overlapping fields repeated across the width.
        <g fill="none" stroke={stroke} strokeWidth="1.3" opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 40 + i * 280
            return (
              <g key={i}>
                <circle cx={x} cy={70} r="46" />
                <circle cx={x + 74} cy={70} r="46" strokeOpacity="0.62" />
                <circle cx={x + 37} cy={70} r="76" strokeOpacity="0.18" strokeDasharray="3 8" />
              </g>
            )
          })}
          <path d="M-20 70 h40 M1180 70 h40" strokeOpacity="0.25" strokeLinecap="round" />
        </g>
      )}

      <rect width="1200" height="140" fill={`url(#pm-fade-${id})`} />
    </svg>
  )
}
