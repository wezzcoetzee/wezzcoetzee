import { prepare, layout } from '@chenglou/pretext'
import { createDotParticle, type Particle } from './particles'
import {
  FONT_CONFIGS,
  MOBILE_FONT_CONFIGS,
  HERO_TEXTS,
  LINE_HEIGHTS,
  BLOCK_GAPS,
  DOT_SPACING,
  DOT_MIN_RADIUS,
  DOT_MAX_RADIUS,
  DOT_JITTER,
} from './constants'
import type { FontConfigKey } from './constants'

export type DotSampleResult = {
  particles: Particle[]
  totalHeight: number
}

export function sampleDotsFromText(
  canvasWidth: number,
  isMobile: boolean,
  theme: 'dark' | 'light',
): DotSampleResult {
  const configs = isMobile ? MOBILE_FONT_CONFIGS : FONT_CONFIGS
  const allParticles: Particle[] = []
  let yOffset = 0

  const offscreen = document.createElement('canvas')
  const offCtx = offscreen.getContext('2d')
  if (!offCtx) return { particles: [], totalHeight: 0 }

  for (const config of configs) {
    const key = config.key as FontConfigKey
    const text = HERO_TEXTS[key]
    const colorField = theme === 'dark' ? 'darkColor' : 'lightColor'
    const color = config[colorField]
    const lineHeight = LINE_HEIGHTS[key]
    const gap = BLOCK_GAPS[key]

    yOffset += gap

    const prepared = prepare(text, config.font)
    const { height, lineCount } = layout(prepared, canvasWidth, lineHeight)

    const blockHeight = lineCount * lineHeight
    offscreen.width = canvasWidth
    offscreen.height = blockHeight

    offCtx.clearRect(0, 0, canvasWidth, blockHeight)
    offCtx.font = config.font
    offCtx.fillStyle = '#ffffff'
    offCtx.textBaseline = 'top'

    const words = text.split(/(\s+)/)
    let lineX = 0
    let lineY = 0
    for (const word of words) {
      if (word.trim().length === 0) {
        lineX += offCtx.measureText(word).width
        continue
      }
      const wordWidth = offCtx.measureText(word).width
      if (lineX + wordWidth > canvasWidth && lineX > 0) {
        lineX = 0
        lineY += lineHeight
      }
      offCtx.fillText(word, lineX, lineY)
      lineX += wordWidth
    }

    const imageData = offCtx.getImageData(0, 0, canvasWidth, blockHeight)
    const pixels = imageData.data

    for (let y = 0; y < blockHeight; y += DOT_SPACING) {
      for (let x = 0; x < canvasWidth; x += DOT_SPACING) {
        const i = (y * canvasWidth + x) * 4
        const alpha = pixels[i + 3]
        if (alpha > 128) {
          const jx = x + (Math.random() - 0.5) * DOT_JITTER * 2
          const jy = y + (Math.random() - 0.5) * DOT_JITTER * 2
          const radius = DOT_MIN_RADIUS + Math.random() * (DOT_MAX_RADIUS - DOT_MIN_RADIUS)
          allParticles.push(createDotParticle(jx, yOffset + jy, radius, color))
        }
      }
    }

    yOffset += blockHeight
  }

  return { particles: allParticles, totalHeight: yOffset }
}

export function explodeDots(
  particles: Particle[],
  clickX: number,
  clickY: number,
  minVel: number,
  maxVel: number,
): Particle[] {
  return particles.map((p) => {
    const dx = p.targetX - clickX
    const dy = p.targetY - clickY
    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5
    const speed = minVel + Math.random() * (maxVel - minVel)
    return {
      ...p,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    }
  })
}
