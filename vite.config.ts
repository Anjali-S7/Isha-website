import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const page = (file: string) => fileURLToPath(new URL(file, import.meta.url))

/**
 * Adds URL-dependent SEO tags and emits robots.txt / sitemap.xml.
 * Canonical URLs, og:url, structured data and the sitemap are only produced
 * once VITE_SITE_URL is configured, so no domain is ever guessed.
 */
function seo(rawSiteUrl: string | undefined): Plugin {
  const siteUrl = rawSiteUrl?.trim().replace(/\/+$/, '') || undefined
  let base = '/'
  const abs = (path: string) => (siteUrl ? `${siteUrl}${path}` : `${base}${path.slice(1)}`)

  return {
    name: 'isha-seo',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(_html, ctx) {
      const path = ctx.path === '/' || ctx.path.endsWith('/index.html') ? '/' : ctx.path
      const tags: HtmlTagDescriptor[] = [
        { tag: 'meta', attrs: { property: 'og:image', content: abs('/og-image.jpg') }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: abs('/og-image.jpg') }, injectTo: 'head' },
      ]
      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: abs(path) }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: abs(path) }, injectTo: 'head' },
        )
        if (path === '/') {
          tags.push({
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ISHA – Intelligent Living',
              url: `${siteUrl}/`,
              inLanguage: 'en-IN',
              description:
                'ISHA – Intelligent Living is a proposed home-automation brand for Coastal Karnataka, supported by SoVir Technologies LLP.',
            }),
            injectTo: 'head',
          })
        }
      }
      return tags
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      })
      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod></url>
</urlset>
`,
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seo(env.VITE_SITE_URL)],
    build: {
      rolldownOptions: {
        input: {
          main: page('./index.html'),
          privacy: page('./privacy.html'),
          terms: page('./terms.html'),
        },
      },
    },
  }
})
