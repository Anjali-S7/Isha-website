/**
 * Central site configuration.
 *
 * Business details that have not been supplied (email, phone, address,
 * WhatsApp) are intentionally NOT hard-coded. Set them through environment
 * variables (see .env.example) once confirmed; anything unset is not rendered.
 */
const env = import.meta.env

const value = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined)

export const BASE = env.BASE_URL

export const site = {
  name: 'ISHA',
  fullName: 'ISHA – Intelligent Living',
  subline: 'Intelligent Living',
  tagline: 'A Home That Understands You.',
  supportingTagline: 'Technology you barely notice. Comfort you experience every day.',
  region: 'Coastal Karnataka',
  towns: ['Kundapura', 'Udupi', 'Manipal', 'Mangaluru'],
  supporter: {
    name: 'SoVir Technologies LLP',
    url: 'https://sovirtechnologies.in',
    label: 'sovirtechnologies.in',
  },
  disclosure:
    'ISHA is a proposed independent LLP brand supported by SoVir Technologies LLP for technology development and innovation. Products and capabilities described are planned offerings, subject to development and validation.',
  imageryNote: 'Interiors shown are illustrative and do not depict completed ISHA projects.',

  contact: {
    email: value(env.VITE_CONTACT_EMAIL),
    phone: value(env.VITE_CONTACT_PHONE),
  },

  enquiry: {
    endpoint: value(env.VITE_ENQUIRY_ENDPOINT),
    accessKey: value(env.VITE_ENQUIRY_ACCESS_KEY),
    turnstileSiteKey: value(env.VITE_TURNSTILE_SITE_KEY),
  },
} as const

export const asset = (path: string) => `${BASE}${path.replace(/^\//, '')}`
