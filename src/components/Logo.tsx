import { asset, site } from '../config/site'

type Props = { href: string; onNavigate?: () => void }

/** Supplied emblem on its own, aspect ratio preserved. */
export function Logo({ href, onNavigate }: Props) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="flex shrink-0 items-center rounded-lg"
      aria-label={`${site.fullName} — home`}
    >
      <img
        src={asset('brand/isha-mark-160.png')}
        alt=""
        width={174}
        height={160}
        className="h-11 w-auto sm:h-12"
      />
    </a>
  )
}
