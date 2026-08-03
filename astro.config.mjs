// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// China site configuration (leapin-ai.com)
// https://astro.build/config
export default defineConfig({
  site: 'https://www.leapin-ai.com',
  base: '',
  integrations: [
    react(),
    sitemap({
      // i18n configuration
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'en': 'en'
        }
      },

      // Customize each URL in sitemap
      serialize(/** @type {import('@astrojs/sitemap').SitemapItem} */ item) {
        // Add hreflang links for geo-targeting
        item.links = [
          {
            url: item.url,
            lang: 'zh-CN'
          },
          {
            url: item.url.replace('www.leapin-ai.com', 'www.leapin.io'),
            lang: 'en'
          },
          {
            url: item.url.replace('www.leapin-ai.com', 'www.leapin.io'),
            lang: 'x-default'
          }
        ];

        // Set priority and changefreq based on page type
        if (item.url === 'https://www.leapin-ai.com/') {
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