# Quality Standards

## Linting

ESLint with `eslint-config-next` (includes `next/core-web-vitals` rules).

```bash
bun run lint
```

Lint runs in CI before build. Failures block deployment.

## Formatting

Prettier with default configuration.

```bash
bun run format        # Fix formatting
bun run format:check  # Check only (CI)
```

## Type Safety

- TypeScript strict mode via Next.js defaults
- No `any` types — use proper typing or `unknown`
- No `@ts-ignore` or `@ts-expect-error` suppression
- Explicit types for data structures (`Project` type in `src/data/projects.ts`)

## Performance Targets

Static site on Cloudflare CDN — performance is inherently strong:

- No JavaScript bundle for server components
- Fonts loaded via `next/font` (self-hosted, no layout shift)
- Google Analytics lazy-loaded (`strategy="lazyOnload"`)
- Console statements stripped in production builds
- `optimizePackageImports` for tree-shaking icon libraries
- Images unoptimized (static export constraint) — use appropriately sized source images

## Accessibility

- Skip-to-content link
- Semantic HTML with landmark sections
- `aria-label` on SVG icons
- `prefers-reduced-motion` respected for all animations
- Color contrast maintained across both themes
- `lang="en"` on root `<html>` element

## Build Verification

The CI pipeline runs these checks in order:

1. `bun run lint` — ESLint
2. `bun run build` — TypeScript compilation + static export

Both must pass before deployment to Cloudflare Pages.
