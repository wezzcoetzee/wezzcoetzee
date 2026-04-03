# Interactive Hero Text Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Canvas-rendered hero text with mouse-repel (word-level) and click-explode (character-level) effects, powered by `@chenglou/pretext`.

**Architecture:** A single `InteractiveHeroText` React component renders all hero text on a `<canvas>`. Pretext handles text measurement and line layout. A physics simulation runs in a `requestAnimationFrame` loop. Hidden DOM text preserves accessibility. When `prefers-reduced-motion` is active or viewport < 400px, the canvas is skipped entirely and `Introduction.tsx` renders normal DOM text.

**Tech Stack:** `@chenglou/pretext`, React 19, Next.js 15, Canvas API, `vitest` (new dev dependency for pure function tests)

---

## File Structure

```
src/components/
  InteractiveHeroText.tsx                    — React component: canvas, mouse events, rAF loop, a11y div
  interactive-hero-text/
    particles.ts                             — Particle type, spring force, repel force, explode, settle detection
    text-layout.ts                           — Pretext integration: prepare texts, compute word/char positions
    constants.ts                             — Physics tuning constants, font configs, color maps
src/components/Introduction.tsx              — Modified: conditionally render InteractiveHeroText vs DOM text
src/hooks/use-reduced-motion.ts              — Existing, no changes
__tests__/
  interactive-hero-text/
    particles.test.ts                        — Unit tests for physics math
    text-layout.test.ts                      — Unit tests for position computation
```

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install pretext and vitest**

```bash
bun add @chenglou/pretext
bun add -d vitest @vitest/coverage-v8
```

- [ ] **Step 2: Add test script to package.json**

Add to the `"scripts"` section of `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify install**

```bash
bun run test
```

Expected: vitest runs, finds no tests, exits cleanly.

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add @chenglou/pretext and vitest"
```

---

### Task 2: Constants — font configs and physics tuning

**Files:**
- Create: `src/components/interactive-hero-text/constants.ts`

- [ ] **Step 1: Create constants file**

```ts
export const FONT_CONFIGS = [
  { key: 'badges', font: '500 14px "DM Sans"', darkColor: '#8c8c8c', lightColor: '#696055' },
  { key: 'name', font: '700 60px "Crimson Pro"', darkColor: '#f5f5f5', lightColor: '#16120e' },
  { key: 'tagline', font: '600 32px "Crimson Pro"', darkColor: '#e5e5e5', lightColor: '#292520' },
  { key: 'location', font: '500 16px "DM Sans"', darkColor: '#e5e5e5', lightColor: '#292520' },
] as const

export const MOBILE_FONT_CONFIGS = [
  { key: 'badges', font: '500 12px "DM Sans"', darkColor: '#8c8c8c', lightColor: '#696055' },
  { key: 'name', font: '700 48px "Crimson Pro"', darkColor: '#f5f5f5', lightColor: '#16120e' },
  { key: 'tagline', font: '600 30px "Crimson Pro"', darkColor: '#e5e5e5', lightColor: '#292520' },
  { key: 'location', font: '500 14px "DM Sans"', darkColor: '#e5e5e5', lightColor: '#292520' },
] as const

export type FontConfigKey = (typeof FONT_CONFIGS)[number]['key']

export const HERO_TEXTS: Record<FontConfigKey, string> = {
  badges: 'TECH LEAD    PRINCIPAL SOFTWARE ENGINEER',
  name: 'Wesley Coetzee',
  tagline: 'Building scalable solutions & leading engineering teams',
  location: 'Auckland, New Zealand',
}

export const LINE_HEIGHTS: Record<FontConfigKey, number> = {
  badges: 20,
  name: 72,
  tagline: 42,
  location: 24,
}

export const BLOCK_GAPS: Record<FontConfigKey, number> = {
  badges: 0,
  name: 16,
  tagline: 8,
  location: 24,
}

export const REPEL_RADIUS = 120
export const REPEL_STRENGTH = 800
export const SPRING_K = 0.08
export const DAMPING = 0.85
export const EXPLODE_MIN_VELOCITY = 5
export const EXPLODE_MAX_VELOCITY = 15
export const SETTLE_THRESHOLD = 0.5
export const IDLE_ENERGY_THRESHOLD = 0.1
export const MIN_CANVAS_WIDTH = 400
```

- [ ] **Step 2: Commit**

