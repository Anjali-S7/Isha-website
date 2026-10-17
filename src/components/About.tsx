import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">The story behind ISHA</p>
            <h2 id="about-title" className="display-2 mt-6">
              Born on the coast. Designed for the way we live.
            </h2>
          </Reveal>

          <Reveal className="lede space-y-6 lg:col-span-6 lg:col-start-7 lg:pt-14" delay={120}>
            <p>
              Coastal Karnataka is changing. From family homes in Kundapura and Udupi to contemporary
              residences in Manipal and Mangaluru, people are creating spaces that balance tradition, comfort
              and modern aspirations.
            </p>
            <p>
              Yet the technology inside many homes remains scattered across switches, remotes and
              disconnected applications — so everyday living ends up feeling more fragmented than it should.
            </p>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-24 max-w-4xl text-center sm:mt-32">
          <blockquote>
            <p className="font-display text-[1.75rem] leading-[1.25] font-medium tracking-[-0.02em] text-navy sm:text-4xl lg:text-[2.75rem]">
              <span aria-hidden="true" className="text-electric">“</span>
              What if the home itself could quietly take care of everyday routines?
              <span aria-hidden="true" className="text-electric">”</span>
            </p>
          </blockquote>
          <p className="lede mx-auto mt-8 max-w-2xl">
            At {site.supporter.name}, work in automation and intelligent control systems inspired that simple
            question. The idea became ISHA — envisioned as an invisible, intelligent companion that helps your
            surroundings respond to you, instead of asking you to constantly manage them.
          </p>
        </Reveal>

        <Reveal className="mt-24 grid gap-10 rounded-[2rem] bg-ice p-8 sm:mt-32 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
          <div className="lg:col-span-6">
            <h3 className="text-xs font-semibold tracking-[0.22em] text-royal uppercase">Why we are starting here</h3>
            <p className="mt-5 font-display text-2xl leading-snug font-medium tracking-tight text-navy sm:text-[1.75rem]">
              Our roots are in {site.region}.
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              We want to bring considered, premium smart-living experiences closer to local families, architects
              and homeowners — backed by accessible engineering expertise and dependable on-ground support.
            </p>
            <a
              href={site.supporter.url}
              target="_blank"
              rel="noopener"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-royal"
            >
              Technology development supported by {site.supporter.name}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-xs font-semibold tracking-[0.22em] text-muted uppercase">Where we begin</p>
            <ul className="mt-4 border-t border-silver/70">
              {site.towns.map((town, i) => (
                <li key={town} className="flex items-baseline justify-between border-b border-silver/70 py-4">
                  <span className="font-display text-xl font-medium text-navy">{town}</span>
                  <span aria-hidden="true" className="text-xs tabular-nums text-muted">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
