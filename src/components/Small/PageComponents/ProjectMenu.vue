<template>
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

    <!-- En-têtes -->
    <div class="header-row">
      <span>Title</span>
      <span>Year</span>
      <span>Type</span>
      <span>Description</span>
      <span>Image</span>
    </div>

    <!-- Projets -->
    <div class="projects-container">
      <div
        v-for="(project, index) in filteredProjects"
        :key="index"
        class="project-row"
        @click="goToProject(index)"
      >
        <div class="text-info">
          <span class="title">{{ project.title }}</span>
          <span class="year">{{ project.year }}</span>
          <span class="type">{{ project.type }}</span>
          <span class="description-wrapper">
            <span class="description-scroll">
              {{ project.description }}
            </span>
          </span>
        </div>
        <div class="image-wrapper">
          <img :src="project.image" :alt="project.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeCategory = ref('All')

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
  // Navigue vers le projet en fonction de l'index
  router.push({ name: 'ProjectSmall', params: { id: index } })
}
</script>

<style scoped>
.portfolio-wrapper {
  width: 100%;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  font-family: 'IBM', sans-serif;
}

/* Filtres */
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
  font-weight: bold;
  transition: background 0.6s, color 0.6s, border 0.6s, padding 0.7s;
}

.filters button:hover,
.filters button.active {
  background: black;
  color: white;
  border-color: rgb(192, 63, 19);
}

/* En-têtes */
.header-row {
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.7fr 2fr 100px;
  padding: 0.5rem 0;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

/* Projets */
.projects-container {
  border-top: 1px solid #ccc;
}

.project-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  gap: 1rem;
}

.text-info {
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.7fr 2fr;
  gap: 0.5rem;
}

.text-info span {
  font-weight: normal;
  font-size: 0.9rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

.description-wrapper {
  overflow: hidden;
  position: relative;
  font-family: 'IBM-Medium', sans-serif;
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

/* Image */
.image-wrapper {
  flex: 0 0 100px;
  display: flex;
  justify-content: flex-end;
}

.image-wrapper img {
  width: 100px;
  height: auto;
  object-fit: cover;
}
</style>

