import { describe, it, expect } from 'vitest'
import {
  type Particle,
  createParticle,
  applySpring,
  applyRepel,
  applyDamping,
  updatePosition,
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

describe('updatePosition', () => {
  it('adds velocity to position', () => {
    const p = createParticle('A', 10, 20, 'f', 'c')
    p.vx = 5
    p.vy = -3
    const result = updatePosition(p)
    expect(result.x).toBe(15)
    expect(result.y).toBe(17)
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
