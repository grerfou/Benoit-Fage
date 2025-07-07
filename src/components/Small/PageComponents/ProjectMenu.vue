<template>
  <div class="portfolio-wrapper">
    <!-- Dropdown filtre -->
    <div class="filters" ref="dropdownRef">
      <button
        class="dropdown-btn"
        @click.stop="toggleDropdown"
        type="button"
        aria-haspopup="listbox"
        :aria-expanded="dropdownOpen"
      >
        {{ activeCategory === 'All' ? 'All Projects' : activeCategory }}
        <span class="arrow" :class="{ open: dropdownOpen }">▾</span>
      </button>

      <ul v-if="dropdownOpen" class="dropdown-menu" role="listbox" tabindex="-1">
        <li
          v-for="cat in categories"
          :key="cat"
          role="option"
          :aria-selected="activeCategory === cat"
          :class="{ active: activeCategory === cat }"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </li>
      </ul>
    </div>

    <!-- En-têtes -->
    <div class="header-row">
      <span>Title</span>
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
          <div class="title">{{ project.title }}</div>
          <div class="meta">
            <span class="type">{{ project.type }}</span>
            <span class="year">{{ project.year }}</span>
          </div>
        </div>
        <div class="image-wrapper">
          <img :src="project.image" :alt="project.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeCategory = ref('All')
const dropdownOpen = ref(false)
const categories = ['All', 'Art', 'Web', 'Writing', 'Software']

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
  router.push({ name: 'ProjectSmall', params: { id: index } })
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function selectCategory(cat) {
  activeCategory.value = cat
  dropdownOpen.value = false
}

const dropdownRef = ref(null)
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.portfolio-wrapper {
  width: 100%;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  font-family: 'IBM', sans-serif;
}

/* Filtres - Dropdown */
.filters {
  margin-bottom: 2rem;
  width: max-content;
  position: relative;
  user-select: none;
}

.dropdown-btn {
  background: none;
  border: 2px solid black;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  font-family: 'IBM', sans-serif;
  transition: background 0.6s, color 0.6s, border 0.6s, padding 0.7s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 130px;
}

.dropdown-btn:hover,
.dropdown-btn:focus {
  background: black;
  color: white;
  border-color: rgb(192, 63, 19);
  outline: none;
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 0.7rem;
  line-height: 1;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  background: white;
  border: 1px solid black;
  border-radius: 21px;
  list-style: none;
  padding: 0.0rem 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 100;
  min-width: 130px;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  font-family: 'IBM', sans-serif;
  transition: background 0.3s, color 0.3s;
  user-select: none;
}

.dropdown-menu li:hover,
.dropdown-menu li.active {
  background: black;
  color: white;
  border-radius: 20px;
}

/* En-têtes */
.header-row {
  display: grid;
  grid-template-columns: 1fr 100px;
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
  align-items: flex-start; /* aligner texte en haut */
  padding: 0.5rem 0;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  gap: 1rem;
}

.text-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* aligner contenu à gauche */
}

.text-info .title {
  font-weight: normal;
  font-size: 1.1rem;
  overflow-wrap: break-word;
  word-break: break-word;
  margin-bottom: 0.25rem;
}

.text-info .meta {
  font-size: 0.85rem;
  color: #555;
  display: flex;
  flex-direction: column; /* colonne pour type au-dessus de year */
  gap: 0.1rem;
}

.text-info .meta .year,
.text-info .meta .type {
  font-style: italic;
}

/* Image */
.image-wrapper {
  flex: 0 0 100px;
  display: flex;
  justify-content: flex-end;
}

.image-wrapper img {
  width: 150px;
  height: auto;
  object-fit: cover;
}
</style>

