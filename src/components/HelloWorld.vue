<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeScene",
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // 1. Sélectionner l'élément HTML où rendre la scène
      const container = this.$refs.threeContainer;

      // 2. Créer une scène
      const scene = new THREE.Scene();

      // 3. Ajouter une caméra
      const camera = new THREE.PerspectiveCamera(
        75, // FOV (field of view)
        container.clientWidth / container.clientHeight, // Ratio
        0.1, // Plan de coupe proche
        1000 // Plan de coupe lointain
      );

      camera.position.z = 5; // Position de la caméra

      // 4. Créer un renderer et l'ajouter au DOM
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // 5. Créer un cube et l'ajouter à la scène
      const geometry = new THREE.BoxGeometry(); // Géométrie du cube
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Matériau du cube
      const cube = new THREE.Mesh(geometry, material); // Création du maillage (mesh)
      scene.add(cube); // Ajouter le cube à la scène

      // 6. Fonction d'animation
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotation du cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Rendu de la scène à partir de la caméra
        renderer.render(scene, camera);
      };

      animate(); // Démarrer l'animation
    },
  },
};
</script>

<style scoped>
.three-container {
  width: 10%;
  height: 10vh;
}
</style>

