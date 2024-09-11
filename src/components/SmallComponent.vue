<script setup>
import TroiD from './Small/TroiD.vue'
import ImageSrc from './ImageScr.vue'
import LateMe from './Small/LateMe.vue' 


</script>



<template>

  <TroiD :modelDisplayTime="3000" />

  <div class="FlexContainer">
    <div class="flex-item">BF</div>
    <div class="flex-item">benoit fage</div>
    <div class="flex-item">menu</div>
  </div>

  <div class="parentElement">
  </div>


</template>



<script>
export default {
  name: 'LargeComponent'
};
</script>



<style scoped>
@import './../assets/SmallComponent.css';
</style>

