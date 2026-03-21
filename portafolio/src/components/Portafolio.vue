<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import profileImg from '../assets/profile.png'
import { completedProjects, skillGroups } from '../data/portfolioData'
import { startHeroBackground, type HeroBackgroundController } from '../helpers/heroBackground'

const bgCanvas = ref<HTMLCanvasElement | null>(null)
const isEasterEggMode = ref(false)

let heroBackgroundController: HeroBackgroundController | null = null

const toggleEasterEggMode = (): void => {
  isEasterEggMode.value = !isEasterEggMode.value
  heroBackgroundController?.setGameMode(isEasterEggMode.value)
}

onMounted(() => {
  const canvas = bgCanvas.value
  if (!canvas) return

  heroBackgroundController = startHeroBackground(canvas)
})

onBeforeUnmount(() => {
  heroBackgroundController?.destroy()
  heroBackgroundController = null
})
</script>

<template>
  <section class="portfolio-shell" :class="{ 'easter-egg-mode': isEasterEggMode }">
    <canvas ref="bgCanvas" class="background-canvas" aria-hidden="true"></canvas>
    <div class="background-overlay" :class="{ 'easter-egg-overlay': isEasterEggMode }" aria-hidden="true"></div>

    <button
      v-if="isEasterEggMode"
      type="button"
      class="game-toggle game-toggle-floating active"
      aria-pressed="true"
      aria-label="Disable game mode"
      @click="toggleEasterEggMode"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.4 6.4h9.2a3.3 3.3 0 0 1 3.2 2.55l1.1 4.69a2.25 2.25 0 0 1-2.19 2.76h-.87a2.74 2.74 0 0 1-2.46-1.56l-.53-1.06H9.12l-.53 1.06a2.74 2.74 0 0 1-2.46 1.56h-.87a2.25 2.25 0 0 1-2.2-2.76l1.12-4.69A3.3 3.3 0 0 1 7.4 6.4Zm.62 2a1.32 1.32 0 0 0-1.27 1.03l-1.12 4.69a.25.25 0 0 0 .25.3h.87a.73.73 0 0 0 .65-.4l1.08-2.15H16.5l1.08 2.15a.73.73 0 0 0 .65.4h.87a.25.25 0 0 0 .24-.3l-1.11-4.69a1.32 1.32 0 0 0-1.27-1.03Zm1.1 1.72h1.64v1.66H9.12v1.62H7.47v-1.62H5.83v-1.66h1.64V8.5h1.65Zm7.1.31a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08Zm2.34 1.45a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08Z"
        />
      </svg>
      <span>Exit Game Mode</span>
    </button>

    <main v-if="!isEasterEggMode" class="content">
      <header class="hero reveal-1">
        <button
          type="button"
          class="game-toggle"
          :class="{ active: isEasterEggMode }"
          :aria-pressed="isEasterEggMode"
          :aria-label="isEasterEggMode ? 'Disable game mode' : 'Enable game mode'"
          @click="toggleEasterEggMode"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7.4 6.4h9.2a3.3 3.3 0 0 1 3.2 2.55l1.1 4.69a2.25 2.25 0 0 1-2.19 2.76h-.87a2.74 2.74 0 0 1-2.46-1.56l-.53-1.06H9.12l-.53 1.06a2.74 2.74 0 0 1-2.46 1.56h-.87a2.25 2.25 0 0 1-2.2-2.76l1.12-4.69A3.3 3.3 0 0 1 7.4 6.4Zm.62 2a1.32 1.32 0 0 0-1.27 1.03l-1.12 4.69a.25.25 0 0 0 .25.3h.87a.73.73 0 0 0 .65-.4l1.08-2.15H16.5l1.08 2.15a.73.73 0 0 0 .65.4h.87a.25.25 0 0 0 .24-.3l-1.11-4.69a1.32 1.32 0 0 0-1.27-1.03Zm1.1 1.72h1.64v1.66H9.12v1.62H7.47v-1.62H5.83v-1.66h1.64V8.5h1.65Zm7.1.31a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08Zm2.34 1.45a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08Z"
            />
          </svg>
          <span>{{ isEasterEggMode ? 'Game Mode On' : 'Game Mode' }}</span>
        </button>

        <div class="hero-copy">
          <p class="tag">Software Engineer</p>
          <h1>Hello! Welcome to my profile, I'm Jonathan Porras Sandi</h1>
          <p class="subtitle">
            I am a Software Engineer graduated from Instituto Tecnologico de Costa Rica (TEC). I am deeply passionate
            about computer science, and every line of code is an opportunity to learn, innovate and create.
          </p>
          <p class="subtitle">
            I build robust and creative solutions by combining logical thinking with imagination, especially in web
            development where I design and deliver functional, attractive and efficient products.
          </p>
          <div class="cta-row">
            <a href="#projects">View projects</a>
            <a href="#skills">View stack</a>
            <a href="mailto:jonathanporrassandi@gmail.com" target="_blank">Contact me</a>
          </div>
        </div>

        <div class="hero-side">
          <figure class="hero-photo-wrap">
            <img :src="profileImg" alt="Jonathan Porras Sandi profile photo" class="hero-photo" />
          </figure>
          <div class="social-links hero-social-links">
            <a
              class="social-link"
              href="https://github.com/jonathanps21"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.52v-1.82c-2.93.64-3.55-1.25-3.55-1.25-.48-1.2-1.16-1.52-1.16-1.52-.95-.64.07-.63.07-.63 1.05.08 1.6 1.08 1.6 1.08.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.66-1.41-2.34-.27-4.8-1.17-4.8-5.2 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.37.1-2.85 0 0 .88-.28 2.9 1.08a10.13 10.13 0 0 1 5.28 0c2.02-1.36 2.9-1.08 2.9-1.08.57 1.48.21 2.58.1 2.85.67.74 1.08 1.67 1.08 2.82 0 4.04-2.46 4.93-4.81 5.19.38.33.72.98.72 1.98v2.94c0 .29.19.63.73.52A10.5 10.5 0 0 0 12 1.5Z"
                />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              class="social-link"
              href="https://www.linkedin.com/in/jonathan-porras-sandi-8a4b8531b"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.94 8.53a1.86 1.86 0 1 1 0-3.72 1.86 1.86 0 0 1 0 3.72ZM8.5 10H5.38v9.4H8.5V10Zm4.98 0h-2.99v9.4h3.11v-4.66c0-2.6 3.38-2.81 3.38 0v4.66H20V13.6c0-4.5-5.08-4.33-6.52-2.12V10Z"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
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
          <h2>Completed Projects</h2>
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
            <p class="project-tech-title">Technologies Used</p>
            <div class="project-tech">
              <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="skills" class="skills-section">
        <header class="section-head reveal-2">
          <h2>Tech Stack</h2>
        </header>

        <div class="skills-grid">
          <article
            v-for="(group, index) in skillGroups"
            :key="group.title"
            class="skill-card"
            :class="`reveal-${(index % 4) + 1}`"
          >
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
        </div>
      </section>

      <footer id="contact" class="contact reveal-4">
        <h2>Let&apos;s build something great</h2>
        <p>Ready to continue learning and developing high-quality software</p>
      </footer>
    </main>
  </section>
</template>


<style scoped src="./Portafolio.css"></style>
