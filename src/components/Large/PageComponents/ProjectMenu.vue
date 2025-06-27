<template>
  <div class="portfolio-wrapper" @mousemove="updateMousePosition">
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

    <!-- En-têtes -->
    <div class="header-row">
      <span>Title</span>
      <span>Year</span>
      <span>Type</span>
      <span>Description</span>
    </div>

    <!-- Projets -->
    <div class="projects-container">
      <div
        v-for="(project, index) in filteredProjects"
        :key="index"
        class="project-row"
        @click="goToProject(index)"
        @mouseenter="setHovered(index, project.image)"
        @mouseleave="clearHovered"
        :class="{ faded: hoveredIndex !== null && hoveredIndex !== index }"
      >
        <span class="title">{{ project.title }}</span>
        <span class="year">{{ project.year }}</span>
        <span class="type">{{ project.type }}</span>
        <span class="description-wrapper">
          <span class="description-scroll">
            {{ project.description }}
          </span>
        </span>
      </div>
    </div>

    <!-- Image suiveuse -->
    <img
      v-if="hoveredImage"
      :src="hoveredImage"
      :style="{ top: mouseY + 'px', left: mouseX + 20 + 'px' }"
      class="preview-image"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeCategory = ref('All')
const hoveredIndex = ref(null)
const hoveredImage = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)

const categories = ['All', 'Art', 'Web', 'Writing', 'Software/Tools']

const projects = ref([
  {
    title: 'Polaris',
    year: '2025',
    type: 'Art',
    description: 'Un projet sur les matériaux vivants avec beaucoup de détails intéressants à lire en défilement.',
    category: 'Art',
    image: '/img/minitel.jpg',
  },
  {
    title: 'Through the digital manifestos',
    year: '2025',
    type: 'Research',
    description: "In this master's thesis...",
    category: 'Writing',
    image: '/img/ibm_ascii.webp',
  },
  {
    title: 'Room_Tour',
    year: '2023',
    type: 'Web',
    description: 'Scenographic site for The Wrong Bienal',
    category: 'Web',
    image: '/img/3.jpg',
  },
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects.value
  return projects.value.filter(p => p.category === activeCategory.value)
})

function goToProject(index) {
  router.push({ name: 'ProjectLarge', params: { id: index } })
}

function setHovered(index, imageUrl) {
  hoveredIndex.value = index
  hoveredImage.value = imageUrl
}

function clearHovered() {
  hoveredIndex.value = null
  hoveredImage.value = null
}

function updateMousePosition(e) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}
</script>

<style scoped>

@font-face {
  font-family: IBM-regular;
  src: url(/font/IBMPlexSans-Medium.woff);
}

@font-face {
  font-family: IBM-Bold;
  src: url(/font/IBMPlexSans-Bold.woff);
}


@font-face {
  font-family: IBM-light-i;
  src: url(/font/IBMPlexSans-LightItalic.woff);
}

@font-face {
  font-family: IBM-light;
  src: url(/font/IBMPlexSans-Light.woff);
}

@font-face {
  font-family: IBM-Medium;
  src: url(/font/IBMPlexSans-MediumItalic.woff);
}

.title{
  font-family: 'IBM-regular';
}

.year{
  font-family: 'IBM-light';
}

.type{
  font-family: 'IBM-light-i';
}

.portfolio-wrapper {
  width: 100%;
  padding: 1rem;
  position: relative;
  box-sizing: border-box;
  font-family: 'IBM';
}

.filters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filters button {
  background: none;
  border: 2px solid black;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'IBM-Bold';
  transition: background 0.6s, color 0.6s, border 0.6s, padding 0.7s;
}
.filters button:hover,
.filters button.active {
  background: black;
  padding-right: 5vw;
  color: white;
  border-color: rgb(192, 63, 19);;
}

.header-row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.7fr 2fr;
  padding: 1rem 0;
  font-weight: bold;
}

.projects-container {
  border-top: 1px solid black;
}

.project-row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.7fr 2fr;
  padding: 0.5rem 0;
  border-bottom: 1px dashed black;
  cursor: pointer;
  transition: background 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
}
.project-row:hover {
  background: rgba(192, 63, 19);
  color: white;
}

.project-row span,
.header-row span {
  font-weight: bold;
  font-size: 0.9rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

.description-wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  font-family: 'IBM-Medium';
}
.description-scroll {
  display: inline-block;
  white-space: nowrap;
  transform: translateX(0);
  transition: transform 0.3s;
}
.project-row:hover .description-scroll {
  animation: scroll-left 10s linear infinite;
}
@keyframes scroll-left {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}

.faded {
  opacity: 0.3;
  filter: blur(0.5px);
}

/* Image suiveuse */
.preview-image {
  position: fixed;
  width: 200px;
  height: auto;
  pointer-events: none;
  z-index: 1000;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .project-row,
  .header-row {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem 0;
  }

  .filters {
    justify-content: flex-start;
  }

  .preview-image {
    display: none;
  }
}
</style>

