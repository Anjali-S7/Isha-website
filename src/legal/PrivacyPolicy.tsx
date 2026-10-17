import { site } from '../config/site'
import { TBC } from './LegalPage'

export function PrivacyPolicy() {
  return (
    <>
      <section>
        <h2>1. About this policy</h2>
        <p>
          This policy explains how personal information submitted through this website is collected, used and
          protected. {site.fullName} (“ISHA”) is a proposed brand supported by {site.supporter.name} for
          technology development and innovation. Until ISHA is established as a separate entity, the party
          responsible for personal information collected on this website is{' '}
          <TBC>responsible entity to be confirmed, e.g. {site.supporter.name}</TBC>.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>When you submit an enquiry, we collect the details you choose to provide:</p>
        <ul>
          <li>your name, phone number and, optionally, email address;</li>
          <li>your city or town, the collection you are interested in, and any message you include;</li>
          <li>a record of your consent to be contacted, and the date and time of your enquiry.</li>
        </ul>
        <p>
          Like most websites, our hosting provider and spam-protection service may process technical information
          such as your IP address, browser type and device information to deliver the site securely. This
          website does not currently use advertising or analytics cookies{' '}
          <TBC>confirm before launch and update if analytics are added</TBC>. Fonts are served from our own
          site rather than a third-party font service.
        </p>
      </section>

      <section>
        <h2>3. How we use your information</h2>
        <ul>
          <li>to respond to your enquiry and arrange a consultation if you request one;</li>
          <li>to understand interest in the planned ISHA offerings in {site.region};</li>
          <li>to protect this website against spam and misuse.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section>
        <h2>4. Consent and your choices</h2>
        <p>
          We process enquiry information on the basis of the consent you give when submitting the form, in line
          with the Digital Personal Data Protection Act, 2023 and applicable rules{' '}
          <TBC>legal basis and compliance position to be confirmed by counsel</TBC>. You may withdraw your consent
          at any time by contacting us at <TBC>privacy contact email to be confirmed</TBC>.
        </p>
      </section>

      <section>
        <h2>5. Sharing your information</h2>
        <p>Your information may be shared only as needed with:</p>
        <ul>
          <li>{site.supporter.name}, in its role supporting the ISHA brand;</li>
          <li>
            service providers who process data on our behalf, such as our website host{' '}
            <TBC>hosting provider</TBC>, form-delivery service <TBC>form service provider</TBC> and, if enabled,
            Cloudflare Turnstile for spam protection;
          </li>
          <li>authorities, where required by law.</li>
        </ul>
      </section>

      <section>
        <h2>6. How long we keep it</h2>
        <p>
          We keep enquiry information only for as long as needed to respond to you and for related record-keeping,
          after which it is deleted <TBC>retention period to be confirmed</TBC>.
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect your information. No method of
          transmission over the internet is completely secure, however, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          Subject to applicable law, you may request access to, correction of, or erasure of your personal
          information, and you may raise a grievance with our Grievance Officer{' '}
          <TBC>name and contact details to be confirmed</TBC>.
        </p>
      </section>

      <section>
        <h2>9. Children</h2>
        <p>This website is intended for adults. We do not knowingly collect information from children.</p>
      </section>

      <section>
        <h2>10. Changes to this policy</h2>
        <p>We may update this policy from time to time. The latest version will always be published on this page.</p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          For privacy questions or requests, contact <TBC>privacy contact email and postal address to be confirmed</TBC>.
        </p>
      </section>
    </>
  )
}
