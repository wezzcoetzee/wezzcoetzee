# Frontend

## Component Architecture

All components live in `src/components/`. The site is a single-page layout composed in `src/app/page.tsx`:

```
RootLayout (layout.tsx) — Server Component
├── NavBar — Server Component (sticky header; renders ThemeToggle)
│   └── ThemeToggle — Client Component
├── Home (page.tsx) — Server Component
│   ├── Introduction — Server Component (hero)
│   ├── About — Server Component
│   ├── FeaturedWork — Server Component (project cards grid)
│   └── ConnectSection — Server Component (social links)
├── Footer — Server Component
├── work/page.tsx — Server Component (work index)
│   └── ProjectCard — Server Component
└── work/[slug]/page.tsx — Server Component
    └── CaseStudy — Server Component (project detail)
```

### Client vs Server Components

`ThemeToggle` is the only client component. Everything else renders on the server — entrance motion is pure CSS (`.rise-in` with staggered inline `animation-delay`), so no JavaScript is needed for animations.

| Component   | Directive      | Reason                                |
| ----------- | -------------- | ------------------------------------- |
| ThemeToggle | `'use client'` | localStorage access, DOM manipulation |
| _all others_ | Server        | Static markup + CSS-only animation    |

### Component Conventions

- Props destructured in function signature
- No default exports except page components (`page.tsx`)
- Named exports for all components
- Inline SVG icons (no icon library for social links)
- Tailwind classes applied directly, no CSS modules

## Data Layer

No data fetching. All content is static TypeScript:

- `src/data/projects.ts` — `Project` type + `PROJECTS` array
- `src/data/index.tsx` — barrel that re-exports `PROJECTS` and `Project` from `projects.ts`

Social links are inlined where used (`SECONDARY_LINKS` in `ConnectSection.tsx`, `sameAs` in the Person schema).

Data is imported directly into components at build time.

## Routing

Single page with hash navigation to sections (`#about`, `#work`, `#connect`), plus dynamic case study routes:

| Route           | File                           | Content             |
| --------------- | ------------------------------ | ------------------- |
| `/`             | `src/app/page.tsx`             | Home (all sections) |
| `/work/`        | `src/app/work/page.tsx`        | Work index          |
| `/work/[slug]/` | `src/app/work/[slug]/page.tsx` | Case study detail   |

Dynamic routes use `generateStaticParams()` to pre-render all project slugs at build time.

## SEO

### Metadata

Defined in `src/app/layout.tsx` via Next.js `Metadata` export:

- Title template: `%s | Wesley Coetzee`
- OpenGraph with GitHub avatar as image
- Twitter card (summary_large_image)
- Canonical URL: `https://wezzcoetzee.com`
- Full robots configuration with googleBot directives

### Structured Data

A **Person** JSON-LD script is injected in `src/app/page.tsx` — job titles, description, address, social profiles (`sameAs`), `knowsAbout`, and an occupation with work examples linked to project slugs.

### Sitemap & Robots

- `src/app/sitemap.ts` — generates sitemap.xml with all routes
- `src/app/robots.ts` — generates robots.txt

### LLM Discoverability

- `public/llms.txt` — concise site summary for LLM crawlers
- `public/llms-full.txt` — detailed content for LLM indexing

## Accessibility

- Skip-to-content link as first element in `<body>`
- `scroll-margin-top: 5rem` on all `section[id]` for anchor navigation
- `aria-label` on all inline SVG icons
- `prefers-reduced-motion` support for all animations
- Semantic HTML sections with IDs
