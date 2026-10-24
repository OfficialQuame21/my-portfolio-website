import { Check, Copy, FileText, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon } from '../components/BrandIcons'
import { useEffect, useState } from 'react'
import { ContactForm } from '../components/ContactForm'
import { DevHint } from '../components/DevHint'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { contact, features } from '../data/profile'

const openTo = [
  'Software development roles and internships',
  'Research-based master’s supervision and scholarship opportunities',
  'Collaboration on applications, data and machine learning projects',
]

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  if (!navigator.clipboard) return null

  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(email).then(() => setCopied(true)).catch(() => undefined)}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-ink"
    >
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
      <span className="sr-only"> email address</span>
    </button>
  )
}

export function Contact() {
  const links = [
    contact.linkedin.trim()
      ? { key: 'linkedin', label: 'LinkedIn', value: 'Connect professionally', href: contact.linkedin, icon: LinkedinIcon }
      : null,
    contact.github.trim()
      ? { key: 'github', label: 'GitHub', value: 'See the code', href: contact.github, icon: GithubIcon }
      : null,
    contact.x.trim() ? { key: 'x', label: 'X', value: 'Follow along', href: contact.x, icon: XIcon } : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null)

  const missing = [
    contact.linkedin.trim() ? null : 'LinkedIn',
    contact.github.trim() ? null : 'GitHub',
  ].filter(Boolean)

  return (
    <Section id="contact" label="Contact" tone="raised">
      <SectionHeading
        align="center"
        eyebrow="10 — Contact"
        title="Let’s Build Something Meaningful."
        description="I’m always interested in connecting with people working on software development, technology and research. If you’d like to discuss a project, a professional opportunity, or a potential research collaboration, I’d be glad to hear from you."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
        {/* ------------------------------------------------- direct contact */}
        <div className="space-y-5">
          <Reveal>
            <article className="ring-gradient surface-card p-6">
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">Email me directly</p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-display text-lg font-semibold break-all text-ink underline-offset-4 transition-colors hover:text-accent-ink hover:underline sm:text-xl"
                >
                  {contact.email}
                </a>
                <CopyEmail email={contact.email} />
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} className="text-accent" aria-hidden="true" />
                {contact.locationLine}
              </p>

              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Hello Emmanuel')}`}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.95rem] font-medium text-on-accent shadow-[0_8px_24px_-10px_var(--c-accent)] transition-[filter,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
              >
                <Mail size={16} aria-hidden="true" />
                Open your email app
              </a>
            </article>
          </Reveal>

          {/* Profiles */}
          <Reveal delay={90}>
            <article className="surface-card p-6">
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">Elsewhere</p>

              {links.length > 0 ? (
                <ul className="mt-4 space-y-2.5">
                  {links.map(({ key, label, value, href, icon: Icon }) => (
                    <li key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center gap-3.5 rounded-xl border border-line bg-canvas/40 p-3.5 transition-colors duration-200 hover:border-accent/45 hover:bg-accent-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent-ink"
                        >
                          <Icon size={17} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-ink">{label}</span>
                          <span className="block text-xs text-muted">{value}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-auto text-faint transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          &rarr;
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-line-strong p-4 text-sm text-muted">
                  Profile links appear here once added at{' '}
                  <code className="font-mono text-xs">/admin</code> &rarr; Settings, or in{' '}
                  <code className="font-mono text-xs">content/settings/contact.json</code>.
                </p>
              )}

              {missing.length > 0 ? (
                <div className="mt-4">
                  <DevHint>{`Add profile URL: ${missing.join(', ')}`}</DevHint>
                </div>
              ) : null}

              {features.resume.enabled ? (
                <a
                  href={features.resume.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-accent-ink underline-offset-4 transition-colors hover:underline"
                >
                  <FileText size={15} aria-hidden="true" />
                  Download my résumé
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              ) : null}
            </article>
          </Reveal>
        </div>

        {/* ------------------------------------------- form, or what I'm open to */}
        <Reveal delay={150}>
          <div className="h-full space-y-5">
            <ContactForm />

            <article className="surface-card p-6">
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-faint uppercase">Good reasons to reach out</p>
              <ul className="mt-4 space-y-3">
                {openTo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
