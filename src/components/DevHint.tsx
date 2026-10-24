/**
 * A development-only marker for content that still needs configuring.
 *
 * It renders nothing in a production build, so an unconfigured link never
 * reaches a visitor — but you can see exactly what is outstanding while
 * running `npm run dev`.
 */
export function DevHint({ children }: { children: string }) {
  if (!import.meta.env.DEV) return null

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-400/35 bg-amber-400/10 px-2 py-1 font-mono text-[0.68rem] text-amber-300/90">
      <span aria-hidden="true">⚙</span>
      {children}
    </span>
  )
}
