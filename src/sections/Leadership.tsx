import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { leadershipRoles } from '../data/leadership'

export function Leadership() {
  return (
    <Section id="leadership" label="Leadership and Community Involvement" tone="raised">
      <SectionHeading
        eyebrow="05 — Leadership"
        title="Leadership &amp; Community"
        description="Elected and appointed roles within the Koforidua Technical University community."
      />

      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {leadershipRoles.map((role, i) => (
          <li key={role.id}>
            <Reveal delay={i * 90} className="h-full">
              <article className="surface-card group relative flex h-full flex-col overflow-hidden p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                {/* Year watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-3 font-display text-[4.5rem] leading-none font-bold text-ink/[0.04] transition-colors duration-300 group-hover:text-accent/[0.08]"
                >
                  {role.year}
                </span>

                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-accent-ink uppercase">
                  {role.year}
                </span>

                <h3 className="mt-3 text-lg leading-snug font-semibold text-balance">{role.role}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{role.organization}</p>

                {role.note ? <p className="mt-4 border-t border-line pt-4 text-sm text-faint">{role.note}</p> : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
