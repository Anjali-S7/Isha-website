import { site } from '../config/site'
import { TBC } from './LegalPage'

export function TermsOfUse() {
  return (
    <>
      <section>
        <h2>1. Acceptance of these terms</h2>
        <p>
          By using this website you agree to these terms. If you do not agree, please do not use the website. The
          website is operated by <TBC>operating entity to be confirmed, e.g. {site.supporter.name}</TBC>.
        </p>
      </section>

      <section>
        <h2>2. About ISHA</h2>
        <p>{site.disclosure}</p>
      </section>

      <section>
        <h2>3. Planned offerings — information only</h2>
        <p>
          Content on this website, including descriptions of solutions and the ISHA LITE, NOVA, AURA and ELITE
          collections, describes planned offerings for general information. It is not an offer to sell, and
          features, availability, compatibility with particular devices, and service areas are subject to
          development, validation and individual site assessment.
        </p>
      </section>

      <section>
        <h2>4. Imagery</h2>
        <p>
          Photographs and visualisations on this website are illustrative. They do not depict completed ISHA
          projects or specific installations.
        </p>
      </section>

      <section>
        <h2>5. Enquiries</h2>
        <p>
          Submitting an enquiry does not create a contract or any obligation on either side. Any future work would
          be governed by a separate written agreement.
        </p>
      </section>

      <section>
        <h2>6. Intellectual property</h2>
        <p>
          The ISHA name, logo, content and design of this website are protected by intellectual property laws and
          belong to <TBC>rights holder to be confirmed</TBC>. You may not reproduce them without permission.
        </p>
      </section>

      <section>
        <h2>7. Third-party links</h2>
        <p>
          This website links to external sites such as {site.supporter.label}. We are not responsible for the
          content or practices of other websites.
        </p>
      </section>

      <section>
        <h2>8. Disclaimer and limitation of liability</h2>
        <p>
          The website is provided “as is”. To the extent permitted by law, we make no warranties about its
          accuracy or availability and are not liable for any loss arising from its use{' '}
          <TBC>scope of limitation to be confirmed by counsel</TBC>.
        </p>
      </section>

      <section>
        <h2>9. Governing law</h2>
        <p>
          These terms are governed by the laws of India. Courts at <TBC>jurisdiction to be confirmed</TBC> shall
          have jurisdiction.
        </p>
      </section>

      <section>
        <h2>10. Changes and contact</h2>
        <p>
          We may update these terms from time to time. For questions, contact{' '}
          <TBC>contact email to be confirmed</TBC>.
        </p>
      </section>
    </>
  )
}
