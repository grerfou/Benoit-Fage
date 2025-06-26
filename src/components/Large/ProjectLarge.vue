<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Lenis from '@studio-freight/lenis';
import FullScreenMenu from './PageComponents/FullScreenMenu.vue';

const projectData = ref(null);
const scrollContainer = ref(null);
const route = useRoute();
const projectId = route.params.id;

let lenis;

async function fetchProjectData() {
  try {
    const response = await fetch('/projects.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    projectData.value = data.find(p => p.id === projectId) || {
      imageProject: '',
      titre: 'Project not found',
      Tools: 'N/A',
      Type: [],
      Date: 'N/A',
      State: 'N/A',
      image: [],
      text: 'Project not found'
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données JSON:', error);
    projectData.value = {
      imageProject: '',
      titre: 'Error',
      Tools: 'N/A',
      Type: 'N/A',
      Date: 'N/A',
      State: 'N/A',
      image: [],
      text: 'Error loading project data'
    };
  }
}

onMounted(async () => {
  await fetchProjectData();

  nextTick(() => {
    if (!(scrollContainer.value instanceof HTMLElement)) {
      console.warn('scrollContainer is not a valid HTMLElement');
      return;
    }

    lenis = new Lenis({
      wrapper: scrollContainer.value,
      content: scrollContainer.value,
      smooth: true,
      duration: 1.7,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
});

onBeforeUnmount(() => {
  lenis?.destroy();
});
</script>

<template>
  <FullScreenMenu />

  <div class="project-page">
    <div class="left-column" v-if="projectData">
      <div class="nav">
        <h3><router-link to="/work">«</router-link></h3>
      </div>

      <h3 class="titles">{{ projectData.titre }}</h3>

      <div class="info-block">
        <h4>Tools</h4>
        <p>{{ projectData.Tools || 'N/A' }}</p>

        <h4>Type</h4>
        <p>{{ Array.isArray(projectData.Type) ? projectData.Type.join(', ') : projectData.Type || 'N/A' }}</p>

        <h4>Date</h4>
        <p>{{ projectData.Date || 'N/A' }}</p>

        <h4>State</h4>
        <p>{{ projectData.State || 'N/A' }}</p>
      </div>

      <p class="ExplainText">{{ projectData.text || 'No description available' }}</p>
    </div>

    <div class="right-column" ref="scrollContainer" v-if="projectData">
      <div class="ImgData" v-for="(item, index) in projectData.image" :key="index">
        <img
          v-if="item.type === 'image'"
          :src="item.src"
          :id="item.id"
          :data-date="item.date"
          :data-description="item.description"
          :alt="item.description || 'Project image'" />

        <video
          v-else-if="item.type === 'video'"
          controls
          :id="item.id"
          :data-date="item.date"
          :data-description="item.description">
          <source :src="item.src" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 87vh;
  padding: 1vh;
  overflow: hidden;
  border: 1px solid black;
  font-weight: 900;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  padding-right: 1rem;
  min-width: 0; /* Permet au contenu de ne pas déborder */
}

.left-column p,
.ExplainText {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
}

.right-column {
  overflow-y: auto;
  will-change: transform;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
}

.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.titles {
  font-size: clamp(1rem, 6vw, 4rem);
  margin-bottom: 1rem;
  font-family: 'NeuePowerTrial-Regular';
  color: black;
}


.info-block h4 {
  font-family: 'TWKBurns-Light';
  margin: 0.5rem 0 0;
}

.info-block p {
  font-family: 'TWKBurns-Regular';
  font-size: small;
  margin: 0 0 1rem;
  font-weight: lighter;
}

.ExplainText {
  text-align: justify;
  font-family: 'TWKBurns-Regular';
  margin-top: 2rem;
  margin-bottom: 5rem;
}

.ImgData img,
.ImgData video {
  max-width: 100%;
  height: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

a {
  font-size: 2rem;
  text-decoration: none;
  color: black;
  font-family: 'NeuePowerTrial-Regular';
}
</style>

