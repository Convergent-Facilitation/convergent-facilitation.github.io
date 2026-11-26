import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
} from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (
  items: (() => AstroIntegration) | (() => AstroIntegration)[] = []
) =>
  hasExternalScripts
    ? (Array.isArray(items) ? items.map((item) => item()) : [items()])
    : [];

// Exclude unused, development and redirect-only pages from the sitemap.
const excludedSitemapPaths = [
  '/about',
  '/pricing',
  '/services',
  '/testing_comments',
  '/app',
  '/404',
];

export default defineConfig({
  output: 'static',

  redirects: {
    '/app': {
      status: 302,
      destination: 'https://www.convergence.tools',
    },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),

    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/+$/, '') || '/';

        // Exclude unused AstroWind demonstration pages.
        if (
          pathname === '/homes' ||
          pathname.startsWith('/homes/') ||
          pathname === '/landing' ||
          pathname.startsWith('/landing/')
        ) {
          return false;
        }

        // Exclude tag pages because they are currently set to noindex.
        if (pathname === '/t' || pathname.startsWith('/t/')) {
          return false;
        }

        // Exclude other unused and redirect-only pages.
        return !excludedSitemapPaths.includes(pathname);
      },
    }),

    mdx(),
    react(),

    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [
      responsiveTablesRehypePlugin,
      lazyImagesRehypePlugin,
    ],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
