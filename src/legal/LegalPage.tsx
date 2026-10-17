import type { ReactNode } from 'react'
import { FileWarning } from 'lucide-react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

type Props = { title: string; children: ReactNode }

export function LegalPage({ title, children }: Props) {
  return (
    <>
      <Header variant="legal" />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <div className="container-page max-w-3xl py-16 sm:py-24">
          <div role="note" className="flex gap-4 rounded-2xl border border-[#f0d58a] bg-[#fffaeb] p-5 text-sm leading-relaxed text-[#5c3d00]">
            <FileWarning aria-hidden="true" className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
            <p>
              <strong className="font-semibold">Draft — for legal review.</strong> This document is a working
              draft prepared for discussion. It has not been reviewed by a legal professional and must be reviewed,
              completed and approved before the website is launched. Highlighted items in{' '}
              <span className="tbc">[brackets]</span> need confirmation.
            </p>
          </div>

          <h1 className="mt-12 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted">
            Last updated: <span className="tbc">[date to be confirmed on approval]</span>
          </p>

          <div className="legal mt-12 space-y-10 leading-relaxed text-charcoal [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </main>
      <Footer variant="legal" />
    </>
  )
}

/** Marks text that must be confirmed during legal review. */
export function TBC({ children }: { children: ReactNode }) {
  return <span className="tbc">[{children}]</span>
}
