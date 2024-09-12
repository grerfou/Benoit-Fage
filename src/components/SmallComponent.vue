<script setup>
import TroiD from './Small/TroiD.vue'
import FullScreenMe from './Small/FullScreenMe.vue'


</script>



<template>

  <TroiD :modelDisplayTime="3000" />
  <FullScreenMe />
  <div class="parentElement">
  </div>



<!--


// Import des fichiers GLTF comme assets
import model1Url from '/public/model/Boid.glb';
import model2Url from '/public/model/room.glb';
import model3Url from '/public/model/try.glb';

// Liste des URLs des modèles et de leurs configurations (position et rotation)
const models = [
  { url: model1Url, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } },
  { url: model2Url, position: { x: 2, y: 0, z: -30 }, rotation: { x: 0, y: 5, z: 0 } },
  { url: model3Url, position: { x: 0, y: 1, z: 0 }, rotation: { x: 2, y: 1, z: 0 } }
];



Work 
About 
Contact 


-->




</template>



<script>
export default {
  name: 'LargeComponent'
};
</script>



<style scoped>
@import './../assets/SmallComponent.css';
</style>

