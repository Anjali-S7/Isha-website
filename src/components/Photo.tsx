import type { PhotoName } from '../content'
import { asset } from '../config/site'

type Props = {
  name: PhotoName
  alt: string
  sizes: string
  className?: string
  /** CSS object-position, for art-directed crops of the same photograph. */
  position?: string
  priority?: boolean
}

/** Brochure photograph served as responsive WebP (768w original, 1536w for high-density screens). */
export function Photo({ name, alt, sizes, className = '', position, priority = false }: Props) {
  return (
    <img
      src={asset(`images/${name}-1536.webp`)}
      srcSet={`${asset(`images/${name}-768.webp`)} 768w, ${asset(`images/${name}-1536.webp`)} 1536w`}
      sizes={sizes}
      alt={alt}
      width={1536}
      height={1024}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`h-full w-full object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
