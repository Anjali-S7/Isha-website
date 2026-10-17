import { useEffect, useRef, useState } from 'react'

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string
  reset: (widgetId?: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let loading: Promise<void> | null = null

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve()
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      loading = null
      reject(new Error('Turnstile failed to load'))
    }
    document.head.appendChild(script)
  })
  return loading
}

type Props = {
  siteKey: string
  onToken: (token: string) => void
  /** Increment to reset the challenge (e.g. after each submission attempt). */
  resetKey: number
}

/** Cloudflare Turnstile challenge, rendered only when a site key is configured. */
export function Turnstile({ siteKey, onToken, resetKey }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const tokenCallback = useRef(onToken)
  const [failed, setFailed] = useState(false)
  tokenCallback.current = onToken

  useEffect(() => {
    let cancelled = false
    loadTurnstile()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token: string) => tokenCallback.current(token),
          'expired-callback': () => tokenCallback.current(''),
          'error-callback': () => tokenCallback.current(''),
        })
      })
      .catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = undefined
    }
  }, [siteKey])

  useEffect(() => {
    if (resetKey && widgetId.current) {
      window.turnstile?.reset(widgetId.current)
      tokenCallback.current('')
    }
  }, [resetKey])

  if (failed)
    return (
      <p className="text-sm text-danger" role="alert">
        The spam-protection check could not load. Please check your connection and refresh the page.
      </p>
    )
  return <div ref={container} className="min-h-[65px]" />
}