```bash
git add src/components/interactive-hero-text/constants.ts
git commit -m "feat: add interactive hero text constants"
```

---

### Task 3: Particle physics — types and pure functions

**Files:**
- Create: `src/components/interactive-hero-text/particles.ts`
- Create: `__tests__/interactive-hero-text/particles.test.ts`

- [ ] **Step 1: Write failing tests for particle physics**

```ts
import { describe, it, expect } from 'vitest'
import {
  type Particle,
  createParticle,
  applySpring,
  applyRepel,
  applyDamping,
  isSettled,
  totalKineticEnergy,
} from '@/components/interactive-hero-text/particles'

describe('createParticle', () => {
  it('creates a particle at target position with zero velocity', () => {
    const p = createParticle('Hello', 100, 200, '700 60px "Crimson Pro"', '#f5f5f5')
    expect(p.text).toBe('Hello')
    expect(p.x).toBe(100)
    expect(p.y).toBe(200)
    expect(p.targetX).toBe(100)
    expect(p.targetY).toBe(200)
    expect(p.vx).toBe(0)
    expect(p.vy).toBe(0)
    expect(p.font).toBe('700 60px "Crimson Pro"')
    expect(p.color).toBe('#f5f5f5')
  })
})

describe('applySpring', () => {
  it('accelerates particle toward target', () => {
    const p = createParticle('A', 0, 0, 'f', 'c')
    p.x = 100
    p.y = 50
    const result = applySpring(p, 0.08)
    expect(result.vx).toBeCloseTo(-8)
    expect(result.vy).toBeCloseTo(-4)
  })

  it('does nothing when particle is at target', () => {
    const p = createParticle('A', 50, 50, 'f', 'c')
    const result = applySpring(p, 0.08)
    expect(result.vx).toBe(0)
    expect(result.vy).toBe(0)
  })
})

describe('applyRepel', () => {
  it('pushes particle away from cursor within radius', () => {
    const p = createParticle('A', 100, 100, 'f', 'c')
    const result = applyRepel(p, 150, 100, 120, 800)
    expect(result.vx).toBeLessThan(0)
    expect(result.vy).toBe(0)
  })

  it('does nothing when cursor is outside radius', () => {
    const p = createParticle('A', 100, 100, 'f', 'c')
    const result = applyRepel(p, 500, 500, 120, 800)
    expect(result.vx).toBe(0)
    expect(result.vy).toBe(0)
  })
})

describe('applyDamping', () => {
  it('reduces velocity by damping factor', () => {
    const p = createParticle('A', 0, 0, 'f', 'c')
    p.vx = 10
    p.vy = -5
    const result = applyDamping(p, 0.85)
    expect(result.vx).toBeCloseTo(8.5)
    expect(result.vy).toBeCloseTo(-4.25)
  })
})

describe('isSettled', () => {
  it('returns true when velocity is below threshold', () => {
    const p = createParticle('A', 50, 50, 'f', 'c')
    p.vx = 0.1
    p.vy = 0.1
    expect(isSettled(p, 0.5)).toBe(true)
  })

  it('returns false when velocity exceeds threshold', () => {
    const p = createParticle('A', 50, 50, 'f', 'c')
    p.vx = 3
    p.vy = 4
    expect(isSettled(p, 0.5)).toBe(false)
  })
})

describe('totalKineticEnergy', () => {
  it('sums squared velocities of all particles', () => {
    const particles = [
      { ...createParticle('A', 0, 0, 'f', 'c'), vx: 3, vy: 4 },
      { ...createParticle('B', 0, 0, 'f', 'c'), vx: 1, vy: 0 },
    ]
    expect(totalKineticEnergy(particles)).toBeCloseTo(26)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
bun run test __tests__/interactive-hero-text/particles.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement particles.ts**

```ts
export type Particle = {
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

export function createParticle(
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
): Particle {
  return { text, x, y, targetX: x, targetY: y, vx: 0, vy: 0, font, color }
}

export function applySpring(p: Particle, k: number): Particle {
  return {
    ...p,
    vx: p.vx + (p.targetX - p.x) * k,
    vy: p.vy + (p.targetY - p.y) * k,
  }
}

export function applyRepel(
  p: Particle,
  cursorX: number,
  cursorY: number,
  radius: number,
  strength: number,
): Particle {
  const dx = p.x - cursorX
  const dy = p.y - cursorY
  const distSq = dx * dx + dy * dy
  if (distSq > radius * radius || distSq < 1) return p
  const dist = Math.sqrt(distSq)
  const force = strength / distSq
  return {
    ...p,
    vx: p.vx + (dx / dist) * force,
    vy: p.vy + (dy / dist) * force,
  }
}

export function applyDamping(p: Particle, damping: number): Particle {
  return { ...p, vx: p.vx * damping, vy: p.vy * damping }
}

export function updatePosition(p: Particle): Particle {
  return { ...p, x: p.x + p.vx, y: p.y + p.vy }
}

export function isSettled(p: Particle, threshold: number): boolean {
  return Math.abs(p.vx) < threshold && Math.abs(p.vy) < threshold
}

export function totalKineticEnergy(particles: Particle[]): number {
  let energy = 0
  for (const p of particles) {
    energy += p.vx * p.vx + p.vy * p.vy
  }
  return energy
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
bun run test __tests__/interactive-hero-text/particles.test.ts
```

Expected: all 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/interactive-hero-text/particles.ts __tests__/interactive-hero-text/particles.test.ts
git commit -m "feat: add particle physics engine with tests"
```

---

### Task 4: Text layout — pretext integration and position computation

**Files:**
- Create: `src/components/interactive-hero-text/text-layout.ts`
- Create: `__tests__/interactive-hero-text/text-layout.test.ts`

- [ ] **Step 1: Write failing tests for text layout utilities**

These tests verify the pure position-computation logic. They use mock prepared data rather than calling pretext directly (which needs a canvas context).

```ts
import { describe, it, expect } from 'vitest'
import {
  computeWordPositions,
  splitWordIntoCharPositions,
  type WordPosition,
} from '@/components/interactive-hero-text/text-layout'

describe('computeWordPositions', () => {
  it('computes x/y for words on a single line', () => {
    const segments = ['Hello', ' ', 'World']
    const widths = [40, 8, 48]
    const lineStart = { segmentIndex: 0, graphemeIndex: 0 }
    const lineEnd = { segmentIndex: 3, graphemeIndex: 0 }
    const result = computeWordPositions(segments, widths, lineStart, lineEnd, 0, '16px sans', '#fff')
    expect(result).toHaveLength(2)
    expect(result[0].text).toBe('Hello')
    expect(result[0].x).toBe(0)
    expect(result[0].y).toBe(0)
    expect(result[1].text).toBe('World')
    expect(result[1].x).toBe(48)
    expect(result[1].y).toBe(0)
  })
})

describe('splitWordIntoCharPositions', () => {
  it('splits a word into character positions using grapheme widths', () => {
    const word: WordPosition = {
      text: 'Hi',
      x: 100,
      y: 50,
      width: 20,
      font: '16px sans',
      color: '#fff',
      graphemeWidths: [12, 8],
    }
    const chars = splitWordIntoCharPositions(word)
    expect(chars).toHaveLength(2)
    expect(chars[0].text).toBe('H')
    expect(chars[0].x).toBe(100)
    expect(chars[1].text).toBe('i')
    expect(chars[1].x).toBe(112)
    expect(chars[1].y).toBe(50)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
bun run test __tests__/interactive-hero-text/text-layout.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement text-layout.ts**

```ts
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'
import type { LayoutCursor } from '@chenglou/pretext'
import { createParticle, type Particle } from './particles'
import { FONT_CONFIGS, MOBILE_FONT_CONFIGS, HERO_TEXTS, LINE_HEIGHTS, BLOCK_GAPS } from './constants'
import type { FontConfigKey } from './constants'

export type WordPosition = {
  text: string
  x: number
  y: number
  width: number
  font: string
  color: string
  graphemeWidths: number[]
}

export function computeWordPositions(
  segments: string[],
  widths: number[],
  lineStart: LayoutCursor,
  lineEnd: LayoutCursor,
  lineY: number,
  font: string,
  color: string,
): WordPosition[] {
  const words: WordPosition[] = []
  let x = 0
  for (let i = lineStart.segmentIndex; i < lineEnd.segmentIndex; i++) {
    const seg = segments[i]
    const w = widths[i]
    if (seg.trim().length > 0) {
      const graphemeWidths = splitGraphemeWidths(seg, w)
      words.push({ text: seg, x, y: lineY, width: w, font, color, graphemeWidths })
    }
    x += w
  }
  return words
}

function splitGraphemeWidths(text: string, totalWidth: number): number[] {
  const graphemes = [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].map(
    (s) => s.segment,
  )
  const charWidth = totalWidth / graphemes.length
  return graphemes.map(() => charWidth)
}

export function splitWordIntoCharPositions(word: WordPosition): { text: string; x: number; y: number }[] {
  const graphemes = [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(word.text)].map(
    (s) => s.segment,
  )
  const chars: { text: string; x: number; y: number }[] = []
  let x = word.x
  for (let i = 0; i < graphemes.length; i++) {
    chars.push({ text: graphemes[i], x, y: word.y })
    x += word.graphemeWidths[i]
  }
  return chars
}

export type LayoutResult = {
  wordPositions: WordPosition[]
  totalHeight: number
}

export function layoutAllText(
  canvasWidth: number,
  isMobile: boolean,
  theme: 'dark' | 'light',
): LayoutResult {
  const configs = isMobile ? MOBILE_FONT_CONFIGS : FONT_CONFIGS
  const allWords: WordPosition[] = []
  let yOffset = 0

  for (const config of configs) {
    const key = config.key as FontConfigKey
    const text = HERO_TEXTS[key]
    const colorField = theme === 'dark' ? 'darkColor' : 'lightColor'
    const color = config[colorField]
    const lineHeight = LINE_HEIGHTS[key]
    const gap = BLOCK_GAPS[key]

    yOffset += gap

    const prepared = prepareWithSegments(text, config.font)
    const { lines } = layoutWithLines(prepared, canvasWidth, lineHeight)

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx]
      const lineY = yOffset + lineIdx * lineHeight
      const words = computeWordPositions(
        prepared.segments,
        (prepared as Record<string, unknown>).widths as number[],
        line.start,
        line.end,
        lineY,
        config.font,
        color,
      )
      allWords.push(...words)
    }

    yOffset += lines.length * lineHeight
  }

  return { wordPositions: allWords, totalHeight: yOffset }
}

