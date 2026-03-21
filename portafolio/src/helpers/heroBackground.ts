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

const world = { x: 150, y: 105, z: 210 }
const perspective = 360

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

const makeShape = (): Shape => {
  const radius = random(22, 52)
  const vertices = createVertices(radius, Math.round(random(6, 10)))

  return {
    position: {
      x: random(-world.x, world.x),
      y: random(-world.y, world.y),
      z: random(-world.z, world.z)
    },
    velocity: {
      x: random(-3.2, 3.2),
      y: random(-2.1, 2.1),
      z: random(-2.7, 2.7)
    },
    rotation: {
      x: random(0, Math.PI * 2),
      y: random(0, Math.PI * 2),
      z: random(0, Math.PI * 2)
    },
    spin: {
      x: random(-0.22, 0.22),
      y: random(-0.28, 0.28),
      z: random(-0.18, 0.18)
    },
    vertices,
    edges: createEdges(vertices)
  }
}

export const startHeroBackground = (canvas: HTMLCanvasElement): (() => void) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  let animationId = 0
  let width = 0
  let height = 0
  let dpr = 1
  let lastTime = performance.now()

  let stars: Star[] = []
  let shapes: Shape[] = []

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

  const createScene = (): void => {
    const density = Math.floor((width * height) / 54000)
    const shapeCount = Math.max(16, Math.min(34, density))
    const starCount = Math.max(70, Math.min(210, Math.floor((width * height) / 9000)))

    shapes = Array.from({ length: shapeCount }, () => makeShape())
    stars = Array.from({ length: starCount }, () => ({
      x: random(0, width),
      y: random(0, height),
      size: random(0.6, 1.8),
      alpha: random(0.22, 0.9),
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

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    createScene()
  }

  const drawBackground = (): void => {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#020716')
    gradient.addColorStop(0.45, '#030d2a')
    gradient.addColorStop(1, '#01040f')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    const halo = ctx.createRadialGradient(width * 0.2, height * 0.1, 20, width * 0.2, height * 0.1, width * 0.7)
    halo.addColorStop(0, 'rgba(34, 65, 132, 0.16)')
    halo.addColorStop(1, 'rgba(2, 7, 20, 0)')
    ctx.fillStyle = halo
    ctx.fillRect(0, 0, width, height)
  }

  const animate = (time: number): void => {
    const dt = Math.min(0.04, (time - lastTime) / 1000 || 0.016)
    lastTime = time

    drawBackground()

    for (const star of stars) {
      const pulse = 0.5 + Math.sin(time * 0.0004 + star.phase) * 0.5
      ctx.fillStyle = `rgba(160, 193, 255, ${star.alpha * (0.28 + pulse * 0.6)})`
      ctx.fillRect(star.x, star.y, star.size, star.size)
    }

    for (const shape of shapes) {
      shape.position.x += shape.velocity.x * dt
      shape.position.y += shape.velocity.y * dt
      shape.position.z += shape.velocity.z * dt

      if (Math.abs(shape.position.x) > world.x) shape.velocity.x *= -1
      if (Math.abs(shape.position.y) > world.y) shape.velocity.y *= -1
      if (Math.abs(shape.position.z) > world.z) shape.velocity.z *= -1

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

      const projected = transformed.map((vertex) => project(vertex))

      ctx.strokeStyle = 'rgba(214, 149, 58, 0.56)'
      ctx.lineWidth = 1.35

      for (const [a, b] of shape.edges) {
        const from = projected[a]
        const to = projected[b]

        if (!from || !to) continue

        const alpha = Math.max(0.2, Math.min(0.72, (from.scale + to.scale) * 0.38))
        ctx.strokeStyle = `rgba(216, 154, 58, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      }

      const centerProjected = project(shape.position)
      centers.push({ x: shape.position.x, y: shape.position.y, z: shape.position.z, projected: centerProjected })

      if (centerProjected) {
        ctx.fillStyle = 'rgba(236, 175, 76, 0.18)'
        ctx.beginPath()
        ctx.arc(centerProjected.x, centerProjected.y, Math.max(1.4, centerProjected.scale * 2.4), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < centers.length; i += 1) {
      for (let j = i + 1; j < centers.length; j += 1) {
        const a = centers[i]
        const b = centers[j]
        if (!a.projected || !b.projected) continue

        const distance = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
        if (distance > 110) continue

        const alpha = (1 - distance / 110) * 0.22
        ctx.strokeStyle = `rgba(214, 154, 64, ${alpha})`
        ctx.lineWidth = 0.9
        ctx.beginPath()
        ctx.moveTo(a.projected.x, a.projected.y)
        ctx.lineTo(b.projected.x, b.projected.y)
        ctx.stroke()
      }
    }

    animationId = window.requestAnimationFrame(animate)
  }

  resizeCanvas()
  animationId = window.requestAnimationFrame(animate)
  window.addEventListener('resize', resizeCanvas)

  return () => {
    window.cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resizeCanvas)
  }
}
