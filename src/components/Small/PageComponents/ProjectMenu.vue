<template>
  <!-- Menu de navigation -->
  <ul class="menu">
    <li @click="focusPoint(0)" @touchstart="focusPoint(0)">Self_molding</li>
    <li @click="focusPoint(1)" @touchstart="focusPoint(1)">Turing_Glasses</li>
    <li @click="focusPoint(2)" @touchstart="focusPoint(2)">Ambient_Exp</li>
    <li @click="focusPoint(3)" @touchstart="focusPoint(3)">Ant_footprint</li>
    <li @click="focusPoint(4)" @touchstart="focusPoint(4)">Whether_Organism</li>
    <li @click="focusPoint(5)" @touchstart="focusPoint(5)">Room_tour</li>
    <li @click="focusPoint(6)" @touchstart="focusPoint(6)">Book's_Particles</li>
  </ul>

  <!-- Conteneur pour l'affichage des points 3D -->
  <div ref="sphereContainer" class="sphere-container"></div>

  <!-- Conteneurs pour les images -->
  <div v-if="selectedImageIndex !== null" class="image-overlay">
    <img :src="images[selectedImageIndex]" alt="" class="image" />
  </div>

  <div v-if="isFocused" class="close-button" @click="resetFocus" @touchstart="resetFocus">«¬</div>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sphereContainer = ref(null);
const scene = shallowRef(null);
const camera = shallowRef(null);
const renderer = shallowRef(null);
const raycaster = new THREE.Raycaster(); // Pour la détection de clic
const mouse = new THREE.Vector2(); // Coordonnées de la souris
const points = []; // Pour stocker les points de la scène
const isFocused = ref(false); // Indique si la caméra est focalisée sur un point
const selectedImageIndex = ref(null); // Indice de l'image actuellement sélectionnée
const selectedPoint = ref(null); // Point actuellement sélectionné

// Liste des images associées aux titres
const images = [
  '/img/1.png',
  '/img/2.jpg',
  '/img/3.jpeg',
  '/img/4.png',
  '/img/5.png',
  '/img/6.jpg',
  '/img/7.png',
];

// Liste des positions des points
const positions = [
  new THREE.Vector3(1, 2, 1),
  new THREE.Vector3(-1, 0, 1),
  new THREE.Vector3(1, -0, -1),
  new THREE.Vector3(-1, 2, -1),
  new THREE.Vector3(2, 1, 0),
  new THREE.Vector3(0, 3, 0),
  new THREE.Vector3(0, 1, 2)
];

const initialCameraPosition = new THREE.Vector3(7, 4, 3); // Position initiale de la caméra

function initThree() {
  scene.value = new THREE.Scene();

  // Initialisation de la caméra
  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.copy(initialCameraPosition);

  // Configuration du renderer
  renderer.value = new THREE.WebGLRenderer({ alpha: true });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  sphereContainer.value.appendChild(renderer.value.domElement);

  // Ajouter les points
  const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xafa0ca });

  positions.forEach((pos, index) => {
    const pointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const point = new THREE.Mesh(pointGeometry, pointMaterial.clone());
    point.position.copy(pos);
    point.userData = { index }; // Associer l'index au point pour une redirection facile
    scene.value.add(point);
    points.push(point);
  });

  // Lumière
  const light = new THREE.AmbientLight(0xffffff);
  scene.value.add(light);

  // Contrôles de la caméra
  const controls = new OrbitControls(camera.value, renderer.value.domElement);
  controls.enableDamping = true; // Assure un mouvement plus fluide
  controls.dampingFactor = 0.25; // Réglage du lissage du mouvement

  window.addEventListener('resize', onWindowResize);
  renderer.value.domElement.addEventListener('click', onDocumentMouseClick); // Ajouter un écouteur de clic

  animate();
}

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);
  renderer.value.render(scene.value, camera.value);
}

// Fonction pour redimensionner la fenêtre
function onWindowResize() {
  camera.value.aspect = window.innerWidth / window.innerHeight;
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(window.innerWidth, window.innerHeight);
}

