---
name: Wesley Coetzee
description: Personal site of an engineer building AI agents, set entirely in one monospace family on true black.
colors:
  background: '#000000'
  foreground: '#ededed'
  muted-foreground: '#7a7a7a'
  border: '#262626'
  primary: '#fafafa'
  primary-foreground: '#000000'
  accent: '#7a96d6'
  online: '#6ebe82'
  background-light: '#fafaf9'
  foreground-light: '#262626'
  muted-foreground-light: '#6b6b6b'
  border-light: '#e2e2e0'
  primary-light: '#171717'
  primary-foreground-light: '#fafaf9'
  accent-light: '#4a6aae'
  online-light: '#5cac70'
typography:
  display:
    fontFamily: 'Geist Mono, monospace'
    fontSize: 'clamp(2rem, 4vw + 0.5rem, 3.25rem)'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Geist Mono, monospace'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: 'Geist Mono, monospace'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: 'Geist Mono, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.43
    fontFeature: 'tnum'
  label:
    fontFamily: 'Geist Mono, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: '0.1em'
rounded:
  hairline: '1px'
  sm: '6px'
  full: '9999px'
spacing:
  row: '16px'
  gutter: '24px'
  column-gap: '40px'
  section: '48px'
  page-top: '56px'
  measure: '48rem'
components:
  section-heading:
    textColor: '{colors.muted-foreground}'
    typography: '{typography.label}'
  list-row:
    textColor: '{colors.primary}'
    typography: '{typography.body}'
    padding: '16px 0'
  list-row-hover:
    textColor: '{colors.accent}'
  list-row-meta:
    textColor: '{colors.muted-foreground}'
    typography: '{typography.meta}'
  text-button:
    textColor: '{colors.muted-foreground}'
    typography: '{typography.meta}'
  text-button-hover:
    textColor: '{colors.accent}'
  glass-dock:
    typography: '{typography.meta}'
    rounded: '{rounded.full}'
  glass-header:
    rounded: '{rounded.full}'
    padding: '10px 16px'
  skip-link:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    rounded: '{rounded.sm}'
    padding: '8px 16px'
  avatar:
    rounded: '{rounded.full}'
    size: '28px'
  status-dot:
    backgroundColor: '{colors.online}'
    rounded: '{rounded.full}'
    size: '6px'
---

# Design System: Wesley Coetzee

Tokens live in `src/app/globals.css` as full colour values in `@theme`, overridden under `html[data-theme='light']`. The `-light` keys above are those overrides. Components use the semantic Tailwind utilities (`text-primary`, `border-border`), never raw colours.

## 1. Overview

**Creative North Star: "The Engineer's Notebook"**

The page is a single sheet from a working notebook: one typeface, one column, entries written in rows and ruled with hairlines. Nothing is boxed, lifted, or illustrated. Hierarchy comes from size, weight, and the gap between things. The one dash of colour is the cursor: it shows where you are and what you can press, and nothing else.

Density is moderate and deliberate. The content sits in a 48rem measure with a 24px gutter, two lists side by side from 768px up, stacked below. Rows are 16px of vertical padding apart; sections are 48px apart; the page breathes at 40 to 56px top and bottom. Motion is a single 6px rise on load, staggered by section, and a nudge on hover. A return visitor should notice what's new in the list, not what's new in the chrome.

This system rejects Notion-clone resume pages, SaaS marketing surfaces (hero metric, three-up grid, gradient buttons, logo strip), generic dev-portfolio defaults (neon accent, Inter everywhere, "Hi, I'm X"), and maximalist novelty (3D heroes, scroll-jacking, WebGL for its own sake).

**Key Characteristics:**

