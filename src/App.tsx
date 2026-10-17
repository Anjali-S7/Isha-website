import { useEffect, useRef, useState } from 'react'
import type { CollectionId } from './content'
import { About } from './components/About'
import { Collections } from './components/Collections'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Solutions } from './components/Solutions'
import { WhyIsha } from './components/WhyIsha'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [collection, setCollection] = useState<CollectionId | ''>('')
  const contactHeading = useRef<HTMLHeadingElement>(null)

  // Content renders after load, so honour a deep link such as /#contact once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
  }, [])

  const enquire = (id: CollectionId) => {
    setCollection(id)
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', '#contact')
    contactHeading.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Experience />
        <Solutions />
        <Collections onEnquire={enquire} />
        <WhyIsha />
        <Contact ref={contactHeading} collection={collection} onCollectionChange={setCollection} />
      </main>
      <Footer />
    </>
  )
}
