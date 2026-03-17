# Design System

Design tokens and conventions extracted from `src/app/globals.css`.

## Color Tokens

All colors are defined as space-separated RGB channels (e.g., `10 10 10`) and consumed via `rgb(var(--color-*))`. This enables opacity modifiers like `rgb(var(--color-primary) / 0.5)`.

### Dark Theme (Default)

| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--color-background` | `10 10 10` | `#0a0a0a` | Page background |
| `--color-foreground` | `229 229 229` | `#e5e5e5` | Body text |
| `--color-card` | `20 20 20` | `#141414` | Card surfaces |
| `--color-card-foreground` | `229 229 229` | `#e5e5e5` | Card text |
| `--color-muted` | `26 26 26` | `#1a1a1a` | Subdued surfaces |
| `--color-muted-foreground` | `140 140 140` | `#8c8c8c` | Secondary text |
| `--color-border` | `38 38 38` | `#262626` | Borders, dividers |
| `--color-primary` | `245 245 245` | `#f5f5f5` | Headings, emphasis |
| `--color-primary-foreground` | `10 10 10` | `#0a0a0a` | Text on primary bg |

### Light Theme (`html[data-theme='light']`)

| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--color-background` | `250 248 245` | `#faf8f5` | Warm off-white background |
| `--color-foreground` | `41 37 32` | `#292520` | Body text |
| `--color-card` | `244 241 237` | `#f4f1ed` | Card surfaces |
| `--color-card-foreground` | `41 37 32` | `#292520` | Card text |
| `--color-muted` | `236 232 226` | `#ece8e2` | Subdued surfaces |
| `--color-muted-foreground` | `105 96 85` | `#696055` | Secondary text |
| `--color-border` | `220 215 207` | `#dcd7cf` | Borders |
| `--color-primary` | `22 18 14` | `#16120e` | Headings, emphasis |
| `--color-primary-foreground` | `250 248 245` | `#faf8f5` | Text on primary bg |

## Typography

| Role | Font | Variable | Weights |
|------|------|----------|---------|
| Display (headings) | Crimson Pro | `--font-display` | 400, 600, 700, 900 |
| Body | DM Sans | `--font-body` | 400, 500, 600, 700 |

### Heading Scale

| Element | Size (mobile → desktop) | Weight | Line Height |
|---------|------------------------|--------|-------------|
| `h1` | `text-5xl` → `text-6xl` | Bold | 1.1 |
| `h2` | `text-2xl` → `text-3xl` | Semibold | 1.2 |
| `h3` | `text-xl` → `text-2xl` | Semibold | 1.3 |
| `p` | `text-base` | Regular | Relaxed |

## Spacing (Container)

Custom `container` utility with responsive inline padding:

| Breakpoint | Padding |
|-----------|---------|
| Default | `1rem` |
| `sm` | `2rem` |
| `lg` | `4rem` |
| `xl` | `5rem` |
| `2xl` | `6rem` |

## Animations

Three entrance animations, all `ease-out` with `forwards` fill:

| Class | Effect | Duration |
|-------|--------|----------|
| `.animate-fade-in-up` | Fade + slide up 20px | 0.6s |
| `.animate-fade-in` | Fade only | 0.6s |
| `.animate-scale-in` | Fade + scale from 0.95 | 0.5s |

All animations respect `prefers-reduced-motion: reduce` (duration set to near-zero).

## Visual Motifs

### CornerBrackets
Decorative corner accents on cards (`src/components/CornerBrackets.tsx`). Four 12px L-shaped borders at each corner using `border-foreground`.

### Dot Matrix
Background pattern using radial gradient dots at 24px intervals, with optional radial fade mask:
- `.dot-matrix` — repeating dot pattern
- `.dot-matrix-fade` — radial mask that fades dots toward edges

### Card Style
`.card-minimal` — card background with hover state that shifts to muted background and lighter border.

## Theme Switching

Theme is toggled via `data-theme` attribute on `<html>`. An inline script in `<head>` reads `localStorage('theme')` or falls back to `prefers-color-scheme` to prevent flash of wrong theme. Transitions are temporarily disabled during initial load via `.no-transitions`.

## Design Context

### Users

Recruiters, collaborators, and the broader tech community visiting a personal portfolio. They arrive with a professional lens — evaluating capability, taste, and fit. The job to be done: quickly understand who Wesley is, what he's built, and whether to reach out.

### Brand Personality

**Precise, minimal, confident.** Let the craft speak. No flash, no filler. Every element earns its place.

### Emotional Goals

- **Credibility**: This is a senior engineer who takes their craft seriously
- **Approachability**: Someone you'd want on your team or project
- **Intrigue**: Enough depth to reward exploration without demanding it

### Aesthetic Direction

- **Visual tone**: Monochrome-dominant, editorial, typographically-led. Crimson Pro serifs for warmth and authority; DM Sans for clean utility.
- **Theme**: Dark-first with warm light alternative. Both themes use intentionally muted palettes — no saturated accent colors.
- **Motifs**: Corner brackets (engineering precision), dot matrix (technical texture), generous whitespace.
- **Anti-patterns**: No gradients, no glassmorphism, no stock photography, no decorative illustration. Nothing that looks like a template.

### Design Principles

1. **Restraint over decoration** — Remove before adding. If a visual element doesn't serve comprehension or hierarchy, cut it.
2. **Typography is the interface** — Type size, weight, and spacing do the heavy lifting. Rely on the Crimson Pro / DM Sans pairing to establish mood and hierarchy.
3. **Earned attention** — Animations and interactive elements are subtle and purposeful. No entrance for the sake of entrance.
4. **Accessible by default** — WCAG AA contrast ratios, visible focus states, reduced-motion support. Accessibility is not a feature, it's the baseline.
5. **Dark-first, light-considered** — Design in dark mode, then verify light mode feels equally intentional (warm, not washed out).