- One family, Geist Mono, in three weights (400, 500, 700).
- True black (#000) by default; a near-neutral off-white light theme of equal standing.
- Flat content. Rows, headings and the graph sit straight on the sheet.
- Two panes of liquid glass float over it: a sticky header and a link dock. They bend the page as it scrolls underneath.
- Hairline row borders and full-width dividers are the only structure in the content.
- A single accent, used for state and the `#` section marker.
- Motion on load and on hover only. Nothing loops.

## 2. Colors

A monochrome ink-on-black palette with one cool blue for interaction and one green for presence.

### Primary

- **Cursor Blue** (`accent`, light `accent-light`): the `#` before each section label, link and button hover text, and the 2px focus-visible outline. It marks where attention or interaction is. It never fills a surface and never decorates static text.

### Tertiary

- **Online Green** (`online`, light `online-light`): the 6px location dot in the header, and only there. A presence signal, never decoration.

### Neutral

- **True Black** (`background`): the dark-theme page. Pure #000, not a tinted near-black.
- **Chalk** (`foreground`): body text on black.
- **Bright Chalk** (`primary`): the h1, list titles, and the name in the header. One step brighter than body so titles lead.
- **Graphite** (`muted-foreground`): section labels, roles, years, sources, footer links, the location label.
- **Rule** (`border`): row borders, dividers, the avatar ring.
- **Light theme**: Off-white page (`background-light`, chroma near zero, not cream), Ink (`foreground-light`), Deep Ink (`primary-light`), Pewter (`muted-foreground-light`), Pale Rule (`border-light`).

### Named Rules

**The Cursor Rule.** Cursor Blue appears only where the reader can act or where a section begins. If it's on static prose, remove it.

**The Equal Themes Rule.** Every token has a light counterpart and each theme is checked independently. Light mode is not a degraded mode.

**The AA Floor Rule.** Every text colour clears 4.5:1 on its own theme's page. Current lows: Graphite on black (about 4.9:1), Pewter on off-white (about 5.1:1), Cursor Blue (light) on off-white (about 5.1:1). Check any new muted value against these before shipping.

## 3. Typography

**Display Font:** Geist Mono (with monospace)
**Body Font:** Geist Mono (with monospace)
**Label/Mono Font:** Geist Mono (with monospace)

**Character:** One monospace family carries everything, chosen as the notebook's handwriting rather than as a "developer" costume. Fixed-width figures keep years and dates aligned down a column without extra tooling.

### Hierarchy

- **Display** (700, `clamp(2rem, 4vw + 0.5rem, 3.25rem)`, 1.15, -0.02em): the single h1. One per page.
- **Title** (400, 1.125rem, 1.75): the one-line subtitle under the h1, in Graphite.
- **Body** (400, 1rem, 1.5): list titles, footer links, the name in the header (at 500).
- **Meta** (400, 0.875rem, tabular figures): years, roles (italic), sources, the expand button.
- **Label** (400, 0.75rem, 0.1em tracking, uppercase): section headings (`# WORK`) and the location label. Short words only.

### Named Rules

**The One Family Rule.** Geist Mono only. Contrast comes from weight (400 / 500 / 700) and size, never from a second typeface.

**The Single Kicker Rule.** The `#`-prefixed uppercase label is the site's one named label system. Don't introduce a second kind of eyebrow, number markers, or decorative caps elsewhere.

## 4. Elevation

Content is flat. Rows, headings and the activity graph have no shadows, blurs, raised surfaces or tonal layering; separation comes from 1px rules in Rule grey and from spacing.

The chrome floats. The header and the link dock are liquid glass from the vendored kit in `src/components/liquid-glass/` (WebGL2, copied verbatim from [bilalgursen/liquid-glass](https://github.com/bilalgursen/liquid-glass)). They are the only raised surfaces and carry the kit's own soft shadow and rim. Without WebGL2 they fall back to a CSS frosted pill.

### Named Rules

**The Flat Page Rule.** If a piece of content needs a shadow or a filled panel to stand out, the hierarchy is wrong. Fix it with size, weight, or space.

**The Two Panes Rule.** Glass is reserved for the two pieces of chrome that float over the page: the sticky header and the link dock. Content (rows, headings, the activity graph) stays flat on the sheet and is what the glass bends. Never add a third pane, and never put content inside glass.

## 5. Components

### Section Heading

Label type in Graphite, preceded by a Cursor Blue `#` (hidden from assistive tech). An `h2` that labels its section via `aria-labelledby`. Sits 8px above its list.

### List Row (Work, Media)

The signature component: the notebook entry.

- **Structure:** title on the left, ship date on the right on a shared baseline, 16px vertical padding, 16px gap, a 1px Rule border under each row. An italic detail sits beside the title (a project's one-liner, an article's publication); title and detail wrap together on narrow screens.
- **Date:** month and year (`Oct 2026`), or the year alone when the month is unknown. Always newest first. The right column holds nothing but the date.
- **Default:** title in Bright Chalk, meta in Graphite with tabular figures.
- **Hover:** the title shifts 4px right and turns Cursor Blue over 200ms ease-out. The date doesn't move.
- **Expand:** Work shows 5 rows; a text button reveals the rest, each new row rising 6px in with a 50ms stagger.

### Text Button

Meta type in Graphite, no background, no border, no padding: `+ 3 more` / `− Show less`. Hover turns Cursor Blue. Reports `aria-expanded`.

### Glass Dock (Navigation)

`SocialLinks`: a clear `GlassButtonGroup` (tint 0.3, size md) fixed 24px above the bottom of the viewport (or the safe-area inset), centred. Plain-word links (Email, GitHub, X, LinkedIn, CV) at weight 500 share one body of glass, which swells under the pointer. Labelled `Elsewhere`. The page keeps 128px of bottom padding so the last row clears it.

### Header

`SiteHeader`: a clear `GlassCard` pill (tint 0.35, blur 2px) stuck 16px from the top, bleeding 16px past the measure on each side so its contents line up with the column. Avatar (28px circle, 1px Rule ring), name at weight 500 in Bright Chalk, then on the right a 6px Online Green dot with the location label (hidden under 640px) and the theme toggle.

### Theme Toggle

A 20px inline SVG icon button in Graphite, brightening on hover. The sun turns 90° on hover; the moon tilts -12°. On toggle the icon swaps in with a short rotate-and-scale. It renders an empty 20px box until the stored theme is known, to avoid a flash.

### Skip Link

Hidden until focused, then a Bright Chalk block (6px radius, 8px by 16px padding) with black text, top-left.

### Focus

Every interactive element gets a 2px Cursor Blue outline at 3px offset on `:focus-visible`.

## 6. Do's and Don'ts

### Do:

- **Do** keep everything in Geist Mono at 400, 500, or 700.
- **Do** build structure from 1px Rule borders and spacing (16px rows, 48px sections, 48rem measure).
- **Do** keep newest work first and every entry dated, so the cadence is visible on a return visit.
- **Do** reserve Cursor Blue for hover, focus, and the `#` marker.
- **Do** check both themes for AA contrast independently, and pair every new token with a light value.
- **Do** ease out (200 to 500ms) and keep entrance motion to a 6px rise; reduced-motion collapses it to near zero.

### Don't:

- **Don't** make it a Notion-clone resume page: a bullet-list CV in HTML with no point of view.
- **Don't** borrow SaaS marketing vocabulary: hero metric, three-up feature grid, gradient buttons, testimonial carousel, "Trusted by" logo strip.
- **Don't** fall into generic dev-portfolio defaults: neon accent, Inter everywhere, "Hi, I'm X" h1, tech-logo wall.
- **Don't** reach for maximalist novelty: 3D heroes, scroll-jacking, WebGL for its own sake.
- **Don't** add cards, filled panels, shadows or gradients to content, or glass beyond the header and the dock.
- **Don't** edit files in `src/components/liquid-glass/`. Customise through props and classes; update by re-copying from upstream.
- **Don't** use a `border-left` or `border-right` over 1px as a coloured accent.
- **Don't** add looping or continuously repainting animation (pulse, shimmer, spinners). The online dot stays still.
- **Don't** add uppercase labels beyond the `#` section heading and the location label.
