import { Hand, Moon, Sunrise } from 'lucide-react'
import { experiences } from '../content'
import { Photo } from './Photo'
import { Reveal } from './Reveal'

const momentIcon = { morning: Sunrise, evening: Moon } as const

export function Experience() {
  return (
    <section id="experiences" aria-labelledby="experiences-title" className="bg-ice py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">The ISHA experience</p>
          <h2 id="experiences-title" className="display-2 mt-6">
            An invisible presence. <br className="hidden sm:block" />A more effortless home.
          </h2>
          <p className="lede mt-6 max-w-2xl">
            ISHA is our vision of a connected home where intelligence works quietly in the background — and
            your day simply flows.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          {experiences.map((exp, i) => {
            const Icon = momentIcon[exp.id as keyof typeof momentIcon]
            const flip = i % 2 === 1
            return (
              <article
                key={exp.id}
                aria-labelledby={`exp-${exp.id}`}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
                  <figure>
                    <div className="aspect-[3/2] overflow-hidden rounded-[1.75rem] bg-navy shadow-[0_30px_80px_-40px_rgba(8,31,64,0.45)]">
                      <Photo
                        name={exp.photo}
                        alt={exp.alt}
                        sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
                        className="transition-transform duration-[1.6s] ease-(--ease-soft) hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs text-muted">Illustrative interior</figcaption>
                  </figure>
                </Reveal>

                <Reveal
                  delay={120}
                  className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}
                >
                  <p className="flex items-center gap-2.5 text-sm font-semibold text-royal">
                    {Icon && <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />}
                    {exp.moment}
                  </p>
                  <h3 id={`exp-${exp.id}`} className="mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                    {exp.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{exp.body}</p>
                </Reveal>
              </article>
            )
          })}
        </div>

        <Reveal className="mx-auto mt-28 max-w-3xl border-t border-silver/70 pt-16 text-center sm:mt-36">
          <Hand aria-hidden="true" className="mx-auto size-8 text-royal" strokeWidth={1.25} />
          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            Familiar controls, always within reach.
          </h3>
          <p className="lede mx-auto mt-5 max-w-2xl">
            Intelligence works quietly in the background, while familiar manual controls stay right where you
            expect them — for everyone at home, and every guest who visits.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
