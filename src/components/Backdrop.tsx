/**
 * Fixed ambient background: a faint technical grid, two slow-drifting colour
 * fields, and a vignette. Purely decorative, pointer-transparent, and reduced
 * to a static wash when the visitor prefers reduced motion.
 */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Technical grid, faded out towards the bottom of the viewport. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 100% 72% at 50% 0%, #000 35%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 72% at 50% 0%, #000 35%, transparent 78%)',
        }}
      />

      {/* Colour fields. Blur + low opacity keeps them atmospheric, not glowing. */}
      <div
        className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, var(--c-accent) 0%, transparent 66%)',
          opacity: `calc(0.16 * var(--aurora-opacity))`,
          animation: 'drift 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -top-24 right-[-14rem] h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, var(--c-violet) 0%, transparent 68%)',
          opacity: `calc(0.14 * var(--aurora-opacity))`,
          animation: 'drift 34s ease-in-out infinite reverse',
        }}
      />

      {/* Vignette that settles the page towards the deep base colour. */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 55%, var(--c-base-deep) 100%)', opacity: 0.6 }}
      />
    </div>
  )
}
