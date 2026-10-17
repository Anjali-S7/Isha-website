import { forwardRef } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../config/site'
import type { CollectionId } from '../content'
import { EnquiryForm } from './EnquiryForm'
import { Reveal } from './Reveal'

type Props = {
  collection: CollectionId | ''
  onCollectionChange: (id: CollectionId | '') => void
}

export const Contact = forwardRef<HTMLHeadingElement, Props>(function Contact(
  { collection, onCollectionChange },
  headingRef,
) {
  const { email, phone } = site.contact

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ice py-24 sm:py-32 lg:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" ref={headingRef} tabIndex={-1} className="display-2 mt-6 focus:outline-none">
            Let’s Create a More Intelligent Home.
          </h2>
          <p className="lede mt-6">
            Tell us a little about your home and how you would like it to feel. We’ll use your enquiry to
            arrange a consultation.
          </p>

          <div className="mt-12 border-t border-silver/70 pt-8">
            <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.22em] text-royal uppercase">
              <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Location focus
            </p>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy">{site.region}</p>
            <p className="mt-2 text-muted">{site.towns.join(' · ')}</p>
          </div>

          {(email || phone) && (
            <ul className="mt-8 space-y-3 border-t border-silver/70 pt-8">
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-3 font-medium text-navy hover:text-royal">
                    <Phone aria-hidden="true" className="size-4 text-royal" strokeWidth={1.75} />
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-3 font-medium text-navy hover:text-royal">
                    <Mail aria-hidden="true" className="size-4 text-royal" strokeWidth={1.75} />
                    {email}
                  </a>
                </li>
              )}
            </ul>
          )}

          <p className="mt-8 border-t border-silver/70 pt-8 text-sm leading-relaxed text-muted">
            ISHA is powered by{' '}
            <a
              href={site.supporter.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-0.5 font-medium text-royal hover:underline"
            >
              {site.supporter.name}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>{' '}
            for technology development and innovation.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="relative rounded-[2rem] border border-hairline bg-white p-6 shadow-[0_30px_80px_-50px_rgba(8,31,64,0.4)] sm:p-10 lg:p-12">
            <EnquiryForm collection={collection} onCollectionChange={onCollectionChange} />
          </div>
        </Reveal>
      </div>
    </section>
  )
})
