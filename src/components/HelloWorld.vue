<template>
  <!-- Le conteneur qui va occuper tout l'espace disponible -->
  <div ref="threeContainer" class="three-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "ThreeScene",
  data() {
    return {
      renderer: null,
      camera: null,
    };
  },
  mounted() {
    this.initThree();
    // Ajouter l'écouteur d'événement pour redimensionner automatiquement la fenêtre
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeUnmount() {
    // Supprimer l'écouteur d'événement lorsque le composant est détruit
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    initThree() {
      // Sélectionner l'élément HTML où rendre la scène
      const container = this.$refs.threeContainer;

      // Créer une scène
      const scene = new THREE.Scene();

      // Créer une caméra
      this.camera = new THREE.PerspectiveCamera(
        75, // FOV (field of view)
        container.clientWidth / container.clientHeight, // Ratio
        0.1, // Plan de coupe proche
        1000 // Plan de coupe lointain
      );

      this.camera.position.z = 5; // Position de la caméra

      // Créer un renderer et l'ajouter au DOM
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio); // Pour une meilleure qualité sur les écrans haute densité
      container.appendChild(this.renderer.domElement);

      // Créer un cube et l'ajouter à la scène
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Fonction d'animation
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotation du cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Rendu de la scène à partir de la caméra
        this.renderer.render(scene, this.camera);
      };

      animate(); // Démarrer l'animation
    },
    onWindowResize() {
      const container = this.$refs.threeContainer;
      if (!container || !this.camera || !this.renderer) return;

      // Mettre à jour la taille de la caméra et du renderer
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
  },
};
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  position: sticky; /* Prend tout l'espace disponible */
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>

