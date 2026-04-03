import { describe, it, expect } from 'vitest'
import {
  createDotParticle,
  applySpring,
  applyRepel,
  applyDamping,
  updatePosition,
  isSettled,
  totalKineticEnergy,
} from '@/components/interactive-hero-text/particles'

describe('createDotParticle', () => {
  it('creates a dot at target position with zero velocity', () => {
    const p = createDotParticle(100, 200, 2, '#f5f5f5')
    expect(p.x).toBe(100)
    expect(p.y).toBe(200)
    expect(p.targetX).toBe(100)
    expect(p.targetY).toBe(200)
    expect(p.vx).toBe(0)
    expect(p.vy).toBe(0)
    expect(p.radius).toBe(2)
    expect(p.color).toBe('#f5f5f5')
  })
})

describe('applySpring', () => {
  it('accelerates particle toward target', () => {
    const p = createDotParticle(0, 0, 1, 'c')
    p.x = 100
    p.y = 50
    const result = applySpring(p, 0.08)
    expect(result.vx).toBeCloseTo(-8)
    expect(result.vy).toBeCloseTo(-4)
  })

  it('does nothing when particle is at target', () => {
    const p = createDotParticle(50, 50, 1, 'c')
    const result = applySpring(p, 0.08)
    expect(result.vx).toBe(0)
    expect(result.vy).toBe(0)
  })
})

describe('applyRepel', () => {
  it('pushes particle away from cursor within radius', () => {
    const p = createDotParticle(100, 100, 1, 'c')
    const result = applyRepel(p, 150, 100, 120, 800)
    expect(result.vx).toBeLessThan(0)
    expect(result.vy).toBe(0)
  })

  it('does nothing when cursor is outside radius', () => {
    const p = createDotParticle(100, 100, 1, 'c')
    const result = applyRepel(p, 500, 500, 120, 800)
    expect(result.vx).toBe(0)
    expect(result.vy).toBe(0)
  })
})

describe('applyDamping', () => {
  it('reduces velocity by damping factor', () => {
    const p = createDotParticle(0, 0, 1, 'c')
    p.vx = 10
    p.vy = -5
    const result = applyDamping(p, 0.85)
    expect(result.vx).toBeCloseTo(8.5)
    expect(result.vy).toBeCloseTo(-4.25)
  })
})

describe('updatePosition', () => {
  it('adds velocity to position', () => {
    const p = createDotParticle(10, 20, 1, 'c')
    p.vx = 5
    p.vy = -3
    const result = updatePosition(p)
    expect(result.x).toBe(15)
    expect(result.y).toBe(17)
  })
})

describe('isSettled', () => {
  it('returns true when velocity is below threshold', () => {
    const p = createDotParticle(50, 50, 1, 'c')
    p.vx = 0.1
    p.vy = 0.1
    expect(isSettled(p, 0.5)).toBe(true)
  })

  it('returns false when velocity exceeds threshold', () => {
    const p = createDotParticle(50, 50, 1, 'c')
    p.vx = 3
    p.vy = 4
    expect(isSettled(p, 0.5)).toBe(false)
  })
})

describe('totalKineticEnergy', () => {
  it('sums squared velocities of all particles', () => {
    const particles = [
      { ...createDotParticle(0, 0, 1, 'c'), vx: 3, vy: 4 },
      { ...createDotParticle(0, 0, 1, 'c'), vx: 1, vy: 0 },
    ]
    expect(totalKineticEnergy(particles)).toBeCloseTo(26)
  })
})
