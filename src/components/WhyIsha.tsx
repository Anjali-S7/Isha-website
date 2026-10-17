import { pillars } from '../content'
import { Reveal } from './Reveal'

export function WhyIsha() {
  return (
    <section id="why-isha" aria-labelledby="why-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
            <p className="eyebrow">Why ISHA</p>
            <h2 id="why-title" className="display-2 mt-6">
              Designed around people, not devices.
            </h2>
          </div>
        </Reveal>

        <ul className="lg:col-span-8">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <li key={p.title} className="border-t border-hairline last:border-b">
                <Reveal className="grid gap-4 py-9 sm:grid-cols-[3.5rem_minmax(0,14rem)_1fr] sm:gap-8 sm:py-10">
                  <Icon aria-hidden="true" className="size-7 text-royal" strokeWidth={1.25} />
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">
                    <span className="sr-only">{i + 1}. </span>
                    {p.title}
                  </h3>
                  <p className="leading-relaxed text-muted">{p.body}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
