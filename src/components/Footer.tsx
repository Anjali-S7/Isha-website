import { ArrowUpRight } from 'lucide-react'
import { navItems } from '../content'
import { asset, BASE, site } from '../config/site'

type Props = { variant?: 'home' | 'legal' }

export function Footer({ variant = 'home' }: Props) {
  const href = (id: string) => (variant === 'home' ? `#${id}` : `${BASE}#${id}`)
  const year = new Date().getFullYear()

  return (
    <footer id="site-footer" className="bg-navy text-white">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href={href('home')} className="inline-flex items-center gap-4 rounded-2xl" aria-label={`${site.fullName} — home`}>
              {/* Original emblem on white, so the artwork is shown exactly as supplied. */}
              <span className="flex size-16 items-center justify-center rounded-2xl bg-white p-2">
                <img src={asset('brand/isha-mark-white-160.png')} alt="" width={174} height={160} className="h-full w-auto" />
              </span>
              <span className="flex flex-col leading-none" aria-hidden="true">
                <span className="font-display text-2xl font-extrabold tracking-[0.1em]">ISHA</span>
                <span className="mt-1.5 text-[0.65rem] font-semibold tracking-[0.3em] text-silver uppercase">
                  {site.subline}
                </span>
              </span>
            </a>
            <p className="mt-8 font-display text-2xl font-medium tracking-tight">{site.tagline}</p>
            <p className="mt-3 text-white/75">
              Brand concept supported by{' '}
              <a
                href={site.supporter.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-0.5 text-white underline decoration-white/30 underline-offset-4 hover:decoration-electric"
              >
                {site.supporter.name}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.22em] text-silver uppercase">Explore</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a href={href(item.id)} className="text-white/80 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-[0.22em] text-silver uppercase">Legal</h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={asset('privacy.html')} className="text-white/80 transition-colors hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href={asset('terms.html')} className="text-white/80 transition-colors hover:text-white">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-semibold tracking-[0.22em] text-silver uppercase">Region</h2>
              <p className="mt-5 text-sm leading-relaxed text-white/80">
                {site.region}
                <br />
                {site.towns.join(' · ')}
              </p>
            </div>
          </nav>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8 text-xs leading-relaxed text-white/70">
          <p className="max-w-4xl">{site.disclosure}</p>
          <p className="mt-3 max-w-4xl">{site.imageryNote}</p>
          <p className="mt-6">
            © {year} {site.fullName}
          </p>
        </div>
      </div>
    </footer>
  )
}
