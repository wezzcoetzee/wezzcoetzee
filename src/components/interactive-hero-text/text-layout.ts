import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'
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

type LayoutCursor = { segmentIndex: number; graphemeIndex: number }

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
  const graphemes = [
    ...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text),
  ].map((s) => s.segment)
  const charWidth = totalWidth / graphemes.length
  return graphemes.map(() => charWidth)
}

export function splitWordIntoCharPositions(
  word: WordPosition,
): { text: string; x: number; y: number }[] {
  const graphemes = [
    ...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(word.text),
  ].map((s) => s.segment)
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
        (prepared as unknown as { widths: number[] }).widths,
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
