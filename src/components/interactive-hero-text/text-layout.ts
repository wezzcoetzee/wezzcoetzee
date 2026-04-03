import { prepare, layout } from '@chenglou/pretext'
import { createDotParticle, type Particle } from './particles'
import {
  FONT_CONFIGS,
  MOBILE_FONT_CONFIGS,
  HERO_TEXTS,
  LINE_HEIGHTS,
  BLOCK_GAPS,
  DOT_SPACING,
  DOT_RADIUS,
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
  const scale = 4

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
    const { lineCount } = layout(prepared, canvasWidth, lineHeight)

    const blockHeight = lineCount * lineHeight
    const sw = canvasWidth * scale
    const sh = blockHeight * scale
    offscreen.width = sw
    offscreen.height = sh

    offCtx.clearRect(0, 0, sw, sh)
    offCtx.scale(scale, scale)
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
    offCtx.setTransform(1, 0, 0, 1, 0, 0)

    const imageData = offCtx.getImageData(0, 0, sw, sh)
    const pixels = imageData.data

    for (let y = 0; y < sh; y += DOT_SPACING) {
      for (let x = 0; x < sw; x += DOT_SPACING) {
        const i = (y * sw + x) * 4
        const alpha = pixels[i + 3]
        if (alpha > 128) {
          const cx = x / scale
          const cy = y / scale
          allParticles.push(createDotParticle(cx, yOffset + cy, DOT_RADIUS, color))
        }
      }
    }

    yOffset += blockHeight
  }

  return { particles: allParticles, totalHeight: yOffset }
}

const PULSE_SPEED = 3

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
    const dist = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5
    const speed = minVel + Math.random() * (maxVel - minVel)
    return {
      ...p,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      delay: Math.round(dist / PULSE_SPEED),
    }
  })
}
