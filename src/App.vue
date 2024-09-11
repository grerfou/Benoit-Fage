


<script setup>
// Import des composants
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LargeComponent from './components/LargeComponent.vue';
import SmallComponent from './components/SmallComponent.vue';

// Définir la variable réactive pour la largeur de l'écran
const isLargeScreen = ref(window.innerWidth > 768);
// Fonction pour gérer le redimensionnement de la fenêtre
const handleResize = () => {
  isLargeScreen.value = window.innerWidth > 768;
};
// Ajouter un écouteur d'événements pour le redimensionnement lors du montage du composant
onMounted(() => {
  window.addEventListener('resize', handleResize);
});
// Retirer l'écouteur d'événements lors de la destruction du composant
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});


</script>

<template>
  <LargeComponent v-if="isLargeScreen" />
  <SmallComponent v-else />
</template>


<style scoped>

</style>
