# AGENTS.md

Agent guidance for working in this portfolio repository.

## Project Context

Single-page static portfolio for Wesley Coetzee. No database, no auth, no API routes. See [ARCHITECTURE.md](./ARCHITECTURE.md).

## Common Tasks

- **Projects**: `WORK` in `src/data/work.ts`
- **Articles and talks**: `MEDIA` in `src/data/media.ts`
- **Social links**: `SocialLinks.tsx`, plus `sameAs` in the Person schema (`src/app/page.tsx`)
- **SEO metadata**: `src/app/layout.tsx`
- **Security headers / redirects**: `public/_headers`, `public/_redirects`
- Keep `public/llms.txt` and `public/llms-full.txt` in step with content changes.

Run `bun run build` after changes to verify the static export.

## Styling

Tokens live in `src/app/globals.css` (see [docs/DESIGN.md](./docs/DESIGN.md)). Use semantic tokens, never raw colours. Dark is default; light is `html[data-theme='light']`.

## Deployment

Merge to `main` and `.github/workflows/cloudflare-pages.yml` lints, builds and deploys `./out` to Cloudflare Pages. PRs run lint, format check and build.

## Constraints

- Bun only (`bun install`, `bun run`, `bunx`)
- No `any`, `@ts-ignore` or `@ts-expect-error`
- No commented-out code
- Static export: no API routes, middleware, SSR or ISR
- Server components by default; add `'use client'` only for state or browser APIs
