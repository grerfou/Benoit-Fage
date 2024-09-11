<script setup>
import TroiD from './Small/TroiD.vue'
import ImageSrc from './ImageScr.vue'

</script>



<template>

<header>
    <div class="Column"> About </div>
    <div class="Column"> Project </div>
</header>

<div class="parentElement">

  <div class="child1">
      <TroiD modelUrl="./public/model/ant.glb" :scale="{ x: 2, y: 2, z: 2 }" :rotation="{ x: Math.PI / 4, y: Math.PI / 4, z: 0 }" :rotationSpeed="{ x: 0, y: 0.2, z: 0 }" />
  </div>
  <div class="child2">
    <ImageSrc/>
  </div>
  <div class="child4">
    <div>
      <a href=""><h3>Book's_Particles</h3></a>
      <a href=""><h3>Turing_Glasses</h3></a>
      <a href=""><h3>Self_molding</h3></a>
      <a href=""><h3>Ambient_Exp</h3></a>
      <a href=""><h3>Ant_footprint</h3></a>
      <a href=""><h3>Whether_Organism</h3></a>
      <a href=""><h3>Room_tour</h3></a>
    </div>
  </div>

</div>

</template>



<script>
export default {
  name: 'LargeComponent'
};
</script>



<style scoped>
@import './../assets/main.css';
@import './../assets/SmallComponent.css';
</style>

