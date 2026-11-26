import type { AstroIntegration } from 'astro';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default function sitemapNoindex(): AstroIntegration {
  return {
    name: 'sitemap-noindex',

    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outputDir = fileURLToPath(dir);
        const files = await readdir(outputDir);

        const sitemapFiles = files.filter((file) =>
          /^sitemap-\d+\.xml$/.test(file)
        );

        let removedCount = 0;

        for (const sitemapFile of sitemapFiles) {
          const sitemapPath = path.join(outputDir, sitemapFile);
          let xml = await readFile(sitemapPath, 'utf8');

          const entries = Array.from(
            xml.matchAll(/<url>[\s\S]*?<\/url>/g)
          );

          for (const entry of entries) {
            const location = entry[0].match(
              /<loc>([\s\S]*?)<\/loc>/
            )?.[1];

            if (!location) continue;

            const pathname = decodeURIComponent(
              new URL(location).pathname
            );

            const relativePath = pathname.replace(
              /^\/+|\/+$/g,
              ''
            );

            const candidates = [
              path.join(
                outputDir,
                relativePath,
                'index.html'
              ),
              path.join(
                outputDir,
                `${relativePath}.html`
              ),
            ];

            let html: string | undefined;

            for (const candidate of candidates) {
              try {
                html = await readFile(candidate, 'utf8');
                break;
              } catch (error) {
                if (
                  (error as NodeJS.ErrnoException).code !==
                  'ENOENT'
                ) {
                  throw error;
                }
              }
            }

            if (!html) continue;

            const metaTags =
              html.match(/<meta\b[^>]*>/gi) || [];

            const hasNoindex = metaTags.some(
              (tag) =>
                /\bname\s*=\s*["']robots["']/i.test(tag) &&
                /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(tag)
            );

            if (hasNoindex) {
              xml = xml.replace(entry[0], '');
              removedCount++;

              logger.info(`Excluded noindex URL: ${location}`);
            }
          }

          await writeFile(sitemapPath, xml, 'utf8');
        }

        logger.info(
          `Removed ${removedCount} noindex URL(s) from sitemap.`
        );
      },
    },
  };
}
