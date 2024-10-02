<template>
  <router-view/>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import router, { setupRouter } from './router';

const isLargeScreen = ref(window.innerWidth > 768);

const handleResize = () => {
  isLargeScreen.value = window.innerWidth > 768;
  setupRouter(isLargeScreen.value);
};

onMounted(() => {
  setupRouter(isLargeScreen.value); // Configurer les routes au chargement initial
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Styles pour le composant principal */
</style>