// Fonction de gestion des clics de souris
function onDocumentMouseClick(event) {
  // Calculer la position de la souris dans l'espace de la scène
  const rect = renderer.value.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Utiliser le raycaster pour détecter les objets cliqués
  raycaster.setFromCamera(mouse, camera.value);
  const intersects = raycaster.intersectObjects(points);

  if (intersects.length > 0) {
    const clickedPoint = intersects[0].object;

    // Change la couleur du point cliqué
    if (selectedPoint.value) {
      selectedPoint.value.material.color.set(0xff0000); // Réinitialiser la couleur du point précédent
    }
    selectedPoint.value = clickedPoint;
    clickedPoint.material.color.set(0xff0000); // Changer la couleur du point cliqué

    // Rediriger vers une autre page ou effectuer une action
    const pointIndex = clickedPoint.userData.index;
    redirectToPage(pointIndex);
  }
}

// Redirection vers une autre page
function redirectToPage(index) {
  const urls = [
    '/self_molding',
    '/turing_glasses',
    '/ambient_exp',
    '/ant_footprint',
    '/whether_organism',
    '/room_tour',
    '/books_particles'
  ];

  if (urls[index]) {
    window.location.href = urls[index];
  }
}

// Focus sur un point spécifique de la scène et changer sa couleur
function focusPoint(index) {
  // Réinitialiser la couleur du point précédemment sélectionné
  if (selectedPoint.value) {
    selectedPoint.value.material.color.set(0xafa0ca); // Couleur rouge pour les points non sélectionnés
  }

  const targetPoint = points[index];
  isFocused.value = true; // Marque la caméra comme étant focalisée sur un point
  selectedImageIndex.value = index; // Affiche l'image associée

  // Changer la couleur du point sélectionné
  selectedPoint.value = targetPoint;
  targetPoint.material.color.set(0xff0000); // Changer la couleur du point sélectionné en vert

  // Définir la nouvelle position de la caméra pour un déplacement fluide
  const newPos = targetPoint.position.clone().multiplyScalar(2); 
  moveCameraSmoothly(camera.value.position, newPos); 
}

// Fonction de déplacement fluide de la caméra
function moveCameraSmoothly(from, to) {
  const duration = 1000; // Durée de l'animation en ms
  const startTime = performance.now();

  function update() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Interpolation linéaire pour déplacer la caméra
    camera.value.position.lerpVectors(from, to, progress);
    camera.value.lookAt(0, 0, 0);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

// Réinitialiser la caméra à sa position initiale
function resetFocus() {
  isFocused.value = false; // Marque la caméra comme étant en position initiale
  selectedImageIndex.value = null; // Cache l'image

  // Réinitialiser la couleur du point sélectionné
  if (selectedPoint.value) {
    selectedPoint.value.material.color.set(0xff0000); // Couleur rouge pour les points non sélectionnés
  }

  moveCameraSmoothly(camera.value.position, initialCameraPosition); // Déplacement fluide vers la position initiale
}

// Initialisation du composant
onMounted(() => {
  initThree();
});

// Nettoyage du composant
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  renderer.value.domElement.removeEventListener('click', onDocumentMouseClick); // Supprimer l'écouteur de clic
  if (renderer.value) {
    renderer.value.dispose();
  }
});
</script>

<style scoped>
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'TWKBurns-Light';
  font-size: 1rem;
  width: 100%;
  border-top: 1px solid black; 
}

.menu li {
  border-bottom: 1px solid black;
  cursor: pointer;
}

.sphere-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.sphere-container canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.close-button {
  font-size: 2rem;
  color: #ff0000;
  cursor: pointer;
}

.image-overlay {
  position: absolute;
  pointer-events: none; /* Les clics passent à travers les images */
  margin-bottom: 10%;
  margin-left: 20vw;
  opacity: 0.5;
}

.image {
  width: 100%;
  max-width: 60vw;
  height: auto;
}
</style>
