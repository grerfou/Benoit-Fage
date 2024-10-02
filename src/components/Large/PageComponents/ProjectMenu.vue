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
  <div ref="sphereContainer" class="sphere-container item6"></div>
  
  <!-- Conteneurs pour les images -->
  <div v-if="selectedImageIndex !== null" class="image-overlay">
    <img :src="images[selectedImageIndex]" alt="" class="image" />
  </div>

  <div v-if="isFocused" class="close-button" @click="resetFocus">«</div>
</template>



<script setup>
import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useRouter } from 'vue-router';

const sphereContainer = ref(null);
const scene = shallowRef(null);
const camera = shallowRef(null);
const renderer = shallowRef(null);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const points = [];
const isFocused = ref(false);
const selectedImageIndex = ref(null);
const selectedPoint = ref(null);
const router = useRouter();
let textMesh; // Mesh pour le texte 3D

const images = [
  '/img/ImgPres/1.jpg',
  '/img/ImgPres/2.jpg',
  '/img/ImgPres/3.jpeg',
  '/img/ImgPres/4.jpg',
  '/img/ImgPres/5.jpg',
  '/img/ImgPres/6.jpg',
  '/img/ImgPres/7.jpeg',
];

const positions = [
  new THREE.Vector3(1, 2, 1),
  new THREE.Vector3(-1, 0, 1),
  new THREE.Vector3(1, -0, -1),
  new THREE.Vector3(-1, 2, -1),
  new THREE.Vector3(2, 1, 0),
  new THREE.Vector3(0, 3, 0),
  new THREE.Vector3(0, 1, 2)
];

const initialCameraPosition = new THREE.Vector3(3, 5, 3);

const pointMaterial = new THREE.MeshBasicMaterial({ 
  color: 0x000000, 
  wireframe: true,
  opacity: 0.5
});

function initThree() {
  // Initialisation de la scène
  scene.value = new THREE.Scene();
  
  // Initialisation de la caméra
  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.copy(initialCameraPosition);

  // Configuration du renderer
  renderer.value = new THREE.WebGLRenderer({ alpha: true });
  sphereContainer.value.appendChild(renderer.value.domElement);
  updateRendererSize();

  // Création des points
  positions.forEach((pos, index) => {
    const pointGeometry = new THREE.SphereGeometry(0.1, 12, 12);
    const point = new THREE.Mesh(pointGeometry, pointMaterial.clone());
    point.position.copy(pos);
    point.userData = { index };
    scene.value.add(point);
    points.push(point);
  });

  // Ajout de la lumière
  const light = new THREE.AmbientLight(0xffffff);
  scene.value.add(light);

  // Contrôles de la caméra
  const controls = new OrbitControls(camera.value, renderer.value.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  // Écouteurs d'événements
  window.addEventListener('resize', onWindowResize);
  renderer.value.domElement.addEventListener('click', onDocumentMouseClick);

  animate();
}

function createText(text, position) {
  const loader = new FontLoader();
  loader.load('/font/Terminal Grotesque_Regular.json', (font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.5, // Augmentation de la taille
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Couleur rouge
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.copy(position).add(new THREE.Vector3(0, 1, 0)); // Position légèrement au-dessus
    scene.value.add(textMesh);

    animateText(); // Appel à la fonction d'animation
  });
}

function animateText() {
  const targetPoint = selectedPoint.value.position;

  const animate = () => {
    if (textMesh) {
      const angle = Date.now() * 0.001; // Calculer l'angle
      textMesh.position.x = targetPoint.x + Math.cos(angle) * 1; // Rotation autour de l'axe X
      textMesh.position.z = targetPoint.z + Math.sin(angle) * 1; // Rotation autour de l'axe Z
      textMesh.lookAt(camera.value.position); // Orientation vers la caméra
    }
    requestAnimationFrame(animate); // Continuer l'animation
  };

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.value.render(scene.value, camera.value);
}

function updateRendererSize() {
  if (sphereContainer.value) {
    const width = sphereContainer.value.clientWidth;
    const height = sphereContainer.value.clientHeight;

    renderer.value.setSize(width, height);
    camera.value.aspect = width / height;
    camera.value.updateProjectionMatrix();
  }
}

function onWindowResize() {
  updateRendererSize();
}

function onDocumentMouseClick(event) {
  const rect = renderer.value.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera.value);
  const intersects = raycaster.intersectObjects(points);

  if (intersects.length > 0) {
    const clickedPoint = intersects[0].object;

    if (selectedPoint.value) {
      selectedPoint.value.material.copy(pointMaterial);
    }

    selectedPoint.value = clickedPoint;
    clickedPoint.material.color.set(0xff0000); // Changement de couleur pour le point sélectionné

    // Appel de createText pour créer le texte 3D
    createText(`Point ${clickedPoint.userData.index}`, clickedPoint.position);
    const pointIndex = clickedPoint.userData.index;
    navigateToProject(pointIndex);
  }
}

function navigateToProject(index) {
  const paths = [
    '/self_molding',
    '/turing_glasses',
    '/ambient_exp',
    '/ant_footprint',
    '/whether_organism',
    '/room_tour',
    '/books_particles'
  ];

  if (paths[index]) {
    router.push({ name: 'ProjectLarge', params: { id: index } });
  }
}

function focusPoint(index) {
  if (selectedPoint.value) {
    selectedPoint.value.material.copy(pointMaterial);
  }

  const targetPoint = points[index];
  isFocused.value = true;
  selectedImageIndex.value = index;

  selectedPoint.value = targetPoint;
  targetPoint.material.color.set(0xff0000);

  const newPos = targetPoint.position.clone().multiplyScalar(1.2);
  moveCameraSmoothly(camera.value.position, newPos);
}

function moveCameraSmoothly(from, to) {
  const duration = 6000;
  const startTime = performance.now();

  function update() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    camera.value.position.lerpVectors(from, to, progress);
    camera.value.lookAt(0, 0, 0);

    if (progress < 1) {
      requestAnimationFrame(update);
      }
    }

    update();
  }

  function resetFocus() {
    isFocused.value = false;
    selectedImageIndex.value = null;

    if (selectedPoint.value) {
      selectedPoint.value.material.copy(pointMaterial);
    }

    // Retirer le texte 3D si présent
    if (textMesh) {
      scene.value.remove(textMesh);
      textMesh.geometry.dispose();
      textMesh.material.dispose();
      textMesh = null;
    }

    moveCameraSmoothly(camera.value.position, initialCameraPosition);
  }

  onMounted(() => {
    initThree(); // Appel à l'initialisation de la scène
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize);
    renderer.value.domElement.removeEventListener('click', onDocumentMouseClick);
    if (renderer.value) {
      renderer.value.dispose();
    }
  });
</script>




<style scoped>
@import url(./../../../assets/LargeComponent.css);

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'TWKBurns-Light';
  font-size: 3rem;
  width: 50%;
  border-top: 1px solid black; 
}

.menu li {
  border-bottom: 1px solid black;
  cursor: pointer;
}

.sphere-container {
  width: 50%;
  height: 87vh; /* Utilisation de la pleine hauteur de la fenêtre */
  overflow: hidden;
}

.sphere-container canvas {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
  box-sizing: border-box; /* Prendre en compte la bordure */
}

.close-button {
  position: absolute;
  margin-left: 50%;
  font-size: 3rem;
  cursor: pointer;
}

.image-overlay {
  position: fixed;
  top: 15%;
  right: 15%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  z-index: -1;
}

.image {
  width: 100%;
  max-width: 60vw;
  height: auto;
}
</style>

