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
  name: 'SmallComponent'
};
</script>



<style scoped>
@import './../../assets/SmallComponent.css';
</style>

