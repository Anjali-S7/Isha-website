import { useEffect, useId, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navIds, navItems } from '../content'
import { BASE } from '../config/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './Logo'

type Props = {
  /** On the legal pages, links point back to sections of the home page. */
  variant?: 'home' | 'legal'
}

const noSections: readonly string[] = []

export function Header({ variant = 'home' }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const active = useActiveSection(variant === 'home' ? navIds : noSections)
  const href = (id: string) => (variant === 'home' ? `#${id}` : `${BASE}#${id}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, make the page behind inert, close on Escape / desktop resize.
  useEffect(() => {
    if (!open) return
    const behind = [document.getElementById('main'), document.getElementById('site-footer')]
    document.documentElement.style.overflow = 'hidden'
    behind.forEach((el) => el?.setAttribute('inert', ''))

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.documentElement.style.overflow = ''
      behind.forEach((el) => el?.removeAttribute('inert'))
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 h-header border-b bg-white/90 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-300 ${
        scrolled || open ? 'border-hairline shadow-[0_1px_24px_rgba(8,31,64,0.06)]' : 'border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-page flex h-full items-center justify-between gap-6">
        <Logo href={href('home')} onNavigate={close} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const current = variant === 'home' && active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={href(item.id)}
                    aria-current={current ? 'location' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-300 hover:text-navy ${
                      current ? 'text-navy' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-electric transition-transform duration-500 ease-(--ease-soft) ${
                        current ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={href('contact')} onClick={close} className="btn btn-primary hidden min-h-11 px-6 text-sm sm:inline-flex">
            Enquire Now
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-ice lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X aria-hidden="true" strokeWidth={1.5} /> : <Menu aria-hidden="true" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-header bottom-0 overflow-y-auto bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col pt-6 pb-10">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {navItems.map((item, i) => (
              <li key={item.id} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
                <a
                  href={href(item.id)}
                  onClick={close}
                  aria-current={variant === 'home' && active === item.id ? 'location' : undefined}
                  className="flex items-center justify-between py-5 font-display text-2xl font-semibold tracking-tight text-navy"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-sm font-normal text-silver">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={href('contact')} onClick={close} className="btn btn-primary mt-10 w-full">
            Enquire Now
          </a>
        </nav>
      </div>
    </header>
  )
}
