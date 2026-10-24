import { Mail } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { contact } from '../data/profile'
import { cx } from '../lib/utils'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

type SocialEntry = { key: string; label: string; href: string; icon: IconComponent; external: boolean }

/** Only links that have actually been configured — no dead icons. */
function configuredSocials(): SocialEntry[] {
  const entries: SocialEntry[] = []

  if (contact.email.trim()) {
    entries.push({ key: 'email', label: 'Email', href: `mailto:${contact.email}`, icon: Mail, external: false })
  }
  if (contact.github.trim()) {
    entries.push({ key: 'github', label: 'GitHub', href: contact.github, icon: GithubIcon, external: true })
  }
  if (contact.linkedin.trim()) {
    entries.push({ key: 'linkedin', label: 'LinkedIn', href: contact.linkedin, icon: LinkedinIcon, external: true })
  }

  return entries
}

export function SocialLinks({ className, size = 18 }: { className?: string; size?: number }) {
  const socials = configuredSocials()
  if (socials.length === 0) return null

  return (
    <ul className={cx('flex items-center gap-2', className)}>
      {socials.map(({ key, label, href, icon: Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            title={label}
            className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent/50 hover:bg-accent-soft hover:text-ink"
          >
            <Icon size={size} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
