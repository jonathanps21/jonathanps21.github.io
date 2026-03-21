<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import profileImg from '../assets/profile.png'
import { completedProjects, skillGroups } from '../data/portfolioData'
import { startHeroBackground } from '../helpers/heroBackground'

const bgCanvas = ref<HTMLCanvasElement | null>(null)

let stopHeroBackground: (() => void) | null = null

onMounted(() => {
  const canvas = bgCanvas.value
  if (!canvas) return

  stopHeroBackground = startHeroBackground(canvas)
})

onBeforeUnmount(() => {
  stopHeroBackground?.()
  stopHeroBackground = null
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
