type Vec3 = { x: number; y: number; z: number }
type Projected = { x: number; y: number; scale: number }
type Star = { x: number; y: number; size: number; alpha: number; phase: number }
type Shape = {
  position: Vec3
  velocity: Vec3
  rotation: Vec3
  spin: Vec3
  vertices: Vec3[]
  edges: Array<[number, number]>
}

type PointerState = {
  x: number
  y: number
  active: boolean
  down: boolean
  draggingIndex: number | null
}

type BackgroundMode = 'default' | 'game'

export type HeroBackgroundController = {
  setGameMode: (enabled: boolean) => void
  destroy: () => void
}

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value))
const random = (min: number, max: number): number => Math.random() * (max - min) + min

const rotatePoint = (point: Vec3, rotation: Vec3): Vec3 => {
  let { x, y, z } = point

  const cosX = Math.cos(rotation.x)
  const sinX = Math.sin(rotation.x)
  const y1 = y * cosX - z * sinX
  const z1 = y * sinX + z * cosX
  y = y1
  z = z1

  const cosY = Math.cos(rotation.y)
  const sinY = Math.sin(rotation.y)
  const x2 = x * cosY + z * sinY
  const z2 = -x * sinY + z * cosY
  x = x2
  z = z2

  const cosZ = Math.cos(rotation.z)
  const sinZ = Math.sin(rotation.z)
  const x3 = x * cosZ - y * sinZ
  const y3 = x * sinZ + y * cosZ

  return { x: x3, y: y3, z }
}

const createVertices = (radius: number, amount: number): Vec3[] => {
  const vertices: Vec3[] = []

  for (let i = 0; i < amount; i += 1) {
    const theta = random(0, Math.PI * 2)
    const u = random(-1, 1)
    const phi = Math.acos(u)
    const jitter = random(0.72, 1.2)

    vertices.push({
      x: radius * jitter * Math.sin(phi) * Math.cos(theta),
      y: radius * jitter * Math.sin(phi) * Math.sin(theta),
      z: radius * jitter * Math.cos(phi)
    })
  }

  return vertices
}

const createEdges = (vertices: Vec3[]): Array<[number, number]> => {
  const edges: Array<[number, number]> = []
  const edgeSet = new Set<string>()

  for (let i = 0; i < vertices.length; i += 1) {
    const neighbors = vertices
      .map((target, index) => {
        const dx = target.x - vertices[i].x
        const dy = target.y - vertices[i].y
        const dz = target.z - vertices[i].z
        return { index, distance: Math.hypot(dx, dy, dz) }
      })
      .filter((entry) => entry.index !== i)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)

    for (const neighbor of neighbors) {
      const a = Math.min(i, neighbor.index)
      const b = Math.max(i, neighbor.index)
      const key = `${a}-${b}`

      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        edges.push([a, b])
      }
    }
  }

  return edges
}

