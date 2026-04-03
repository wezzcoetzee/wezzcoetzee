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

export const DOT_SPACING = 2
export const DOT_MIN_RADIUS = 0.4
export const DOT_MAX_RADIUS = 1
export const DOT_JITTER = 0.5
