import { useState } from 'react'
import type { FormEvent } from 'react'
import { CircleAlert, CircleCheckBig, LoaderCircle, Send } from 'lucide-react'
import { Button } from './Button'

/**
 * Only rendered when VITE_CONTACT_ENDPOINT is configured (see .env.example).
 * The endpoint is a public form-relay URL — Formspree, Web3Forms, a Netlify
 * function, anything that accepts a JSON POST. No secret ever ships here.
 *
 * Success is reported only on an actual 2xx response. A failed request says so.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const field =
  'w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-[0.95rem] text-ink placeholder:text-faint ' +
  'transition-colors duration-200 outline-none focus:border-accent/60 focus:bg-canvas'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [failure, setFailure] = useState('')

  if (!ENDPOINT) return null

  const validate = (data: FormData): Errors => {
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = 'Please enter a valid email address.'
    if (message.length < 10) next.message = 'A little more detail would help — at least 10 characters.'

    return next
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real people leave this hidden field empty.
    if (String(data.get('company') ?? '') !== '') return

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    setFailure('')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      setStatus('sent')
      form.reset()
    } catch (error) {
      setStatus('error')
      setFailure(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="surface-card flex items-start gap-3.5 p-6">
        <CircleCheckBig size={20} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
        <div>
          <p className="font-semibold">Message sent</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Thank you — it came through. I&rsquo;ll get back to you as soon as I can.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-3 text-sm text-accent-ink underline-offset-4 hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card space-y-4 p-6">
      <h3 className="font-display text-lg font-semibold">Send a message</h3>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={field}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={field}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${field} resize-y`}
          placeholder="What would you like to discuss?"
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <p role="alert" className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 p-3.5 text-sm text-red-300">
          <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            The message could not be sent{failure ? ` (${failure})` : ''}. Please email me directly instead.
          </span>
        </p>
      ) : null}

      <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
        {status === 'sending' ? (
          <>
            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send message
          </>
        )}
      </Button>

      <p aria-live="polite" className="sr-only">
        {status === 'sending' ? 'Sending your message' : ''}
      </p>
    </form>
  )
}
