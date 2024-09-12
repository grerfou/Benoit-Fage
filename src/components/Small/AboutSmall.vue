<script setup>
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
</script>



<template>

  <FullScreenMenu />
  <div class="parentElement">
    <div>
      Creative Coder <br> &nbsp &nbsp &nbsp;  ~ Artist 
    </div>
  </div>

</template>



<script>
export default {
  name: 'LargeComponent'
};
</script>



<style scoped>
@import './../../assets/SmallComponent.css';
</style>

