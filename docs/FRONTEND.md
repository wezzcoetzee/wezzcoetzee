# Frontend

## Component Architecture

All components live in `src/components/`. The site is a single-page layout composed in `src/app/page.tsx`:

```
RootLayout (layout.tsx) — Server Component
├── NavBar — Client Component (scroll-aware sticky header)
├── Home (page.tsx) — Server Component
│   ├── Introduction — Client Component (hero with animations)
│   ├── About — Client Component
│   ├── FeaturedWork — Client Component (project cards grid)
│   └── ConnectSection — Client Component (social links)
├── Footer — Server Component
└── work/[slug]/page.tsx — Server Component
    └── CaseStudy — Client Component (project detail)
```

### Client vs Server Components

| Component | Directive | Reason |
|-----------|----------|--------|
| Navigation | `'use client'` | Scroll event listeners, mobile menu state |
| Introduction | `'use client'` | Entrance animations |
| About | `'use client'` | Animations |
| FeaturedWork | `'use client'` | Interactive card grid |
| CaseStudy | `'use client'` | Interactive project detail |
| ConnectSection | `'use client'` | Animations |
| SocialCard | `'use client'` | Hover interactions |
| ThemeToggle | `'use client'` | localStorage access, DOM manipulation |
| CornerBrackets | Server | Pure presentational wrapper |
| Footer | Server | Static content |

### Component Conventions

- Props destructured in function signature
- No default exports except page components (`page.tsx`)
- Named exports for all components
- Inline SVG icons (no icon library for social links)
- Tailwind classes applied directly, no CSS modules

## Data Layer

No data fetching. All content is static TypeScript:

- `src/data/projects.ts` — `Project` type + `PROJECTS` array
- `src/data/index.tsx` — `CONTACTS` array (social links with JSX icons), re-exports from projects

Data is imported directly into components at build time.

## Routing

Single page with hash navigation to sections (`#about`, `#work`, `#connect`), plus dynamic case study routes:

| Route | File | Content |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Home (all sections) |
| `/work/[slug]/` | `src/app/work/[slug]/page.tsx` | Case study detail |

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
Two JSON-LD scripts injected in `src/app/page.tsx`:
1. **WebSite** schema — site name, URL, author
2. **Person** schema — job titles, social profiles (`sameAs`), occupation with work examples linked to project slugs

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