export const startHeroBackground = (canvas: HTMLCanvasElement): HeroBackgroundController => {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return {
      setGameMode: () => undefined,
      destroy: () => undefined
    }
  }

  let mode: BackgroundMode = 'default'
  let animationId = 0
  let width = 0
  let height = 0
  let dpr = 1
  let lastTime = performance.now()
  let world = { x: 260, y: 170, z: 320 }
  let perspective = 390

  let stars: Star[] = []
  let shapes: Shape[] = []

  const pointer: PointerState = {
    x: 0,
    y: 0,
    active: false,
    down: false,
    draggingIndex: null
  }

  const project = (point: Vec3): Projected | null => {
    const z = point.z + perspective
    if (z < 8) return null

    const scale = perspective / z
    return {
      x: point.x * scale + width / 2,
      y: point.y * scale + height / 2,
      scale
    }
  }

  const screenToWorld = (screenX: number, screenY: number, z: number): Vec3 => {
    const depth = z + perspective
    const scale = perspective / depth
    return {
      x: (screenX - width / 2) / scale,
      y: (screenY - height / 2) / scale,
      z
    }
  }

  const makeShape = (): Shape => {
    const radius = random(20, mode === 'game' ? 58 : 52)
    const vertices = createVertices(radius, Math.round(random(6, 10)))

    return {
      position: {
        x: random(-world.x, world.x),
        y: random(-world.y, world.y),
        z: random(-world.z, world.z)
      },
      velocity: {
        x: random(-4.2, 4.2),
        y: random(-2.8, 2.8),
        z: random(-3.2, 3.2)
      },
      rotation: {
        x: random(0, Math.PI * 2),
        y: random(0, Math.PI * 2),
        z: random(0, Math.PI * 2)
      },
      spin: {
        x: random(-0.28, 0.28),
        y: random(-0.34, 0.34),
        z: random(-0.22, 0.22)
      },
      vertices,
      edges: createEdges(vertices)
    }
  }

  const createScene = (): void => {
    const area = width * height
    const shapeCount = clamp(Math.floor(area / 34000), 24, 78)
    const starCount = clamp(Math.floor(area / 3800), 170, 620)

    shapes = Array.from({ length: shapeCount }, () => makeShape())
    stars = Array.from({ length: starCount }, () => ({
      x: random(-width * 0.08, width * 1.08),
      y: random(-height * 0.08, height * 1.08),
      size: random(0.55, 2.3),
      alpha: random(0.22, 0.95),
      phase: random(0, Math.PI * 2)
    }))
  }

  const resizeCanvas = (): void => {
    width = window.innerWidth
    height = window.innerHeight
    dpr = Math.max(1, window.devicePixelRatio || 1)

    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    world = {
      x: Math.max(260, width * 0.52),
      y: Math.max(170, height * 0.46),
      z: clamp(Math.max(width * 0.24, height * 0.22), 260, 430)
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    createScene()
  }

  const drawScenarioGrid = (): void => {
    const horizonY = height * 0.62
    const vanishingX = width / 2

    ctx.save()
    ctx.globalAlpha = 0.45
    ctx.strokeStyle = 'rgba(91, 189, 255, 0.36)'
    ctx.lineWidth = 1

    for (let i = -7; i <= 7; i += 1) {
      const startX = vanishingX + i * (width * 0.09)
      ctx.beginPath()
      ctx.moveTo(startX, height + 24)
      ctx.lineTo(vanishingX, horizonY)
      ctx.stroke()
    }

    for (let i = 0; i < 11; i += 1) {
      const t = i / 10
      const y = horizonY + (height - horizonY) * t * t
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    const horizonGlow = ctx.createLinearGradient(0, horizonY - 12, 0, horizonY + 30)
    horizonGlow.addColorStop(0, 'rgba(116, 208, 255, 0)')
    horizonGlow.addColorStop(0.5, 'rgba(116, 208, 255, 0.4)')
    horizonGlow.addColorStop(1, 'rgba(116, 208, 255, 0)')
    ctx.fillStyle = horizonGlow
    ctx.fillRect(0, horizonY - 12, width, 42)

    ctx.restore()
  }

  const drawBackground = (time: number): void => {
    const gradient = ctx.createLinearGradient(0, 0, width, height)

    if (mode === 'game') {
      gradient.addColorStop(0, '#020f30')
      gradient.addColorStop(0.48, '#031946')
      gradient.addColorStop(1, '#020714')
    } else {
      gradient.addColorStop(0, '#020716')
      gradient.addColorStop(0.42, '#03153a')
      gradient.addColorStop(1, '#01040f')
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    const primaryPulse = 0.45 + Math.sin(time * 0.00018) * 0.12
    const secondaryPulse = 0.38 + Math.cos(time * 0.00014 + 1.2) * 0.1

    const haloA = ctx.createRadialGradient(
      width * 0.08,
      height * 0.1,
      10,
      width * 0.08,
      height * 0.1,
      width * 0.82
    )
    haloA.addColorStop(0, `rgba(59, 126, 255, ${mode === 'game' ? 0.28 : 0.2})`)
    haloA.addColorStop(1, 'rgba(2, 8, 25, 0)')
    ctx.fillStyle = haloA
    ctx.fillRect(0, 0, width, height)

    const haloB = ctx.createRadialGradient(
      width * 0.86,
      height * 0.08,
      12,
      width * 0.86,
      height * 0.08,
      width * 0.74
    )
    haloB.addColorStop(0, `rgba(122, 80, 255, ${mode === 'game' ? 0.21 : 0.14})`)
    haloB.addColorStop(1, 'rgba(3, 8, 28, 0)')
    ctx.fillStyle = haloB
    ctx.fillRect(0, 0, width, height)

    const mist = ctx.createRadialGradient(width * 0.5, height * 0.55, 40, width * 0.5, height * 0.55, width * 0.6)
    mist.addColorStop(0, `rgba(36, 76, 166, ${primaryPulse * 0.26})`)
    mist.addColorStop(1, 'rgba(2, 8, 24, 0)')
    ctx.fillStyle = mist
    ctx.fillRect(0, 0, width, height)

    const sideMist = ctx.createRadialGradient(width * 0.24, height * 0.78, 20, width * 0.24, height * 0.78, width * 0.5)
    sideMist.addColorStop(0, `rgba(38, 88, 188, ${secondaryPulse * 0.22})`)
    sideMist.addColorStop(1, 'rgba(2, 8, 24, 0)')
    ctx.fillStyle = sideMist
    ctx.fillRect(0, 0, width, height)

    if (mode === 'game') {
      drawScenarioGrid()
    }
  }

  const findNearestShapeIndex = (screenX: number, screenY: number): number | null => {
    let closestIndex: number | null = null
    let closestDistance = Number.POSITIVE_INFINITY

    for (let i = 0; i < shapes.length; i += 1) {
      const projected = project(shapes[i].position)
      if (!projected) continue

      const distance = Math.hypot(screenX - projected.x, screenY - projected.y)
      if (distance < 84 && distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    }

    return closestIndex
  }

  const applyPointerForces = (dt: number): void => {
    if (!pointer.active || mode !== 'game') return

    if (pointer.down && pointer.draggingIndex !== null) {
      const draggedShape = shapes[pointer.draggingIndex]
      if (!draggedShape) return

      const target = screenToWorld(pointer.x, pointer.y, draggedShape.position.z)
      draggedShape.position.x += (target.x - draggedShape.position.x) * 0.22
      draggedShape.position.y += (target.y - draggedShape.position.y) * 0.22
      draggedShape.velocity.x *= 0.72
      draggedShape.velocity.y *= 0.72
      return
    }

    for (const shape of shapes) {
      const projected = project(shape.position)
      if (!projected) continue

      const dx = pointer.x - projected.x
      const dy = pointer.y - projected.y
      const distance = Math.hypot(dx, dy)
      if (distance < 6 || distance > 240) continue

      const strength = (1 - distance / 240) * 28 * dt
      const depthFactor = (shape.position.z + perspective) / perspective
      shape.velocity.x += (dx / distance) * strength * depthFactor
      shape.velocity.y += (dy / distance) * strength * depthFactor
    }
  }

  const animate = (time: number): void => {
    const dt = Math.min(0.04, (time - lastTime) / 1000 || 0.016)
    lastTime = time

    drawBackground(time)

    for (const star of stars) {
      const pulse = 0.5 + Math.sin(time * 0.00042 + star.phase) * 0.5
      const alphaBoost = mode === 'game' ? 1.15 : 1
      ctx.fillStyle = `rgba(171, 211, 255, ${star.alpha * (0.24 + pulse * 0.6) * alphaBoost})`
      ctx.fillRect(star.x, star.y, star.size, star.size)
    }

    applyPointerForces(dt)

    for (const shape of shapes) {
      shape.position.x += shape.velocity.x * dt
      shape.position.y += shape.velocity.y * dt
      shape.position.z += shape.velocity.z * dt

      if (Math.abs(shape.position.x) > world.x) {
        shape.position.x = Math.sign(shape.position.x) * world.x
        shape.velocity.x *= -0.92
      }
      if (Math.abs(shape.position.y) > world.y) {
        shape.position.y = Math.sign(shape.position.y) * world.y
        shape.velocity.y *= -0.92
      }
      if (Math.abs(shape.position.z) > world.z) {
        shape.position.z = Math.sign(shape.position.z) * world.z
        shape.velocity.z *= -0.92
      }

      shape.velocity.x *= 0.995
      shape.velocity.y *= 0.995
      shape.velocity.z *= 0.997

      shape.rotation.x += shape.spin.x * dt
      shape.rotation.y += shape.spin.y * dt
      shape.rotation.z += shape.spin.z * dt
    }

    const centers: Array<{ x: number; y: number; z: number; projected: Projected | null }> = []

    for (const shape of shapes) {
      const transformed = shape.vertices.map((vertex) => {
        const rotated = rotatePoint(vertex, shape.rotation)
        return {
          x: rotated.x + shape.position.x,
          y: rotated.y + shape.position.y,
          z: rotated.z + shape.position.z
        }
      })

      const projectedVertices = transformed.map((vertex) => project(vertex))

      for (const [a, b] of shape.edges) {
        const from = projectedVertices[a]
        const to = projectedVertices[b]
        if (!from || !to) continue

        const alpha = Math.max(0.2, Math.min(0.82, (from.scale + to.scale) * 0.4))
        ctx.strokeStyle =
          mode === 'game' ? `rgba(94, 214, 255, ${alpha})` : `rgba(226, 161, 71, ${alpha * 0.92})`
        ctx.lineWidth = mode === 'game' ? 1.22 : 1.35
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      }

      const centerProjected = project(shape.position)
      centers.push({ x: shape.position.x, y: shape.position.y, z: shape.position.z, projected: centerProjected })

      if (centerProjected) {
        ctx.fillStyle =
          mode === 'game'
            ? 'rgba(142, 226, 255, 0.24)'
            : 'rgba(241, 186, 96, 0.2)'
        ctx.beginPath()
        ctx.arc(centerProjected.x, centerProjected.y, Math.max(1.5, centerProjected.scale * 2.6), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < centers.length; i += 1) {
      for (let j = i + 1; j < centers.length; j += 1) {
        const a = centers[i]
        const b = centers[j]
        if (!a.projected || !b.projected) continue

        const distance = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
        if (distance > 120) continue

        const alpha = (1 - distance / 120) * (mode === 'game' ? 0.3 : 0.23)
        ctx.strokeStyle =
          mode === 'game' ? `rgba(90, 210, 255, ${alpha})` : `rgba(214, 154, 64, ${alpha})`
        ctx.lineWidth = 0.9
        ctx.beginPath()
        ctx.moveTo(a.projected.x, a.projected.y)
        ctx.lineTo(b.projected.x, b.projected.y)
        ctx.stroke()
      }
    }

    animationId = window.requestAnimationFrame(animate)
  }

  const updatePointerPosition = (clientX: number, clientY: number): void => {
    pointer.x = clientX
    pointer.y = clientY
    pointer.active = true
  }

  const handlePointerMove = (event: PointerEvent): void => {
    updatePointerPosition(event.clientX, event.clientY)
  }

  const handlePointerDown = (event: PointerEvent): void => {
    updatePointerPosition(event.clientX, event.clientY)
    pointer.down = true

    if (mode === 'game') {
      pointer.draggingIndex = findNearestShapeIndex(event.clientX, event.clientY)
      if (pointer.draggingIndex !== null) {
        canvas.style.cursor = 'grabbing'
      }
    }
  }

  const clearPointerDrag = (): void => {
    pointer.down = false
    pointer.draggingIndex = null
    canvas.style.cursor = mode === 'game' ? 'grab' : 'default'
  }

  const handlePointerUp = (): void => {
    clearPointerDrag()
  }

  const handlePointerLeave = (): void => {
    pointer.active = false
    clearPointerDrag()
  }

  const setGameMode = (enabled: boolean): void => {
    mode = enabled ? 'game' : 'default'
    perspective = enabled ? 430 : 390
    if (!enabled) {
      pointer.down = false
      pointer.draggingIndex = null
    }
    canvas.style.cursor = enabled ? 'grab' : 'default'
  }

  resizeCanvas()
  animationId = window.requestAnimationFrame(animate)

  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointercancel', handlePointerUp)
  window.addEventListener('blur', handlePointerLeave)

  return {
    setGameMode,
    destroy: () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }
}
