<template>
  <LoadingScreen v-if="isLoading" />
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LoadingScreen from './components/Large/LoadingScreen.vue'
import router, { setupRouter } from './router'

const isLargeScreen = ref(window.innerWidth > 768)
const isLoading = ref(true)

const handleResize = () => {
  isLargeScreen.value = window.innerWidth > 768
  setupRouter(isLargeScreen.value)
}

onMounted(() => {
  setupRouter(isLargeScreen.value)
  window.addEventListener('resize', handleResize)

  // Simuler un chargement (par exemple attendre que le routeur soit prêt, ou autre)
  setTimeout(() => {
    isLoading.value = false
  }, 1500) // ajuster la durée ou remplacer par vrai chargement
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Ton style ici */
</style>

