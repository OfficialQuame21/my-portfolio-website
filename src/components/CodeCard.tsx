import type { ReactNode } from 'react'
import { Database, Smartphone, Sparkles } from 'lucide-react'
import { features } from '../data/profile'

/** Token spans: keyword, property, string, punctuation. */
const K = ({ children }: { children: ReactNode }) => <span className="text-violet-ink">{children}</span>
const P = ({ children }: { children: ReactNode }) => <span className="text-accent-ink">{children}</span>
const S = ({ children }: { children: ReactNode }) => <span className="text-cyan">{children}</span>
const Pn = ({ children }: { children: ReactNode }) => <span className="text-faint">{children}</span>

const line = 'flex gap-3 sm:gap-4'
const num = 'hidden w-5 shrink-0 text-right text-faint/50 select-none sm:block'

/**
 * The hero's visual: a code panel standing in for a portrait. Every value in
 * it is factual, so it reads as an introduction rather than decoration.
 */
export function CodeCard() {
  return (
    <div className="ring-gradient surface-card relative min-w-0 overflow-hidden shadow-lift">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/60" />
          <span className="size-2.5 rounded-full bg-amber-400/60" />
          <span className="size-2.5 rounded-full bg-emerald-400/60" />
        </span>
        <span className="ml-1.5 min-w-0 truncate font-mono text-xs text-faint">emmanuel.ts</span>

        {features.openToOpportunities ? (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[0.65rem] font-medium whitespace-nowrap text-emerald-300 sm:px-2.5 sm:text-[0.68rem] light:text-emerald-700">
            <span aria-hidden="true" className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 [animation-duration:2.5s]" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            {features.openToOpportunitiesLabel}
          </span>
        ) : null}
      </div>

      {/* Code body */}
      <pre className="min-w-0 overflow-x-auto p-4 font-mono text-[0.72rem] leading-[1.9] sm:p-5 sm:text-[0.84rem]">
        <code className="block min-w-0">
          <span className={line}>
            <span className={num}>1</span>
            <span>
              <K>const</K> <P>emmanuel</P> <Pn>= {'{'}</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>2</span>
            <span>
              {'  '}
              <P>role</P>
              <Pn>: </Pn>
              <S>&quot;Software Developer&quot;</S>
              <Pn>,</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>3</span>
            <span>
              {'  '}
              <P>based</P>
              <Pn>: </Pn>
              <S>&quot;Ghana&quot;</S>
              <Pn>,</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>4</span>
            <span>
              {'  '}
              <P>builds</P>
              <Pn>: [</Pn>
              <S>&quot;React&quot;</S>
              <Pn>, </Pn>
              <S>&quot;React Native&quot;</S>
              <Pn>],</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>5</span>
            <span>
              {'  '}
              <P>data</P>
              <Pn>: [</Pn>
              <S>&quot;Supabase&quot;</S>
              <Pn>, </Pn>
              <S>&quot;PostgreSQL&quot;</S>
              <Pn>],</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>6</span>
            <span>
              {'  '}
              <P>learning</P>
              <Pn>: </Pn>
              <S>&quot;AI model training · Python&quot;</S>
              <Pn>,</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>7</span>
            <span>
              {'  '}
              <P>next</P>
              <Pn>: </Pn>
              <S>&quot;Research MSc · Cybersecurity&quot;</S>
              <Pn>,</Pn>
            </span>
          </span>
          <span className={line}>
            <span className={num}>8</span>
            <span>
              <Pn>{'}'}</Pn>
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-accent"
                style={{ animation: 'blink 1.2s step-end infinite' }}
              />
            </span>
          </span>
        </code>
      </pre>

      {/* Footer rail */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-surface-2/40 px-5 py-3.5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Smartphone size={13} className="text-accent" aria-hidden="true" />
          Mobile &amp; web apps
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Database size={13} className="text-accent" aria-hidden="true" />
          Databases
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles size={13} className="text-accent" aria-hidden="true" />
          Machine learning
        </span>
      </div>
    </div>
  )
}
