# AGENTS.md

Agent guidance for working in this portfolio repository.

## Project Context

Static portfolio site for Wesley Coetzee. No database, no auth, no API routes. All content is hardcoded in TypeScript files under `src/data/`.

For full architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Agent Roles

### Content Updates

Update portfolio content by editing files in `src/data/`:

- **Projects**: `src/data/projects.ts` — `PROJECTS` array of `Project` objects
- **Social links**: `src/data/index.tsx` — `CONTACTS` array with inline SVG icons
- **SEO metadata**: `src/app/layout.tsx` — Next.js `Metadata` export
- **Structured data**: `src/app/page.tsx` — JSON-LD schemas (Person, WebSite)

After content changes, run `bun run build` to verify static export succeeds.

### Styling

Design system is defined in `src/app/globals.css` using Tailwind CSS v4's `@theme` directive. See [docs/DESIGN.md](./docs/DESIGN.md) for the full token reference.

Key rules:
- Use semantic color tokens (`--color-foreground`, `--color-muted`, etc.), never raw color values
- Dark theme is the default; light theme is applied via `html[data-theme='light']`
- Theme toggle is in `src/components/ThemeToggle.tsx`

### SEO

SEO configuration lives in three places:
1. `src/app/layout.tsx` — OpenGraph, Twitter cards, robots, canonical URL
2. `src/app/page.tsx` — JSON-LD structured data (Person + WebSite schemas)
3. `src/app/sitemap.ts` and `src/app/robots.ts` — sitemap and robots.txt generation

Also maintain `public/llms.txt` and `public/llms-full.txt` for LLM discoverability.

### Deployment

Deployment is fully automated via GitHub Actions → Cloudflare Pages:
- Workflow: `.github/workflows/cloudflare-pages.yml`
- Triggers on push to `main`
- Pipeline: `bun install` → `bun run lint` → `bun run build` → deploy `./out` to Cloudflare Pages

No manual deployment steps. Merge to `main` and it ships.

## Constraints

- **Package manager**: Bun only (`bun install`, `bun run`, `bunx`)
- **No `as any`**, `@ts-ignore`, or `@ts-expect-error`
- **No commented-out code** — delete it or don't write it
- **Static export**: No server-side features (API routes, middleware, SSR, ISR)
- All components under `src/components/` are client components (`'use client'`) except `CornerBrackets` and `Footer`
