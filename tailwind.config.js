import defaultTheme from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typographyPlugin],
  darkMode: 'class',
};
/* ========================================
   NGL PHASE 2 BRAND STYLING
   ======================================== */

/* Headings */

:root:not(.dark) :is(h1, h2, h3, h4, h5, h6) {
  color: var(--aw-color-text-heading);
}

/* Primary buttons */

.btn-primary {
  background-color: #8A1744;
  border-color: #8A1744;
  color: #FFFFFF;
}

.btn-primary:hover {
  background-color: #444444;
  border-color: #444444;
  color: #FFFFFF;
}

/* Secondary buttons */

:root:not(.dark) .btn-secondary {
  color: #8A1744;
  border-color: #8A1744;
}

:root:not(.dark) .btn-secondary:hover {
  background-color: #8a17442e;
  border-color: #8A1744;
  color: #8A1744;
}

/* Tertiary buttons */

:root:not(.dark) .btn-tertiary {
  color: #8A1744;
}

:root:not(.dark) .btn-tertiary:hover {
  color: #444444;
  background-color: #F1EFF0;
}

/* Button focus */

.btn:focus-visible {
  outline: 2px solid #8A1744;
  outline-offset: 3px;
  --tw-ring-color: #8A1744;
  --tw-ring-offset-color: #FFFFFF;
}

/* Main navigation */

:root:not(.dark) #header nav a,
:root:not(.dark) #header nav button {
  color: #050404;
}

:root:not(.dark) #header nav a:hover,
:root:not(.dark) #header nav button:hover,
:root:not(.dark) #header nav .aw-link-active {
  color: #8A1744;
}

/* Dropdown navigation */

:root:not(.dark) #header .dropdown-menu {
  background-color: #FFFFFF;
}

:root:not(.dark) #header .dropdown-menu a:hover,
:root:not(.dark) #header .dropdown-menu a:focus-visible {
  background-color: #8a17442e;
  color: #8A1744;
}

/* Header utility icons */

:root:not(.dark) #header a[aria-label="RSS Feed"]:hover,
:root:not(.dark) #header button[data-aw-toggle-color-scheme]:hover {
  background-color: #8a17442e;
  color: #8A1744;
}

/* Footer */

:root:not(.dark) footer.ngl-footer {
  background-color: #FFFFFF;
  border-color: #C1C1C1;
}

:root:not(.dark) .ngl-footer a {
  color: #444444;
}

:root:not(.dark) .ngl-footer a:hover {
  color: #8A1744;
}

:root:not(.dark) .ngl-footer .ngl-footer-heading {
  color: #8A1744;
  font-family: var(--aw-font-heading);
  font-weight: 700;
}

:root:not(.dark) .ngl-footer a[aria-label]:hover {
  background-color: #8a17442e;
}

/* Article hyperlinks */

:root:not(.dark) .prose a {
  color: #8A1744;
}

:root:not(.dark) .prose a:hover {
  color: #444444;
}

/* Keyboard accessibility */

:root:not(.dark) a:focus-visible,
:root:not(.dark) button:focus-visible {
  outline: 2px solid #8A1744;
  outline-offset: 3px;
}

/* Alternating homepage section backgrounds */

.ngl-section-background {
  background-color: #F1EFF0;
}

.dark .ngl-section-background {
  background-color: transparent;
}