export function wordPositionsToParticles(positions: WordPosition[]): Particle[] {
  return positions.map((wp) => createParticle(wp.text, wp.x, wp.y, wp.font, wp.color))
}

export function explodeWordToCharParticles(
  word: WordPosition,
  clickX: number,
  clickY: number,
  minVel: number,
  maxVel: number,
): Particle[] {
  const chars = splitWordIntoCharPositions(word)
  return chars.map((ch) => {
    const dx = ch.x - clickX
    const dy = ch.y - clickY
    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5
    const speed = minVel + Math.random() * (maxVel - minVel)
    const p = createParticle(ch.text, ch.x, ch.y, word.font, word.color)
    p.vx = Math.cos(angle) * speed
    p.vy = Math.sin(angle) * speed
    p.targetX = ch.x
    p.targetY = ch.y
    return p
  })
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
bun run test __tests__/interactive-hero-text/text-layout.test.ts
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/interactive-hero-text/text-layout.ts __tests__/interactive-hero-text/text-layout.test.ts
git commit -m "feat: add pretext-powered text layout engine with tests"
```

---

### Task 5: InteractiveHeroText canvas component

**Files:**
- Create: `src/components/InteractiveHeroText.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import {
  layoutAllText,
  wordPositionsToParticles,
  explodeWordToCharParticles,
  type WordPosition,
} from './interactive-hero-text/text-layout'
import {
  type Particle,
  applySpring,
  applyRepel,
  applyDamping,
  updatePosition,
  totalKineticEnergy,
} from './interactive-hero-text/particles'
import {
  REPEL_RADIUS,
  REPEL_STRENGTH,
  SPRING_K,
  DAMPING,
  EXPLODE_MIN_VELOCITY,
  EXPLODE_MAX_VELOCITY,
  IDLE_ENERGY_THRESHOLD,
  MIN_CANVAS_WIDTH,
  HERO_TEXTS,
} from './interactive-hero-text/constants'

export default function InteractiveHeroText() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [canvasEnabled, setCanvasEnabled] = useState(false)

  const particlesRef = useRef<Particle[]>([])
  const wordPositionsRef = useRef<WordPosition[]>([])
  const cursorRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)
  const explodedRef = useRef(false)

  const getTheme = useCallback((): 'dark' | 'light' => {
    return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ?? 'dark'
  }, [])

  const initLayout = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const width = container.clientWidth
    if (width < MIN_CANVAS_WIDTH) {
      setCanvasEnabled(false)
      return
    }
    setCanvasEnabled(true)

    const isMobile = width < 768
    const theme = getTheme()
    const dpr = window.devicePixelRatio || 1

    const { wordPositions, totalHeight } = layoutAllText(width, isMobile, theme)
    wordPositionsRef.current = wordPositions
    particlesRef.current = wordPositionsToParticles(wordPositions)
    explodedRef.current = false

    canvas.width = width * dpr
    canvas.height = totalHeight * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${totalHeight}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      renderFrame(ctx)
    }
  }, [getTheme])

  const renderFrame = useCallback((ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const width = canvas.style.width ? parseInt(canvas.style.width) : canvas.width
    const height = canvas.style.height ? parseInt(canvas.style.height) : canvas.height
    ctx.clearRect(0, 0, width, height)
    for (const p of particlesRef.current) {
      ctx.font = p.font
      ctx.fillStyle = p.color
      ctx.fillText(p.text, p.x, p.y)
    }
  }, [])

  const tick = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    const cursor = cursorRef.current
    particlesRef.current = particlesRef.current.map((p) => {
      let updated = applyRepel(p, cursor.x, cursor.y, REPEL_RADIUS, REPEL_STRENGTH)
      updated = applySpring(updated, SPRING_K)
      updated = applyDamping(updated, DAMPING)
      updated = updatePosition(updated)
      return updated
    })

    renderFrame(ctx)

    if (totalKineticEnergy(particlesRef.current) > IDLE_ENERGY_THRESHOLD) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      if (explodedRef.current) {
        particlesRef.current = wordPositionsToParticles(wordPositionsRef.current)
        explodedRef.current = false
        renderFrame(ctx)
      }
      runningRef.current = false
    }
  }, [renderFrame])

  const startLoop = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      cursorRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      startLoop()
    },
    [startLoop],
  )

  const handleMouseLeave = useCallback(() => {
    cursorRef.current = { x: -9999, y: -9999 }
    startLoop()
  }, [startLoop])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      const newParticles: Particle[] = []
      for (const wp of wordPositionsRef.current) {
        const chars = explodeWordToCharParticles(
          wp,
          clickX,
          clickY,
          EXPLODE_MIN_VELOCITY,
          EXPLODE_MAX_VELOCITY,
        )
        newParticles.push(...chars)
      }
      particlesRef.current = newParticles
      explodedRef.current = true
      startLoop()
    },
    [startLoop],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect || !e.touches[0]) return
      cursorRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
      startLoop()
    },
    [startLoop],
  )

  const handleTouchEnd = useCallback(() => {
    cursorRef.current = { x: -9999, y: -9999 }
    startLoop()
  }, [startLoop])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect || !e.touches[0]) return
      const clickX = e.touches[0].clientX - rect.left
      const clickY = e.touches[0].clientY - rect.top

      const newParticles: Particle[] = []
      for (const wp of wordPositionsRef.current) {
        const chars = explodeWordToCharParticles(
          wp,
          clickX,
          clickY,
          EXPLODE_MIN_VELOCITY,
          EXPLODE_MAX_VELOCITY,
        )
        newParticles.push(...chars)
      }
      particlesRef.current = newParticles
      explodedRef.current = true
      startLoop()
    },
    [startLoop],
  )

  useEffect(() => {
    if (reducedMotion) return

    document.fonts.ready.then(() => {
      initLayout()
    })

    const resizeObserver = new ResizeObserver(() => {
      initLayout()
    })
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') {
          initLayout()
          return
        }
      }
    })
    mutationObserver.observe(document.documentElement, { attributes: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [reducedMotion, initLayout])

  if (reducedMotion) return null

  const accessibleText = `${HERO_TEXTS.badges}. ${HERO_TEXTS.name}. ${HERO_TEXTS.tagline}. ${HERO_TEXTS.location}.`

  return (
    <div ref={containerRef} className="relative">
      {canvasEnabled && (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={accessibleText}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="block cursor-default"
        />
      )}
      <div className="sr-only" aria-hidden={canvasEnabled ? 'false' : undefined}>
        <span>{HERO_TEXTS.badges}</span>
        <span>{HERO_TEXTS.name}</span>
        <span>{HERO_TEXTS.tagline}</span>
        <span>{HERO_TEXTS.location}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/InteractiveHeroText.tsx
git commit -m "feat: add InteractiveHeroText canvas component"
```

---

### Task 6: Integrate into Introduction.tsx

**Files:**
- Modify: `src/components/Introduction.tsx`

- [ ] **Step 1: Modify Introduction.tsx to conditionally render InteractiveHeroText**

The canvas replaces the text content div (lines 40-93 of current file). The profile image section stays. When `reducedMotion` is true or canvas is not enabled, the original DOM text renders.

Replace the `<div className="space-y-6">` block (line 40) through its closing `</div>` (line 93) with:

```tsx
<div className="space-y-6">
  {!reducedMotion ? (
    <InteractiveHeroText />
  ) : (
    <>
      <div
        className="space-y-4 transition-[opacity,transform] duration-600 ease-out"
        style={{
          opacity: isVisible || reducedMotion ? 1 : 0,
          transform: isVisible || reducedMotion ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.2s',
        }}
      >
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="inline-block px-4 py-1.5 border border-border text-sm font-medium text-muted-foreground tracking-wide uppercase"
            >
              {role}
            </span>
          ))}
        </div>

        <h1>Wesley Coetzee</h1>

        <p className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-primary leading-[1.2] max-w-2xl">
          Building scalable solutions & leading engineering teams
        </p>
      </div>

      <div
        className="flex items-center gap-3 text-muted-foreground transition-[opacity,transform] duration-600 ease-out"
        style={{
          opacity: isVisible || reducedMotion ? 1 : 0,
          transform: isVisible || reducedMotion ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.4s',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span className="text-base font-medium text-foreground">Auckland, New Zealand</span>
      </div>
    </>
  )}
</div>
```

Add the import at the top of `Introduction.tsx`:

```tsx
import InteractiveHeroText from './InteractiveHeroText'
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify dev server runs**

```bash
bun dev
```

Open http://localhost:3000. Verify the hero section loads. The canvas should render the text. Move mouse through the text — words should repel. Click — characters should explode and spring back.

- [ ] **Step 4: Commit**

```bash
git add src/components/Introduction.tsx
git commit -m "feat: integrate InteractiveHeroText into hero section"
```

---

### Task 7: Visual tuning and edge cases

**Files:**
- Modify: `src/components/InteractiveHeroText.tsx`
- Modify: `src/components/interactive-hero-text/constants.ts`
- Modify: `src/components/interactive-hero-text/text-layout.ts`

- [ ] **Step 1: Test font loading edge case**

Open the site with DevTools network throttling set to "Slow 3G". Verify the canvas waits for fonts to load before rendering (text should not appear in a fallback font and then jump).

If fonts render incorrectly, verify `document.fonts.ready` is being awaited in the `useEffect` of `InteractiveHeroText.tsx`.

- [ ] **Step 2: Test theme switching**

Toggle between dark and light themes. All particle colors should update immediately. No stale colors.

- [ ] **Step 3: Test reduced motion**

In system settings or DevTools, enable `prefers-reduced-motion: reduce`. The canvas should disappear and normal DOM text should render.

- [ ] **Step 4: Test mobile viewport**

Resize browser below 768px. Font sizes should scale down. Below 400px, the canvas should disable entirely and DOM text should show.

- [ ] **Step 5: Test touch events**

Use DevTools device emulation. Touch-drag should repel words. Tap should trigger explosion.

- [ ] **Step 6: Tune physics constants if needed**

Adjust values in `constants.ts` based on how the effect feels:
- `REPEL_STRENGTH` — increase if words don't move enough, decrease if they fly too far
- `SPRING_K` — increase for snappier return, decrease for floatier feel
- `DAMPING` — closer to 1.0 = more sliding, closer to 0.5 = more abrupt stop
- `EXPLODE_MAX_VELOCITY` — increase for more dramatic explosion

- [ ] **Step 7: Commit tuning changes**

```bash
git add -A
git commit -m "fix: tune physics and handle edge cases"
```

---

### Task 8: Run all checks

**Files:** None (verification only)

- [ ] **Step 1: Run tests**

```bash
bun run test
```

Expected: all tests pass.

- [ ] **Step 2: Run linter**

```bash
bun run lint
```

Expected: no errors.

- [ ] **Step 3: Run type check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Run build**

```bash
bun run build
```

Expected: successful static export.
