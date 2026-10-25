# Frontend

## Component Tree

```
RootLayout (layout.tsx)
└── Home (page.tsx)
    ├── SiteHeader
    │   └── ThemeToggle      'use client'
    ├── WorkList             'use client'
    ├── MediaList
    ├── ActivityGraph
    └── SocialLinks (footer)
```

`ThemeToggle` (localStorage, DOM) and `WorkList` (expand state) are the only client components. Entrance motion is CSS (`.fade-in`, `.rise-in`).

Conventions: named exports (default only for route files), Tailwind classes inline, inline SVG icons, no CSS modules.

## Data

All content is static TypeScript in `src/data/`, re-exported from `src/data/index.ts`:

- `work.ts`: `WORK`, rendered by `WorkList` and used for `workExample` in the Person JSON-LD
- `media.ts`: `MEDIA`, rendered by `MediaList`

Social links live in `SocialLinks.tsx`; the Person schema keeps its own `sameAs` list in `page.tsx`.

## Routing

One route, `/`. Retired `/work/*` URLs are 301'd by `public/_redirects`.

## SEO

- `layout.tsx`: metadata, OpenGraph, Twitter card, canonical, robots directives
- `page.tsx`: Person JSON-LD
- `sitemap.ts`, `robots.ts`: generated at build
- `public/llms.txt`, `public/llms-full.txt`: LLM discoverability

## Accessibility

- Skip-to-content link targeting `#main-content`
- Sections labelled via `aria-labelledby`
- `prefers-reduced-motion` collapses all animation and transitions
