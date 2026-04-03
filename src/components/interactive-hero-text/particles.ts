export type Particle = {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  radius: number
  color: string
  delay: number
}

export function createDotParticle(
  x: number,
  y: number,
  radius: number,
  color: string,
): Particle {
  return { x, y, targetX: x, targetY: y, vx: 0, vy: 0, radius, color, delay: 0 }
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
