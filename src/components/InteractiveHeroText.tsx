'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { sampleDotsFromText, explodeDots } from './interactive-hero-text/text-layout'
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
  const baseParticlesRef = useRef<Particle[]>([])
  const cursorRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)
  const initTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const getTheme = useCallback((): 'dark' | 'light' => {
    return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ?? 'dark'
  }, [])

  const doLayout = useCallback(() => {
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

    const { particles, totalHeight } = sampleDotsFromText(width, isMobile, theme)
    baseParticlesRef.current = particles.map((p) => ({ ...p }))
    particlesRef.current = particles

    canvas.width = width
    canvas.height = totalHeight
    canvas.style.width = `${width}px`
    canvas.style.height = `${totalHeight}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      renderFrame(ctx)
    }
  }, [getTheme])

  const initLayout = useCallback(() => {
    clearTimeout(initTimerRef.current)
    initTimerRef.current = setTimeout(doLayout, 50)
  }, [doLayout])

  const renderFrame = useCallback((ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current
    if (!canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const byColor = new Map<string, Particle[]>()
    for (const p of particlesRef.current) {
      const group = byColor.get(p.color)
      if (group) group.push(p)
      else byColor.set(p.color, [p])
    }

    byColor.forEach((dots, color) => {
      ctx.fillStyle = color
      ctx.beginPath()
      for (const p of dots) {
        ctx.moveTo(p.x + p.radius, p.y)
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      }
      ctx.fill()
    })
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
      particlesRef.current = explodeDots(
        particlesRef.current,
        clickX,
        clickY,
        EXPLODE_MIN_VELOCITY,
        EXPLODE_MAX_VELOCITY,
      )
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
      particlesRef.current = explodeDots(
        particlesRef.current,
        clickX,
        clickY,
        EXPLODE_MIN_VELOCITY,
        EXPLODE_MAX_VELOCITY,
      )
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
    <div ref={containerRef} className="relative w-full">
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
        className={`block cursor-default ${canvasEnabled ? '' : 'hidden'}`}
      />
      <div className="sr-only" aria-hidden={canvasEnabled ? 'false' : undefined}>
        <span>{HERO_TEXTS.badges}</span>
        <span>{HERO_TEXTS.name}</span>
        <span>{HERO_TEXTS.tagline}</span>
        <span>{HERO_TEXTS.location}</span>
      </div>
    </div>
  )
}
