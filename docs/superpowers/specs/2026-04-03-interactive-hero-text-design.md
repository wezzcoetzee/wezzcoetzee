# Interactive Hero Text — Design Spec

Canvas-rendered hero text with mouse-repel and click-explode effects, powered by `@chenglou/pretext` for text measurement and layout.

## Decisions

- **Scope**: All text in the hero section (role badges, name, tagline, location)
- **Hover behavior**: Words repel away from cursor within a ~120px radius
- **Click behavior**: Words shatter into individual characters that explode radially outward
- **Recovery**: Spring-back to original positions with elastic ease
- **Re-triggerable**: Yes, click again to re-explode
- **Reduced motion**: Canvas disabled entirely, normal DOM text shown
- **Approach**: Full canvas rendering (Approach A) — pretext is load-bearing for all text measurement

## Architecture

A single React client component `InteractiveHeroText` renders a `<canvas>` element in place of the hero text DOM elements. A hidden screen-reader-only div preserves accessibility.

### Component Tree

```
InteractiveHeroText (client component)
├── <canvas> — renders all hero text, handles mouse events
├── <div aria-hidden="false" class="sr-only"> — hidden accessible text
└── Uses: @chenglou/pretext, requestAnimationFrame, useReducedMotion
```

### File Structure

```
src/components/
  InteractiveHeroText.tsx          — main canvas component, mouse events, render loop
  interactive-hero-text/
    particles.ts                   — particle types, spring force, repel force, damping
    text-layout.ts                 — pretext integration, font config, position calculation
```

### Integration

Replace the text content inside `Introduction.tsx` with `<InteractiveHeroText>`. The profile image and overall flex layout stay untouched. The canvas occupies exactly the space the text DOM elements occupied.

## Text Blocks

Each text element gets its own pretext `prepare()` call with matched font config:

| Element | Font String | Dark Color | Light Color |
|---------|------------|------------|-------------|
| Role badges | `"500 14px DM Sans"` | `#8c8c8c` | `#696055` |
| Name (h1) | `"700 60px Crimson Pro"` | `#f5f5f5` | `#16120e` |
| Tagline | `"600 32px Crimson Pro"` | `#e5e5e5` | `#292520` |
| Location | `"500 16px DM Sans"` | `#e5e5e5` | `#292520` |

Font sizes are desktop values. On mobile (`< 768px`), scale down to match the existing responsive CSS (h1: `text-5xl` → 48px, tagline: `text-3xl` → 30px).

## Pretext Usage

- **`prepare(text, fontString)`** — one-time setup per text block, caches segment widths
- **`prepareWithSegments(text, fontString)`** — returns segment data for word boundaries
- **`layoutWithLines(prepared, maxWidth, lineHeight)`** — computes line breaks and line widths for the canvas width
- **`walkLineRanges(prepared, maxWidth, callback)`** — per-line position data for rendering
- Segment boundaries from `prepareWithSegments` define word particles (hover) and are further split into grapheme clusters for character particles (explode)

## Physics Model

### Particle

```ts
type Particle = {
  text: string
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  font: string
  color: string
}
```

In word mode, each word is a particle. On explode, a word particle splits into multiple character particles inheriting the word's font/color.

### Hover Repel

- Detection radius: ~120px from cursor
- Force: inverse-square falloff (`force = strength / distance²`), direction is away from cursor
- Strength tuned so words shift noticeably but don't fly off-screen
- Words spring back when cursor moves away

### Click Explode

1. On click, find all word particles
2. Split each into character particles using pretext segment data for exact character positions within the word
3. Apply random radial velocity outward from click point (magnitude 5–15 px/frame, randomized per character)
4. Add slight random rotation component for visual variety
5. Spring force pulls characters back to their word's original character positions
6. While characters are in flight, hover repel operates at character granularity (not word)
7. Once all characters of a word have settled (velocity magnitude < 0.5), merge back into a single word particle

### Spring Return

- Spring constant: `k = 0.08`
- Damping: `d = 0.85`
- Each frame: `velocity += (target - position) * k; velocity *= d; position += velocity`

### Idle Detection

Track total kinetic energy (`sum of vx² + vy²`). When below a threshold (e.g., 0.1), pause the rAF loop. Resume on `mousemove` or `click` events.

## Render Loop

```
requestAnimationFrame:
  1. For each particle near cursor: apply repel force
  2. For all particles: apply spring force toward target
  3. For all particles: apply damping, update position
  4. ctx.clearRect()
  5. For each particle: ctx.fillText(text, x, y)
  6. Check idle → pause if settled
```

## Canvas Sizing

- Canvas dimensions match the text area container's bounding box
- `devicePixelRatio` scaling for sharp text on retina displays
- `ResizeObserver` on container triggers recalculation:
  - New canvas dimensions
  - Re-run pretext `layout()` with new `maxWidth` for line breaks
  - Update all particle `targetX`/`targetY` positions
  - Snap particles to new targets (no animation on resize)

## Theme Awareness

- `MutationObserver` on `document.documentElement` watching `data-theme` attribute
- On change: update color map for all particles, re-render

## Accessibility

- Canvas has `role="img"` and an `aria-label` describing the hero content
- Hidden div with `sr-only` class contains the full text content for screen readers
- `useReducedMotion` hook: if `prefers-reduced-motion: reduce`, don't render the canvas at all — fall through to normal DOM text in `Introduction.tsx`

## Edge Cases

- **Fonts not loaded**: Use `document.fonts.ready` before running pretext `prepare()` — measurements depend on the actual font metrics
- **Mobile/touch**: `touchmove` maps to hover repel, `touchstart` maps to click explode
- **Canvas not supported**: Fall through to normal DOM text (the sr-only div becomes visible)
- **Very small viewports**: Below 400px width, disable the canvas and show DOM text — the effect needs enough space to be worthwhile

## Dependencies

- `@chenglou/pretext` — text measurement and layout (new dependency)
- Existing: `react`, `next/image`, `useReducedMotion` hook
