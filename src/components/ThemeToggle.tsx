import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-muted ' +
        'transition-colors duration-200 hover:border-line-strong hover:bg-accent-soft hover:text-ink ' +
        (className ? ` ${className}` : '')
      }
    >
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  )
}
