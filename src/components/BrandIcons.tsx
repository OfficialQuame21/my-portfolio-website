import type { SVGProps } from 'react'

/**
 * Brand marks. lucide-react v1 no longer ships company logos, and GitHub /
 * LinkedIn / app-store links read as broken without them — so the four paths
 * live here rather than pulling in a second icon package.
 *
 * Used nominatively, to label a link to each service.
 */

type Props = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 18, children, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export function GithubIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.17 7.69 10.66.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.54.23 2.68.11 2.96.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.66C23.25 5.48 18.27.5 12 .5Z" />
    </Icon>
  )
}

export function LinkedinIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </Icon>
  )
}

export function AppStoreIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M17.05 12.73c-.03-2.72 2.22-4.03 2.32-4.09-1.27-1.85-3.24-2.1-3.94-2.13-1.68-.17-3.28 1-4.13 1-.85 0-2.16-.98-3.55-.95-1.83.03-3.52 1.06-4.46 2.7-1.9 3.3-.49 8.18 1.36 10.86.91 1.31 1.98 2.78 3.39 2.73 1.36-.06 1.87-.88 3.52-.88 1.64 0 2.11.88 3.55.85 1.47-.03 2.4-1.33 3.29-2.65 1.04-1.52 1.47-3 1.5-3.07-.04-.02-2.87-1.1-2.9-4.37M14.3 4.74c.75-.91 1.26-2.17 1.12-3.43-1.08.05-2.4.73-3.18 1.63-.69.8-1.3 2.09-1.14 3.32 1.21.1 2.45-.61 3.2-1.52" />
    </Icon>
  )
}

export function PlayStoreIcon(props: Props) {
  return (
    <Icon {...props}>
      <path d="M3.6 1.84A1.5 1.5 0 0 0 3 3.05v17.9c0 .47.22.9.6 1.2l9.37-10.15L3.6 1.84Zm10.8 8.3 2.9-3.14-10.6-6a1.5 1.5 0 0 0-.5-.17l8.2 9.31Zm0 3.72-8.2 9.3c.17-.02.34-.08.5-.17l10.6-6-2.9-3.13Zm6.1-3.15-2.6-1.47-3.12 3.38L17.9 16l2.6-1.47a1.5 1.5 0 0 0 0-2.62Z" />
    </Icon>
  )
}
