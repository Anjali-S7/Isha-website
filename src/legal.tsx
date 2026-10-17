import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/manrope'
import '@fontsource-variable/inter'
import './index.css'
import { LegalPage } from './legal/LegalPage'
import { PrivacyPolicy } from './legal/PrivacyPolicy'
import { TermsOfUse } from './legal/TermsOfUse'

const page = document.body.dataset.page

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page === 'terms' ? (
      <LegalPage title="Terms of Use">
        <TermsOfUse />
      </LegalPage>
    ) : (
      <LegalPage title="Privacy Policy">
        <PrivacyPolicy />
      </LegalPage>
    )}
  </StrictMode>,
)
