// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { satteri } from '@astrojs/markdown-satteri';
import { doplnitPlugin } from './src/lib/doplnit-plugin.mjs';
import { zobrazitPlaceholdery } from './src/config/placeholdery.ts';

export default defineConfig({
  site: 'https://www.feelstyle.cz',
  // Stávající URL jsou bez lomítka na konci (/o-nas, /projekty/dum-ujezd) – kvůli SEO zachováváme.
  // Vercel adapter z toho nastaví i přesměrování /o-nas/ → /o-nas.
  trailingSlash: 'never',

  // Web je statický, serverless je jen /api/kontakt (prerender = false).
  adapter: vercel(),

  // Připraveno na další jazyky: přidejte 'en' / 'de' do locales a texty do src/i18n.
  i18n: {
    locales: ['cs'],
    defaultLocale: 'cs',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.endsWith('/404') && !page.includes('/kontakt/odeslano'),
      i18n: { defaultLocale: 'cs', locales: { cs: 'cs-CZ' } },
    }),
  ],

  // Písma se stáhnou při buildu a servírují z vlastní domény (žádné volání Google Fonts z prohlížeče).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Urbanist',
      cssVariable: '--font-urbanist',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],

  // Placeholdery [DOPLNIT: …] v markdownu se zvýrazní, nebo skryjí – podle src/config/placeholdery.ts.
  markdown: { processor: satteri({ hastPlugins: [doplnitPlugin({ zobrazit: zobrazitPlaceholdery })] }) },

  image: {
    responsiveStyles: true,
  },

  // Proměnné prostředí pro kontaktní formulář (viz .env.example). Tajné klíče se čtou až za běhu na serveru.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_WEBHOOK_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
