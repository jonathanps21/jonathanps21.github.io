<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import profileImg from '../assets/profile.png'

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

type Badge = {
  name: string
  src: string
}

type SkillGroup = {
  title: string
  badges: Badge[]
}

type Project = {
  name: string
  summary: string
  details: string[]
  tech: string[]
}

const completedProjects: Project[] = [
  {
    name: 'Dual Web',
    summary: 'Aplicacion web destinada al consumo del servicio para clientes de la empresa Dual.',
    details: [
      'Construida para operaciones y consulta de servicios en linea.',
      'Frontend desarrollado con Next.js y backend API REST en CakePHP.'
    ],
    tech: ['Next.js', 'CakePHP', 'API REST']
  },
  {
    name: 'Dual App',
    summary: 'Aplicacion movil disenada para consumo rapido de servicios de la empresa Dual.',
    details: [
      'Desarrollada con React Native + Expo.',
      'Incluye soporte de notificaciones push y compatibilidad con iOS y Android.'
    ],
    tech: ['React Native', 'Expo', 'Push Notifications', 'iOS', 'Android']
  },
  {
    name: 'CRM',
    summary: 'Aplicacion web interna para la gestion de la relacion con clientes en Dual.',
    details: [
      'Implementada en CakePHP con socket en Node.js para eventos en tiempo real.',
      'Integracion con WhatsApp Business API para atencion y seguimiento.'
    ],
    tech: ['CakePHP', 'Node.js Socket', 'WhatsApp Business API']
  }
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    badges: [
      {
        name: 'Python',
        src: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white'
      },
      {
        name: 'Java',
        src: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white'
      },
      {
        name: 'C',
        src: 'https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black'
      },
      {
        name: 'C++',
        src: 'https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white'
      },
      {
        name: 'JavaScript',
        src: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'
      },
      {
        name: 'TypeScript',
        src: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white'
      },
      {
        name: 'PHP',
        src: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white'
      }
    ]
  },
  {
    title: 'Databases',
    badges: [
      {
        name: 'MongoDB',
        src: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white'
      },
      {
        name: 'MySQL',
        src: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white'
      },
      {
        name: 'MariaDB',
        src: 'https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white'
      },
      {
        name: 'Redis',
        src: 'https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white'
      },
      {
        name: 'Oracle',
        src: 'https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white'
      },
      {
        name: 'ArangoDB',
        src: 'https://img.shields.io/badge/ArangoDB-DDE072?style=for-the-badge&logo=arangodb&logoColor=black'
      }
    ]
  },
  {
    title: 'Front-End Tools',
    badges: [
      {
        name: 'CSS3',
        src: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'
      },
      {
        name: 'Tailwind CSS',
        src: 'https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white'
      },
      {
        name: 'Bootstrap',
        src: 'https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white'
      },
      {
        name: 'Figma',
        src: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white'
      }
    ]
  },
  {
    title: 'Back-End Tools',
    badges: [
      {
        name: 'Node.js',
        src: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'
      },
      {
        name: 'Express.js',
        src: 'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'
      },
      {
        name: 'Supabase',
        src: 'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white'
      },
      {
        name: 'npm',
        src: 'https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white'
      },
      {
        name: 'Postman',
        src: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white'
      },
      {
        name: 'JWT',
        src: 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white'
      }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    badges: [
      {
        name: 'React Native',
        src: 'https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black'
      },
      {
        name: 'Expo',
        src: 'https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white'
      },
      {
        name: 'React',
        src: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'
      },
      {
        name: 'Next.js',
        src: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white'
      },
      {
        name: 'Angular',
        src: 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white'
      },
      {
        name: 'CakePHP',
        src: 'https://img.shields.io/badge/CakePHP-D33C43?style=for-the-badge&logo=cakephp&logoColor=white'
      }
    ]
  },
  {
    title: 'Other Tools',
    badges: [
      {
        name: 'Jira',
        src: 'https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white'
      },
      {
        name: 'Slack',
        src: 'https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white'
      },
      {
        name: 'DBeaver',
        src: 'https://img.shields.io/badge/DBeaver-372923?style=for-the-badge&logo=dbeaver&logoColor=white'
      },
      {
        name: 'Android Studio',
        src: 'https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white'
      },
      {
        name: 'Visual Studio Code',
        src: 'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white'
      },
      {
        name: 'NetBeans',
        src: 'https://img.shields.io/badge/NetBeans-1B6AC6?style=for-the-badge&logo=apache-netbeans-ide&logoColor=white'
      },
      {
        name: 'Discord',
        src: 'https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white'
      },
      {
        name: 'phpMyAdmin',
        src: 'https://img.shields.io/badge/phpMyAdmin-6C78AF?style=for-the-badge&logo=phpmyadmin&logoColor=white'
      },
      {
        name: 'Notion',
        src: 'https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white'
      },
      {
        name: 'Trello',
        src: 'https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white'
      },
      {
        name: 'GitHub Desktop',
        src: 'https://img.shields.io/badge/GitHub_Desktop-30363D?style=for-the-badge&logo=github&logoColor=white'
      },
      {
        name: 'Git',
        src: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white'
      }
    ]
  }
]

