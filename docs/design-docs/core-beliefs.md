# Core Beliefs

Foundational principles that guide technical decisions for this portfolio site.

## Static-First

The site has no dynamic content. Every page is pre-rendered at build time and served as static HTML from a CDN. This eliminates server costs, maximizes performance, and removes an entire class of runtime failures.

Implications:
- `output: 'export'` in Next.js config
- No API routes, middleware, or server actions
- No database or external data sources at runtime
- `generateStaticParams()` for dynamic routes
- Content changes require a build and deploy

## Minimal Dependencies

The dependency tree is intentionally small. Three production dependencies: Next.js, React, React DOM. Dev dependencies are limited to Tailwind, PostCSS, ESLint, Prettier, and TypeScript tooling.

No icon libraries beyond inline SVGs. No animation libraries. No state management. No component library.

## SEO-Optimized

The site exists to be found. Every SEO mechanism available in Next.js is used:
- Comprehensive `Metadata` export with OpenGraph and Twitter cards
- JSON-LD structured data (Person + WebSite schemas)
- Dynamic sitemap and robots.txt generation
- Canonical URLs with trailing slashes
- `llms.txt` and `llms-full.txt` for AI crawler discoverability

## Dark-First Theme

Dark theme is the default (`color-scheme: dark`). Light theme is an opt-in override via `data-theme='light'` attribute. Theme preference is persisted to `localStorage` and applied before first paint via an inline script to prevent flash.

The color system uses warm tones in light mode (`#faf8f5` background) rather than pure white, creating a softer reading experience.
