# Architecture

## Tech Stack

| Layer          | Technology                             | Version                    |
| -------------- | -------------------------------------- | -------------------------- |
| Framework      | Next.js (App Router)                   | 15.3.3                     |
| UI             | React                                  | 19.1.0                     |
| Styling        | Tailwind CSS v4                        | 4.3.0                      |
| CSS Processing | @tailwindcss/postcss + postcss-nesting | —                          |
| Fonts          | Geist (body), Geist Mono (mono)        | Google Fonts via next/font |
| Linting        | ESLint + eslint-config-next            | 8.x                        |
| Formatting     | Prettier                               | 3.x                        |
| Runtime        | Bun                                    | latest                     |
| Hosting        | Cloudflare Pages                       | —                          |
| CI/CD          | GitHub Actions                         | —                          |
| Analytics      | Google Analytics (G-M18S2XK0BZ)        | gtag.js                    |

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout: fonts, metadata, analytics, NavBar + Footer
│   ├── page.tsx          # Home: JSON-LD structured data, section composition
│   ├── not-found.tsx     # 404 page
│   ├── opengraph-image.tsx # Dynamically generated OG image
│   ├── globals.css       # Design tokens, base styles, animations, utility classes
│   ├── work/
│   │   ├── page.tsx      # Work index (all projects)
│   │   └── [slug]/
│   │       └── page.tsx  # Case study pages (dynamic route, statically generated)
│   ├── sitemap.ts        # Generates sitemap.xml
│   └── robots.ts         # Generates robots.txt
├── components/
│   ├── Navigation.tsx    # Sticky NavBar (renders ThemeToggle)
│   ├── Introduction.tsx  # Hero section
│   ├── About.tsx         # About section
│   ├── FeaturedWork.tsx  # Project cards grid
│   ├── ProjectCard.tsx   # Single project card
│   ├── CaseStudy.tsx     # Individual project detail page
│   ├── ConnectSection.tsx# Social links section
│   ├── ThemeToggle.tsx   # Dark/light theme switcher
│   ├── Icons.tsx         # Inline SVG icons
│   └── Footer.tsx        # Site footer
├── data/
│   ├── index.tsx         # Barrel: re-exports PROJECTS + Project from projects.ts
│   └── projects.ts       # PROJECTS array + Project type definition
public/
├── llms.txt              # LLM-friendly site summary
├── llms-full.txt         # Detailed LLM-friendly content
├── manifest.webmanifest  # PWA manifest
├── avatar.jpg            # Profile image (OG, Person schema)
└── [favicons]            # Various favicon sizes
```

## Static Export Flow

```
bun run build
  → next build (with output: 'export')
  → Generates static HTML/CSS/JS in ./out/
  → All routes pre-rendered at build time
  → Dynamic routes use generateStaticParams()
  → Images unoptimized (no Next.js image optimization server)
  → Trailing slashes enabled for clean URLs
  → Console statements stripped in production
```

## Deployment Pipeline

```
Push to main
  → GitHub Actions (.github/workflows/cloudflare-pages.yml)
  → ubuntu-latest runner
  → Setup Bun (latest)
  → bun install
  → bun run lint
  → bun run build
  → wrangler pages deploy ./out → Cloudflare Pages
```

## Key Decisions

| Decision                   | Rationale                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| Static export              | Portfolio has no dynamic content; CDN-served static files maximize performance and minimize cost        |
| Tailwind CSS v4            | Uses `@theme` directive for design tokens instead of `tailwind.config.js`; CSS-native approach          |
| Dark-first theme           | Default `color-scheme: dark` with `data-theme='light'` override; theme persisted to localStorage        |
| Client-side theme init     | Inline `<script>` in `<head>` reads localStorage before paint to prevent flash                          |
| All components client-side | Most components use `'use client'` for animations and interactivity; acceptable for a small static site |
| Unoptimized images         | Required for static export (no image optimization server); images served as-is                          |
| `optimizePackageImports`   | Experimental Next.js feature for tree-shaking lucide-react and @radix-ui/react-icons                    |
