import { ArrowRight } from 'lucide-react'
import { collections, type CollectionId } from '../content'
import { Reveal } from './Reveal'

type Props = { onEnquire: (id: CollectionId) => void }

export function Collections({ onEnquire }: Props) {
  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-ice py-24 sm:py-32 lg:py-40">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Collections</p>
          <h2 id="collections-title" className="display-2 mt-6">
            Four Ways to Live Smarter.
          </h2>
          <p className="lede mx-auto mt-6 max-w-2xl">
            From essential everyday convenience to whole-home integration — each collection is shaped around
            your home, so the right fit begins with a conversation.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((c, i) => (
            <li key={c.id} className="flex">
              <Reveal delay={i * 90} className="flex w-full">
                <article
                  aria-labelledby={`col-${c.id}`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-silver/70 bg-white p-8 transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-soft) hover:-translate-y-1 hover:border-silver hover:shadow-[0_28px_60px_-32px_rgba(8,31,64,0.35)] sm:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px origin-left scale-x-25 bg-electric transition-transform duration-700 ease-(--ease-soft) group-hover:scale-x-100 sm:inset-x-9"
                  />
                  <p aria-hidden="true" className="text-xs font-semibold tabular-nums tracking-[0.2em] text-muted">
                    0{i + 1}
                  </p>
                  <h3 id={`col-${c.id}`} className="mt-10 leading-none">
                    <span className="block text-[0.7rem] font-semibold tracking-[0.42em] text-muted">ISHA</span>
                    <span className="mt-2 block text-[2rem] font-semibold tracking-[0.14em]">{c.tier}</span>
                  </h3>
                  <p className="mt-5 mb-12 leading-relaxed text-muted">{c.body}</p>
                  <button
                    type="button"
                    onClick={() => onEnquire(c.id)}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-navy/15 px-5 text-sm font-semibold text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  >
                    Enquire
                    <span className="sr-only"> about ISHA {c.tier}</span>
                    <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </button>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Collections are planned offerings. Inclusions and pricing are still being finalised and are not yet
          available.
        </p>
      </div>
    </section>
  )
}
