/** Brand copy, sourced from the ISHA two-page brochure. */
import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  Fan,
  Handshake,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sofa,
  Wrench,
} from 'lucide-react'

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About ISHA' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'collections', label: 'Collections' },
  { id: 'contact', label: 'Contact' },
] as const

export const navIds = navItems.map((n) => n.id)

export type PhotoName = 'living-room' | 'bedroom' | 'media-lounge'

export const experiences: {
  id: string
  moment: string
  title: string
  body: string
  photo: PhotoName
  alt: string
}[] = [
  {
    id: 'morning',
    moment: 'Morning',
    title: 'The day begins gently.',
    body: 'Imagine a morning when the curtains open gently, the lighting feels natural and your preferred room settings are ready — before you reach for a single switch.',
    photo: 'bedroom',
    alt: 'A calm bedroom at sunrise, sheer curtains drawn back to a balcony with coconut palms beyond',
  },
  {
    id: 'evening',
    moment: 'Evening',
    title: 'One scene sets the mood.',
    body: 'In the evening, a single scene transforms your living room for family time or entertainment — the lighting softens and the space settles into the moment.',
    photo: 'media-lounge',
    alt: 'A dimly lit media lounge with warm cove lighting, a large screen and a wall-mounted control panel',
  },
]

export const solutions: {
  title: string
  body: string
  features: string[]
  icon: LucideIcon
}[] = [
  {
    title: 'Light & Ambience',
    body: 'Scenes, dimming and personalised lighting to suit the moment.',
    features: ['Lighting scenes', 'Dimming', 'Personalised settings'],
    icon: Lightbulb,
  },
  {
    title: 'Comfort & Climate',
    body: 'Connected fans, compatible AC controls, curtains and schedules.',
    features: ['Connected fans', 'Compatible AC controls', 'Curtains', 'Schedules'],
    icon: Fan,
  },
  {
    title: 'Safety & Access',
    body: 'Smart locks, entry control, monitoring and integrated alerts.',
    features: ['Smart locks', 'Entry control', 'Monitoring', 'Integrated alerts'],
    icon: ShieldCheck,
  },
  {
    title: 'One Connected Experience',
    body: 'Room-wise controls, mobile access, voice and tailored routines.',
    features: ['Room-wise controls', 'Mobile access', 'Voice', 'Tailored routines'],
    icon: Smartphone,
  },
]

export type CollectionId = 'lite' | 'nova' | 'aura' | 'elite'

export const collections: { id: CollectionId; tier: string; body: string }[] = [
  { id: 'lite', tier: 'LITE', body: 'Essential automation for everyday convenience.' },
  { id: 'nova', tier: 'NOVA', body: 'Connected routines and intelligent room control.' },
  { id: 'aura', tier: 'AURA', body: 'Refined ambience and personalised comfort.' },
  { id: 'elite', tier: 'ELITE', body: 'Whole-home integration for signature spaces.' },
]

export const collectionName = (id: CollectionId) =>
  `ISHA ${collections.find((c) => c.id === id)?.tier ?? ''}`

export const pillars: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'Thoughtful design',
    body: 'Technology that respects your interiors and architecture — designed to recede into the background rather than compete for attention.',
    icon: Compass,
  },
  {
    title: 'Everyday comfort',
    body: 'Built around the routines that matter — waking, unwinding, welcoming guests — with familiar manual controls always within reach.',
    icon: Sofa,
  },
  {
    title: 'Coastal Karnataka roots',
    body: 'Starting close to home, with families, architects and homeowners across Kundapura, Udupi, Manipal and Mangaluru.',
    icon: MapPin,
  },
  {
    title: 'Engineering expertise',
    body: 'Supported by SoVir Technologies LLP, drawing on its work in automation and intelligent control systems.',
    icon: Wrench,
  },
  {
    title: 'On-ground support',
    body: 'Our intention is dependable, accessible support on the ground — people nearby whom you can reach when you need them.',
    icon: Handshake,
  },
]
