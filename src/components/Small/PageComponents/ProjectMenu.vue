<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <div class="scroll-content">
      <div class="portfolio-wrapper">
        <!-- Filtres -->
        <div class="filters">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="{ active: activeCategory === cat }"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Projets -->
        <div class="projects-container">
          <div
            v-for="(project, index) in filteredProjects"
            :key="index"
            class="project-row"
            @click="goToProject(index)"
          >
            <div class="text-content">
              <span class="title">{{ project.title }}</span>
              <span class="year">{{ project.year }}</span>
              <span class="type">{{ project.type }}</span>
            </div>
            <div class="preview-image-wrapper">
              <img :src="project.image" alt="project image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'  // Import GSAP

const scrollWrapper = ref(null)
const router = useRouter()

const activeCategory = ref('All')
const categories = ['All', 'Art', 'Web', 'Writing', 'Software/Tools']

const projects = ref([
  {
    title: 'Polaris',
    year: '2025',
    type: 'Art',
    category: 'Art',
    image: '/img/minitel.jpg',
  },
  {
    title: 'Through the digital manifestos',
    year: '2025',
    type: 'Research',
    category: 'Writing',
    image: '/img/ibm_ascii.webp',
  },
  {
    title: 'Room_Tour',
    year: '2023',
    type: 'Web',
    category: 'Web',
    image: '/img/3.jpg',
  },
])

const filteredProjects = computed(() => {
  return activeCategory.value === 'All'
    ? projects.value
    : projects.value.filter(p => p.category === activeCategory.value)
})

function goToProject(index) {
  router.push({ name: 'ProjectSmall', params: { id: index } })
}

onMounted(() => {
  // Initialisation du scroll Lenis
  const lenis = new Lenis({
    wrapper: scrollWrapper.value,
    content: scrollWrapper.value.querySelector('.scroll-content'),
    smooth: true,
    smoothTouch: true,
    gestureOrientation: 'vertical',
    lerp: 0.5,
  })

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Animation GSAP : les projets arrivent doucement du bas
  gsap.from('.project-row', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
    delay: 0.3,
  })
})
</script>

<style scoped>
body {
  overflow: hidden;
}

img{
  z-index: -1;
}

.scroll-wrapper {
  z-index: 1;
  height: 100vh;
  overflow: scroll;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.scroll-content {
  height: auto;
  will-change: transform;
}

.portfolio-wrapper {
  padding: 1rem;
  box-sizing: border-box;
  font-family: 'IBM';
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.filters button {
  background: none;
  border: 2px solid black;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'IBM-Bold';
  transition: all 0.3s ease;
}
.filters button.active,
.filters button:hover {
  background: black;
  color: white;
  border-color: rgb(192, 63, 19);
}

.projects-container {
  z-index: -1;
  border-top: 1px solid black;
}

.project-row {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: nowrap; /* évite retour à la ligne */
  cursor: pointer;
  padding: 1rem 0;
  border-bottom: 1px dashed black;
}

.text-content {
  flex: 1 1 auto; /* peut grandir et rétrécir */
  min-width: 0; /* permet de rétrécir correctement */
  display: flex;
  flex-direction: column;
}

.preview-image-wrapper {
  flex: 0 0 150px; /* largeur fixe */
  height: 100px;
  overflow: hidden;
}

.preview-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  font-family: 'IBM-regular';
}
.year {
  font-family: 'IBM-light';
}
.type {
  font-family: 'IBM-light-i';
}

/* Responsive */
@media screen and (max-width: 768px) {
  .project-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .preview-image-wrapper {
    width: 100%;
    height: auto;
  }
  .preview-image-wrapper img {
    height: auto;
  }
}
</style>

