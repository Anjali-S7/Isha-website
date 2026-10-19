/** Skip images that are still loading or failed, including when the sequence wraps. */
export function nextLoadedSlide(current: number, loaded: readonly boolean[]): number {
  for (let offset = 1; offset < loaded.length; offset += 1) {
    const next = (current + offset) % loaded.length
    if (loaded[next]) return next
  }
  return current
}
