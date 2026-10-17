/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_ENQUIRY_ENDPOINT?: string
  readonly VITE_ENQUIRY_ACCESS_KEY?: string
  readonly VITE_TURNSTILE_SITE_KEY?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_PHONE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
