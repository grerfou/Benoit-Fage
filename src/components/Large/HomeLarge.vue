<script setup>
import TroiD from './PageComponents/TroiD.vue'
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
</script>



<template>
  <FullScreenMenu />
  <TroiD :modelDisplayTime="3000" />  
  <div class="parentElement">
    <div class="size ">
      Creative Coder <br> &nbsp &nbsp &nbsp;  ~ Artist 
    </div>
    <div class="item item6 croix"></div>
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