const bgCanvas = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let animationId = 0
let width = 0
let height = 0
let dpr = 1
let lastTime = 0

let stars: Star[] = []
let shapes: Shape[] = []

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
  const canvas = bgCanvas.value
  if (!canvas || !ctx) return

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
  if (!ctx) return

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
  if (!ctx) return

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

onMounted(() => {
  const canvas = bgCanvas.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  resizeCanvas()
  lastTime = performance.now()
  animationId = window.requestAnimationFrame(animate)
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <section class="portfolio-shell">
    <canvas ref="bgCanvas" class="background-canvas" aria-hidden="true"></canvas>
    <div class="background-overlay" aria-hidden="true"></div>

    <main class="content">
      <header class="hero reveal-1">
        <div class="hero-copy">
          <p class="tag">Software Engineer</p>
          <h1>Hello! Welcome to my profile, I am Jonathan Porras Sandi</h1>
          <p class="subtitle">
            I am a Software Engineer graduated from Instituto Tecnologico de Costa Rica (TEC). I am deeply passionate
            about computer science, and every line of code is an opportunity to learn, innovate and create.
          </p>
          <p class="subtitle">
            I build robust and creative solutions by combining logical thinking with imagination, especially in web
            development where I design and deliver functional, attractive and efficient products.
          </p>
          <div class="cta-row">
            <a href="#skills">View tech stack</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <figure class="hero-photo-wrap">
          <img :src="profileImg" alt="Jonathan Porras Sandi profile photo" class="hero-photo" />
        </figure>
      </header>

      <section class="summary-grid">
        <article class="card reveal-2">
          <h2>Professional Profile</h2>
          <p>
            Every project is a new challenge. My goal is to keep growing as a developer, collaborate with other tech
            enthusiasts, and ship software with high quality standards.
          </p>
        </article>

        <article class="card reveal-3">
          <h2>Current Focus</h2>
          <ul>
            <li>Scalable and maintainable web architectures</li>
            <li>API development and backend performance</li>
            <li>UI/UX quality with practical engineering execution</li>
          </ul>
        </article>
      </section>

      <section id="projects" class="projects-section">
        <header class="section-head reveal-2">
          <p class="section-tag">Portfolio</p>
          <h2>Proyectos Realizados</h2>
        </header>

        <div class="projects-grid">
          <article
            v-for="(project, index) in completedProjects"
            :key="project.name"
            class="project-card"
            :class="`reveal-${(index % 4) + 1}`"
          >
            <h3>{{ project.name }}</h3>
            <p>{{ project.summary }}</p>
            <ul>
              <li v-for="detail in project.details" :key="detail">{{ detail }}</li>
            </ul>
            <div class="project-tech">
              <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="skills" class="skills-grid">
        <article v-for="(group, index) in skillGroups" :key="group.title" class="skill-card" :class="`reveal-${(index % 4) + 1}`">
          <h2>{{ group.title }}</h2>
          <div class="badges">
            <img
              v-for="badge in group.badges"
              :key="badge.name"
              :src="badge.src"
              :alt="badge.name"
              loading="lazy"
              decoding="async"
            />
          </div>
        </article>
      </section>

      <footer id="contact" class="contact reveal-4">
        <h2>Let&apos;s build something great</h2>
        <p>Open to collaboration and software engineering opportunities.</p>
      </footer>
    </main>
  </section>
</template>

<style scoped>
:root {
  color-scheme: dark;
}

.portfolio-shell {
  --bg-main: #020716;
  --surface: rgba(5, 12, 30, 0.64);
  --surface-strong: rgba(7, 17, 39, 0.78);
  --text-main: #eef4ff;
  --text-muted: #a8b8d9;

  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle at 25% 8%, #0a1d4a 0%, var(--bg-main) 44%, #01040e 100%);
}

.background-canvas,
.background-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

.background-canvas {
  z-index: 0;
}

.background-overlay {
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 15% 10%, rgba(56, 104, 188, 0.14) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(25, 63, 130, 0.13) 0%, transparent 48%),
    linear-gradient(180deg, rgba(1, 4, 12, 0.28), rgba(1, 4, 12, 0.75));
}

.content {
  position: relative;
  z-index: 2;
  width: min(1180px, calc(100% - 3rem));
  margin: 0 auto;
  padding: 3.4rem 0 3.5rem;
  color: var(--text-main);
  font-family: 'Space Grotesk', 'Sora', 'Segoe UI', sans-serif;
}

.hero {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  gap: 1.6rem;
  align-items: center;
  padding: 2rem;
  border: 1px solid rgba(108, 143, 210, 0.25);
  background: linear-gradient(135deg, rgba(7, 18, 44, 0.86), rgba(4, 12, 28, 0.62));
  backdrop-filter: blur(4px);
}

.tag {
  margin: 0;
  color: #f2be6d;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.hero h1 {
  margin: 0.6rem 0 0.8rem;
  font-family: 'Outfit', 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4.6vw, 3.7rem);
  line-height: 1.07;
}

