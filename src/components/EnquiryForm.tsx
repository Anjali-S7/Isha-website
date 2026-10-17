import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, Info, Loader2 } from 'lucide-react'
import { asset, site } from '../config/site'
import { collectionName, collections, type CollectionId } from '../content'
import {
  enquiryConfigured,
  MESSAGE_LIMIT,
  submitEnquiry,
  validate,
  validatedFields,
  validateField,
  type EnquiryErrors,
  type EnquiryValues,
} from '../lib/enquiry'
import { Turnstile } from './Turnstile'

type Props = {
  collection: CollectionId | ''
  onCollectionChange: (id: CollectionId | '') => void
}

type Status =
  | { type: 'idle' }
  | { type: 'invalid'; count: number }
  | { type: 'submitting' }
  | { type: 'success'; name: string }
  | { type: 'error'; message: string }
  | { type: 'not-configured' }

type TextValues = Omit<EnquiryValues, 'collection'>

const emptyValues: TextValues = { name: '', phone: '', email: '', city: '', message: '', consent: false }
const MIN_FILL_MS = 2500

export function EnquiryForm({ collection, onCollectionChange }: Props) {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const startedAt = useRef(Date.now())
  const [values, setValues] = useState<TextValues>(emptyValues)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const [honeypot, setHoneypot] = useState('')
  const [token, setToken] = useState('')
  const [turnstileReset, setTurnstileReset] = useState(0)
  const turnstileKey = site.enquiry.turnstileSiteKey

  const all: EnquiryValues = { ...values, collection }

  useEffect(() => {
    if (status.type === 'success') successRef.current?.focus()
  }, [status.type])

  const update = <K extends keyof TextValues>(field: K, value: TextValues[K]) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validateField(field, { ...next, collection }) }))
    if (status.type === 'invalid' || status.type === 'error') setStatus({ type: 'idle' })
  }

  const blur = (field: keyof TextValues) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors((e) => ({ ...e, [field]: validateField(field, all) }))
  }

  const fieldId = (f: string) => `${uid}-${f}`
  const errorId = (f: keyof EnquiryValues) => (touched[f] && errors[f] ? `${fieldId(f)}-error` : undefined)
  const invalid = (f: keyof EnquiryValues) => Boolean(touched[f] && errors[f])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.type === 'submitting') return

    const nextErrors = validate(all)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(validatedFields.map((f) => [f, true])))
    const firstInvalid = validatedFields.find((f) => nextErrors[f])
    if (firstInvalid) {
      setStatus({ type: 'invalid', count: validatedFields.filter((f) => nextErrors[f]).length })
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // Spam protection: hidden honeypot field and a minimum time on the form.
    if (honeypot) {
      setStatus({ type: 'error', message: 'Your enquiry could not be sent. Please refresh the page and try again.' })
      return
    }
    if (Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus({ type: 'error', message: 'That was very quick — please review your details and submit again.' })
      return
    }
    if (turnstileKey && !token) {
      setStatus({ type: 'error', message: 'Please complete the verification check, then submit again.' })
      return
    }
    if (!enquiryConfigured) {
      setStatus({ type: 'not-configured' })
      return
    }

    setStatus({ type: 'submitting' })
    const result = await submitEnquiry(
      all,
      collection ? collectionName(collection) : 'Not sure yet',
      token ? { 'cf-turnstile-response': token } : {},
    )
    if (turnstileKey) setTurnstileReset((n) => n + 1)

    if (result.ok) {
      setStatus({ type: 'success', name: values.name.trim().split(/\s+/)[0] ?? '' })
      setValues(emptyValues)
      setTouched({})
      setErrors({})
      onCollectionChange('')
      return
    }
    if (result.reason === 'network') {
      setStatus({
        type: 'error',
        message:
          'We couldn’t reach the server, so your enquiry was not sent. Please check your connection and try again.',
      })
    } else {
      setStatus({
        type: 'error',
        message: `Your enquiry was not sent${result.detail ? ` (${result.detail})` : ''}. Please try again in a moment.`,
      })
    }
  }

  if (status.type === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[28rem] flex-col items-start justify-center focus:outline-none"
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-success" strokeWidth={1.5} />
        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.02em]">
          Thank you{status.name ? `, ${status.name}` : ''}.
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          Your enquiry has been sent. We’ll review it and get back to you to arrange a consultation.
        </p>
        <button
          type="button"
          className="mt-10 text-sm font-semibold text-royal underline-offset-4 hover:underline"
          onClick={() => {
            startedAt.current = Date.now()
            setStatus({ type: 'idle' })
          }}
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const submitting = status.type === 'submitting'

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby={`${uid}-required`}>
      {!enquiryConfigured && (
        <div className="mb-8 flex gap-3 rounded-2xl bg-ice p-4 text-sm leading-relaxed text-charcoal">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-royal" strokeWidth={1.5} />
          <p>
            Online enquiries will open soon. This form is not yet connected, so details entered here cannot be
            sent.
            {import.meta.env.DEV && (
              <span className="mt-1 block text-muted">Developer note: set VITE_ENQUIRY_ENDPOINT in .env.</span>
            )}
          </p>
        </div>
      )}

      <p id={`${uid}-required`} className="mb-6 text-sm text-muted">
        Fields marked <span aria-hidden="true" className="text-danger">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId('name')} label="Name" required error={invalid('name') ? errors.name : undefined}>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => blur('name')}
            aria-invalid={invalid('name')}
            aria-describedby={errorId('name')}
            className={inputClass(invalid('name'))}
          />
        </Field>

        <Field id={fieldId('phone')} label="Phone" required error={invalid('phone') ? errors.phone : undefined}>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="e.g. 98765 43210"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => blur('phone')}
            aria-invalid={invalid('phone')}
            aria-describedby={errorId('phone')}
            className={inputClass(invalid('phone'))}
          />
        </Field>

        <Field id={fieldId('email')} label="Email" optional error={invalid('email') ? errors.email : undefined}>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => blur('email')}
            aria-invalid={invalid('email')}
            aria-describedby={errorId('email')}
            className={inputClass(invalid('email'))}
          />
        </Field>

        <Field id={fieldId('city')} label="City" required error={invalid('city') ? errors.city : undefined}>
          <input
            id={fieldId('city')}
            name="city"
            type="text"
            autoComplete="address-level2"
            list={`${uid}-towns`}
            required
            value={values.city}
            onChange={(e) => update('city', e.target.value)}
            onBlur={() => blur('city')}
            aria-invalid={invalid('city')}
            aria-describedby={errorId('city')}
            className={inputClass(invalid('city'))}
          />
          <datalist id={`${uid}-towns`}>
            {site.towns.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </Field>

        <div className="sm:col-span-2">
          <Field id={fieldId('collection')} label="Interested Collection" optional>
            <div className="relative">
              <select
                id={fieldId('collection')}
                name="collection"
                value={collection}
                onChange={(e) => onCollectionChange(e.target.value as CollectionId | '')}
                className={`${inputClass(false)} cursor-pointer appearance-none pr-11`}
              >
                <option value="">Not sure yet — help me choose</option>
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    ISHA {c.tier} — {c.body.replace(/\.$/, '')}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy"
                strokeWidth={1.75}
              />
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id={fieldId('message')}
            label="Message"
            optional
            error={invalid('message') ? errors.message : undefined}
            hint={
              <span className="tabular-nums">
                {values.message.length}/{MESSAGE_LIMIT}
              </span>
            }
          >
            <textarea
              id={fieldId('message')}
              name="message"
              rows={4}
              maxLength={MESSAGE_LIMIT}
              placeholder="Tell us about your home — new build or renovation, rooms, timelines…"
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
              onBlur={() => blur('message')}
              aria-invalid={invalid('message')}
              aria-describedby={errorId('message')}
              className={`${inputClass(invalid('message'))} min-h-32 resize-y py-3`}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId('website')}>Leave this field empty</label>
        <input
          id={fieldId('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <div className="flex items-start gap-3">
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => {
              update('consent', e.target.checked)
              setTouched((t) => ({ ...t, consent: true }))
              setErrors((er) => ({ ...er, consent: validateField('consent', { ...all, consent: e.target.checked }) }))
            }}
            aria-invalid={invalid('consent')}
            aria-describedby={errorId('consent')}
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-silver accent-navy"
          />
          <label htmlFor={fieldId('consent')} className="text-sm leading-relaxed text-charcoal">
            I agree to be contacted about my enquiry by phone or email, and I have read the{' '}
            <a href={asset('privacy.html')} className="font-medium text-royal underline underline-offset-2">
              Privacy Policy
            </a>
            . <span aria-hidden="true" className="text-danger">*</span>
          </label>
        </div>
        {invalid('consent') && <ErrorText id={`${fieldId('consent')}-error`}>{errors.consent}</ErrorText>}
      </div>

      {turnstileKey && (
        <div className="mt-6">
          <Turnstile siteKey={turnstileKey} onToken={setToken} resetKey={turnstileReset} />
        </div>
      )}

      <div aria-live="polite" className="empty:hidden mt-6">
        {status.type === 'invalid' && (
          <Notice tone="error">
            Please correct {status.count === 1 ? 'the highlighted field' : `the ${status.count} highlighted fields`}.
          </Notice>
        )}
        {status.type === 'error' && <Notice tone="error">{status.message}</Notice>}
        {status.type === 'not-configured' && (
          <Notice tone="info">
            Your details look good, but online enquiries are not connected yet — nothing has been sent. Please
            check back soon.
          </Notice>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary mt-8 w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:px-9"
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          'Request a Consultation'
        )}
      </button>
    </form>
  )
}

function inputClass(isInvalid: boolean) {
  return `block min-h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-navy placeholder:text-muted transition-[border-color,box-shadow] duration-200 focus:ring-4 focus:outline-none ${
    isInvalid
      ? 'border-danger focus:border-danger focus:ring-danger/15'
      : 'border-hairline hover:border-silver focus:border-royal focus:ring-royal/15'
  }`
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  error?: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-navy">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
          )}
          {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
        </label>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
      {children}
    </p>
  )
}

function Notice({ tone, children }: { tone: 'error' | 'info'; children: ReactNode }) {
  const Icon = tone === 'error' ? AlertCircle : Info
  return (
    <p
      role={tone === 'error' ? 'alert' : undefined}
      className={`flex gap-3 rounded-2xl p-4 text-sm leading-relaxed ${
        tone === 'error' ? 'bg-[#fdf1f0] text-danger' : 'bg-ice text-charcoal'
      }`}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
      <span>{children}</span>
    </p>
  )
}
