import { site } from '../config/site'
import type { CollectionId } from '../content'

export type EnquiryValues = {
  name: string
  phone: string
  email: string
  city: string
  collection: CollectionId | ''
  message: string
  consent: boolean
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

export const MESSAGE_LIMIT = 1000

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Indian mobile (optionally +91 / 0 prefixed) or any international number in E.164 form.
const PHONE_IN = /^(?:\+?91|0)?[6-9]\d{9}$/
const PHONE_INTL = /^\+[1-9]\d{7,14}$/

export function validateField(field: keyof EnquiryValues, v: EnquiryValues): string | undefined {
  switch (field) {
    case 'name': {
      const name = v.name.trim()
      if (!name) return 'Please enter your name.'
      if (name.length < 2) return 'Please enter your full name.'
      if (name.length > 80) return 'Please keep your name under 80 characters.'
      return
    }
    case 'phone': {
      const phone = v.phone.replace(/[\s\-().]/g, '')
      if (!phone) return 'Please enter a phone number so we can reach you.'
      if (!PHONE_IN.test(phone) && !PHONE_INTL.test(phone))
        return 'Enter a 10-digit mobile number (e.g. 98765 43210), or an international number starting with +.'
      return
    }
    case 'email': {
      const email = v.email.trim()
      if (email && !EMAIL.test(email)) return 'Enter a valid email address, e.g. name@example.com.'
      return
    }
    case 'city':
      if (!v.city.trim()) return 'Please tell us your city or town.'
      return
    case 'message':
      if (v.message.length > MESSAGE_LIMIT) return `Please keep your message under ${MESSAGE_LIMIT} characters.`
      return
    case 'consent':
      if (!v.consent) return 'Please confirm that we may contact you about your enquiry.'
      return
    default:
      return
  }
}

export const validatedFields: (keyof EnquiryValues)[] = ['name', 'phone', 'email', 'city', 'message', 'consent']

export function validate(v: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {}
  for (const field of validatedFields) {
    const error = validateField(field, v)
    if (error) errors[field] = error
  }
  return errors
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: 'not-configured' | 'network' | 'rejected'; detail?: string }

export const enquiryConfigured = Boolean(site.enquiry.endpoint)

/**
 * Sends the enquiry as JSON to the configured endpoint. Success is reported
 * only when the endpoint answers with a 2xx status and does not flag failure
 * in its JSON body (Formspree `ok`, Web3Forms `success`).
 */
export async function submitEnquiry(
  values: EnquiryValues,
  collectionLabel: string,
  extra: Record<string, string> = {},
): Promise<SubmitResult> {
  const { endpoint, accessKey } = site.enquiry
  if (!endpoint) return { ok: false, reason: 'not-configured' }

  const payload = {
    ...(accessKey ? { access_key: accessKey } : {}),
    subject: `New ISHA enquiry from ${values.name.trim()}`,
    from_name: 'ISHA website',
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    ...(values.email.trim() ? { replyto: values.email.trim() } : {}),
    city: values.city.trim(),
    collection: collectionLabel,
    message: values.message.trim(),
    consent: 'Yes — agreed to be contacted about this enquiry and acknowledged the Privacy Policy.',
    page: window.location.href,
    submitted_at: new Date().toISOString(),
    ...extra,
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 20000)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    let body: unknown = null
    try {
      body = await res.json()
    } catch {
      /* non-JSON response; rely on status */
    }
    const record = body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
    const flaggedFailure = record.success === false || record.ok === false
    if (!res.ok || flaggedFailure) return { ok: false, reason: 'rejected', detail: readMessage(record) }
    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  } finally {
    window.clearTimeout(timeout)
  }
}

function readMessage(record: Record<string, unknown>): string | undefined {
  const candidates = [record.message, record.error]
  if (Array.isArray(record.errors)) {
    const first = record.errors[0] as Record<string, unknown> | undefined
    candidates.push(first?.message)
  }
  const text = candidates.find((c): c is string => typeof c === 'string' && c.trim().length > 0)
  return text && text.length <= 200 ? text : undefined
}
