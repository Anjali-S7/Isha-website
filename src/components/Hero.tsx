import { site } from '../config/site'
import { Photo } from './Photo'

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--spacing-header))] items-end overflow-hidden bg-navy text-white"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Photo
          name="living-room"
          alt="A warmly lit open-plan living room with cove lighting, opening onto a pool and the sea at dusk"
          sizes="100vw"
          position="62% 50%"
          priority
          className="animate-kenburns will-change-transform motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-navy/15 via-transparent to-transparent" />
      </div>

      {/* Soft shadow keeps white type legible over the lighter overlay. */}
      <div className="container-page pt-28 pb-16 [text-shadow:0_2px_28px_rgba(8,31,64,0.45)] sm:pb-24 lg:pb-28">
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
