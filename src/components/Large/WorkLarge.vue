<script setup>
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
import ProjectMenu from './PageComponents/ProjectMenu.vue';
</script>



<template>

  <FullScreenMenu />
  <div class="parentElement">
    <ProjectMenu/>
  </div>

</template>



<script>
export default {
  name: 'LargeComponent'
};
</script>



<style scoped>
@import './../../assets/LargeComponent.css';
</style>