.subtitle {
  margin: 0.7rem 0 0;
  color: var(--text-muted);
  max-width: 68ch;
  font-size: clamp(1rem, 1.6vw, 1.16rem);
  line-height: 1.55;
}

.cta-row {
  display: flex;
  gap: 0.9rem;
  margin-top: 1.5rem;
}

.cta-row a {
  color: var(--text-main);
  text-decoration: none;
  border: 1px solid rgba(229, 177, 91, 0.45);
  padding: 0.68rem 1rem;
  font-size: 0.95rem;
  transition: transform 220ms ease, border-color 220ms ease, background-color 220ms ease;
}

.cta-row a:hover {
  transform: translateY(-2px);
  border-color: #e7b35e;
  background: rgba(231, 179, 94, 0.12);
}

.hero-photo-wrap {
  margin: 0;
  justify-self: center;
}

.hero-photo {
  width: 220px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid rgba(238, 186, 102, 0.46);
  box-shadow: 0 22px 44px rgba(1, 4, 11, 0.52);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.card,
.project-card,
.skill-card,
.contact {
  border: 1px solid rgba(107, 145, 216, 0.25);
  background: var(--surface);
  backdrop-filter: blur(4px);
  padding: 1.2rem;
}

.card h2,
.project-card h3,
.skill-card h2,
.contact h2 {
  margin: 0;
  font-family: 'Outfit', 'Space Grotesk', sans-serif;
}

.card p,
.card li,
.project-card p,
.project-card li,
.contact p {
  color: var(--text-muted);
  line-height: 1.6;
}

.card ul {
  padding-left: 1.2rem;
  margin: 0.8rem 0 0;
}

.projects-section {
  margin-top: 1rem;
}

.section-head {
  padding: 1rem 1.1rem;
  border: 1px solid rgba(107, 145, 216, 0.25);
  background: rgba(5, 12, 30, 0.56);
}

.section-tag {
  margin: 0;
  color: #f2be6d;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.section-head h2 {
  margin: 0.4rem 0 0;
  font-family: 'Outfit', 'Space Grotesk', sans-serif;
  font-size: clamp(1.4rem, 2.2vw, 1.9rem);
}

.projects-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.project-card {
  background: var(--surface-strong);
}

.project-card h3 {
  font-size: 1.35rem;
}

.project-card p {
  margin: 0.8rem 0 0;
}

.project-card ul {
  margin: 0.8rem 0 0;
  padding-left: 1.1rem;
}

.project-tech {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tech span {
  padding: 0.35rem 0.6rem;
  font-size: 0.76rem;
  letter-spacing: 0.02em;
  color: #e6eeff;
  border: 1px solid rgba(229, 177, 91, 0.45);
  background: rgba(229, 177, 91, 0.1);
}

.skills-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.skill-card {
  background: var(--surface-strong);
}

.skill-card h2 {
  margin-bottom: 0.9rem;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.badges img {
  max-width: 100%;
  height: auto;
}

.contact {
  margin-top: 1rem;
}

.reveal-1,
.reveal-2,
.reveal-3,
.reveal-4 {
  opacity: 0;
  transform: translateY(16px);
  animation: rise 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
}

.reveal-2 {
  animation-delay: 140ms;
}

.reveal-3 {
  animation-delay: 280ms;
}

.reveal-4 {
  animation-delay: 420ms;
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .content {
    width: min(1180px, calc(100% - 1.8rem));
    padding-top: 2.2rem;
  }

  .hero {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .hero-photo {
    width: min(210px, 56vw);
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .cta-row {
    flex-wrap: wrap;
  }

  .hero {
    padding: 1.3rem;
  }
}
</style>
