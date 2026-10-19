import { useEffect, useState } from 'react'
import { asset, site } from '../config/site'
import { nextLoadedSlide } from '../lib/slideshow'

const slides = [
  {
    photo: 'living-room',
    label: 'Living room',
    alt: 'A warmly lit open-plan living room opening onto a pool and the sea at dusk',
    position: '62% 50%',
    widths: [768, 1536],
  },
  {
    photo: 'hero-smart-lighting',
    label: 'Smart lighting',
    alt: 'A connected lighting hub and wireless remote for automated home lighting',
    position: '60% 50%',
    widths: [768, 1536, 2560, 3840],
  },
  {
    photo: 'hero-smart-security',
    label: 'Smart home security',
    alt: 'A smartphone controlling a smart door lock for keyless home access',
    position: '60% 50%',
    widths: [768, 1536, 2560, 3840],
  },
  {
    photo: 'hero-exterior',
    label: 'Modern house',
    alt: 'A contemporary house with glass walls and a swimming pool in natural daylight',
    position: '55% 50%',
    widths: [768, 1536, 2560, 3840],
  },
] as const

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState<boolean[]>(() => slides.map(() => false))
  const [hasFocus, setHasFocus] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (hasFocus || reducedMotion) return

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveSlide((current) => nextLoadedSlide(current, loadedSlides))
      }
    }, 6000)
    return () => window.clearInterval(timer)
  }, [hasFocus, reducedMotion, loadedSlides])

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false)
      }}
      className="relative isolate flex min-h-[calc(100svh-var(--spacing-header))] items-end overflow-hidden bg-navy text-white"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.photo}
            className={`absolute inset-0 transition-[opacity,transform] duration-1000 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
              index === 0 || index === activeSlide ? 'translate-x-0 opacity-100' : 'translate-x-[3%] opacity-0'
            }`}
          >
            <img
              src={asset(`images/${slide.photo}-1536.webp`)}
              srcSet={slide.widths
                .map((width) => `${asset(`images/${slide.photo}-${width}.webp`)} ${width}w`)
                .join(', ')}
              alt={slide.alt}
              sizes="100vw"
              loading="eager"
              decoding={index === 0 ? 'sync' : 'async'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              onLoad={() => {
                setLoadedSlides((loaded) => loaded.map((ready, item) => item === index || ready))
              }}
              onError={() => {
                setLoadedSlides((loaded) => loaded.map((ready, item) => item === index ? false : ready))
                if (index === activeSlide) setActiveSlide(0)
              }}
              className="h-full w-full animate-kenburns object-cover will-change-transform motion-reduce:animate-none"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-navy/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-navy/15 via-transparent to-transparent" />
      </div>

      {/* Soft shadow keeps white type legible over the lighter overlay. */}
      <div className="container-page pt-28 pb-16 [text-shadow:0_2px_6px_rgba(8,31,64,0.7),0_4px_24px_rgba(8,31,64,0.45)] sm:pb-24 lg:pb-28">
        <p className="animate-rise flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-white/85 uppercase">
          <span aria-hidden="true" className="h-px w-10 bg-electric" />
          <span>
            {site.subline}
            <span className="hidden sm:inline"> · {site.region}</span>
          </span>
        </p>
        <h1
          id="hero-title"
          className="display-1 animate-rise mt-6 max-w-4xl text-white [animation-delay:120ms]"
        >
          A Home That Understands You.
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-white/85 [animation-delay:240ms] sm:text-xl">
          {site.supportingTagline}
        </p>
        <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:360ms] [text-shadow:none]">
          <a href="#about" className="btn btn-light">
            Explore ISHA
          </a>
          <a href="#contact" className="btn btn-ghost-light">
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  )
}
