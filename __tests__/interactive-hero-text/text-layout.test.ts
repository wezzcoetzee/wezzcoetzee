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
