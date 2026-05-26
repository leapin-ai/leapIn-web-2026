// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// Global site configuration (leapin.io)
// https://astro.build/config
export default defineConfig({
  site: 'https://www.leapin.io',
  base: '',
  integrations: [
    react(),
    sitemap({
      // i18n configuration
      i18n: {
        defaultLocale: 'en',
        locales: {
          'en': 'en',
          'zh-CN': 'zh-CN'
        }
      },

      // Customize each URL in sitemap
      serialize(/** @type {import('@astrojs/sitemap').SitemapItem} */ item) {
        // Add hreflang links for geo-targeting
        item.links = [
          {
            url: item.url,
            lang: 'en'
          },
          {
            url: item.url,
            lang: 'x-default'
          },
          {
            url: item.url.replace('www.leapin.io', 'www.leapin-ai.com'),
            lang: 'zh-CN'
          }
        ];

        // Set priority and changefreq based on page type
        if (item.url === 'https://www.leapin.io/') {
          // Homepage
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/legal/')) {
          // Legal pages
          item.priority = 0.3;
          item.changefreq = 'monthly';
        } else {
          // Other pages
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }

        // Set last modified date
        item.lastmod = new Date().toISOString();

        return item;
      }
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
