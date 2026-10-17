# ISHA – Intelligent Living · Website

Single-page marketing site for **ISHA – Intelligent Living**, a proposed brand supported by
SoVir Technologies LLP. Built with React 19, TypeScript, Tailwind CSS v4 and Vite.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

`dist/` is a static site and can be deployed to any static host (Netlify, Vercel, Cloudflare Pages, S3, cPanel, etc.).

## Configuration

Copy `.env.example` to `.env` (or set the variables in your host) and fill in **confirmed** values only.
Anything you leave blank is simply not shown.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public URL, e.g. `https://www.your-domain.in`. Enables canonical URLs, `og:url`, JSON-LD and `sitemap.xml`. |
| `VITE_ENQUIRY_ENDPOINT` | Where the enquiry form POSTs JSON. Until it is set, the form says it is not connected and **never reports a successful send**. |
| `VITE_ENQUIRY_ACCESS_KEY` | Optional public key sent as `access_key` (needed for Web3Forms). |
| `VITE_TURNSTILE_SITE_KEY` | Optional Cloudflare Turnstile key for spam protection. |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_PHONE` | Direct contact details shown in the Contact section. |

Variables are baked in at build time, so rebuild after changing them.

### Enquiry form integration

The form sends a JSON `POST` with: `name, phone, email, city, collection, message, consent, page, submitted_at, subject, from_name`
(plus `replyto` when an email is given, `access_key` if configured, and `cf-turnstile-response` when Turnstile is on).
It shows success only for a 2xx response that doesn't flag `ok: false` / `success: false`.

- **Formspree:** create a form and set `VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/<id>`.
- **Web3Forms:** `VITE_ENQUIRY_ENDPOINT=https://api.web3forms.com/submit` and `VITE_ENQUIRY_ACCESS_KEY=<key>`.
- **Own backend / serverless function:** accept the JSON above, return 2xx on success, and allow CORS from the site origin.
  If Turnstile is enabled, verify `cf-turnstile-response` with your **secret** key at
  `https://challenges.cloudflare.com/turnstile/v0/siteverify` before accepting the enquiry.

Built-in spam protection: a hidden honeypot field, a minimum time-on-form check and optional Turnstile.

## Content and assets

- Copy lives in `src/content.ts` and `src/config/site.ts`, sourced from the ISHA two-page brochure.
- Logo: `public/brand/`. The supplied emblem has its white margins trimmed only; the artwork is unchanged.
  `isha-logo-transparent.png` is a colour-to-alpha cut that composites back onto white within 4/255 of the original.
  On the navy footer the original sits on a white tile.
- Photographs: the three images embedded in the brochure, exported as WebP at 768w (original) and 1536w (2× Lanczos upscale)
  in `public/images/`. **The brochure only contains 768 × 512 px versions.** Replace these files with the original
  high-resolution images (same filenames) for sharper results on large and retina screens, especially the full-bleed hero.
- All imagery is labelled as illustrative, and the footer states that interiors do not depict completed ISHA projects.

## Before launch

- [ ] Legal review of `privacy.html` and `terms.html` (drafts, marked `noindex`; bracketed items need confirmation).
      Once approved, remove the draft banner and the `noindex` meta tags.
- [ ] Set `VITE_SITE_URL`, `VITE_ENQUIRY_ENDPOINT` and, optionally, Turnstile, then send a test enquiry end to end.
- [ ] Add confirmed contact details, if any.
- [ ] Replace the photographs with high-resolution originals.
