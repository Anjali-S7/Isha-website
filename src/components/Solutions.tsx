import { solutions } from '../content'
import { Photo } from './Photo'
import { Reveal } from './Reveal'

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Solutions</p>
            <h2 id="solutions-title" className="display-2 mt-6">
              What ISHA brings to your space.
            </h2>
          </div>
          <p className="lede lg:col-span-5">
            Four planned areas of quiet intelligence, each intended to be tailored to the way your home is
            lived in.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-navy">
                <Photo
                  name="living-room"
                  alt="Detail of a living room's layered architectural lighting: ceiling coves, pendant lights and a glowing media wall"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  position="16% 40%"
                />
              </div>
              <figcaption className="mt-3 text-xs text-muted">Illustrative interior</figcaption>
            </figure>
          </Reveal>

          <ol className="lg:col-span-7">
            {solutions.map((s, i) => {
              const Icon = s.icon
              return (
                <li key={s.title} className="border-t border-hairline last:border-b">
                  <Reveal className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-10 sm:gap-x-8 sm:py-12">
                    <span className="flex size-14 items-center justify-center rounded-full border border-silver/80 text-royal">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={1.25} />
                    </span>
                    <div>
                      <p aria-hidden="true" className="text-xs font-semibold tabular-nums tracking-[0.2em] text-muted">
                        0{i + 1}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-[-0.015em] sm:text-[1.75rem]">{s.title}</h3>
                      <p className="mt-3 text-lg leading-relaxed text-muted">{s.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal">
                        {s.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span aria-hidden="true" className="size-1 rounded-full bg-electric" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>

        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-muted">
          These are planned capabilities, subject to development and validation. Device compatibility and the
          right combination for each home will be confirmed individually.
        </p>
      </div>
    </section>
  )
}
