# Design System

Tokens and conventions from `src/app/globals.css`.

## Color Tokens

Full colour values (not RGB channels), declared in `@theme` and overridden under `html[data-theme='light']`.

| Token                        | Dark      | Light     | Usage                     |
| ---------------------------- | --------- | --------- | ------------------------- |
| `--color-background`         | `#000000` | `#fafaf9` | Page background           |
| `--color-foreground`         | `#ededed` | `#262626` | Body text                 |
| `--color-muted-foreground`   | `#7a7a7a` | `#8a8a8a` | Secondary text            |
| `--color-border`             | `#262626` | `#e2e2e0` | Row borders, dividers     |
| `--color-primary`            | `#fafafa` | `#171717` | Headings, link titles     |
| `--color-primary-foreground` | `#000000` | `#fafaf9` | Text on primary bg        |
| `--color-accent`             | `#7a96d6` | `#5a7abe` | `#` markers, hover, focus |
| `--color-online`             | `#6ebe82` | `#5cac70` | Location dot              |

## Typography

One family: Geist Mono (400, 500, 700) via `next/font`, exposed as `--font-mono`. `h1` is bold, `clamp(2rem, 4vw + 0.5rem, 3.25rem)`, `-0.02em` tracking. Section labels are `text-xs`, widely tracked, prefixed with an accent `#`.

## Motion

| Class        | Effect                  | Use                      |
| ------------ | ----------------------- | ------------------------ |
| `.fade-in`   | Rise 6px + fade, 0.5s   | Page sections, staggered |
| `.rise-in`   | Same, 0.35s             | Expanded work items      |
| `.icon-swap` | Rotate + scale in, 0.4s | Theme toggle icon        |

No looping animations. `prefers-reduced-motion` collapses everything to ~0ms.

## Motifs

- `.divider`: 1px rule in `--color-border`
- Lists: hairline row borders, title left, meta right
- `.gh-chart`: inverted in dark mode so the third-party chart reads on black

## Theme Switching

An inline script in `<head>` reads `localStorage('theme')`, falling back to `prefers-color-scheme`, and sets `data-theme` before paint. `.no-transitions` suppresses colour transitions for the first two frames.

## Principles

1. Restraint over decoration. No gradients, cards, or illustration.
2. Typography and spacing carry hierarchy.
3. Motion only where it aids comprehension.
4. WCAG AA in both themes; light mode is not second-class.
