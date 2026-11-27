# Core Beliefs

## Static-First

Every page is pre-rendered and served from a CDN. No API routes, middleware, server actions, or runtime data sources. Content changes ship through a build.

## Minimal Dependencies

Next.js, React and React DOM, plus what the vendored liquid-glass kit needs: `@ui-sdk/core` and `@ui-sdk/react` (pinned betas) and `three`. No icon, animation or state libraries; the glass kit is the one component kit, and it is copied in rather than installed.

## SEO-Optimized

The site exists to be found: full `Metadata`, Person JSON-LD, generated sitemap and robots, `llms.txt`, and 301s for every retired URL.

## Dark-First Theme

Dark (`#000`) is the default. Light is an opt-in `data-theme='light'` override. The first-paint script always sets `data-theme` (`dark` or `light`), because the glass kit and Tailwind's `dark:` variant read it.
