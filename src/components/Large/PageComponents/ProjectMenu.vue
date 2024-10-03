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
  camera.value = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
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

function removeCircle() {
  const text = document.querySelector('.rotating-text');
  if (text){
    text.remove();
  }
}


// Fonction pour ajouter un cercle en CSS à la position 2D calculée
function showCircleAtPosition(position2D) {
  // Si un cercle existe déjà, le supprimer
  let conteneur = document.querySelector('.sphere-container');

  // Créer un texte qui tourne autour du cercle
  const text = document.createElement('div');
  text.className = 'rotating-text';
  text.innerText = "./CLICK ¬"; // Remplace par le texte souhaité

  text.style.position = 'absolute';
  text.style.padding = '7px';
  text.style.marginTop = '-150px';
  text.style.marginLeft = '-230px';
  text.style.top = '50%';
  text.style.left = '50%';
  text.style.transformOrigin = 'center bottom';
  text.style.whiteSpace = 'nowrap';
  text.style.fontSize = '50px';
  text.style.fontFamily = 'Terminal_Grotesque_open';
  text.style.textAlign = 'center';

  conteneur.appendChild(text);
}


function get2DPositionOfSphere(sphere, camera, renderer) {
  // Cloner la position 3D de la sphère
  const vector = sphere.position.clone();

  // Projeter les coordonnées 3D en coordonnées écran (NDC)
  vector.project(camera);

  // Récupérer les dimensions du canvas
  const canvasWidth = renderer.domElement.clientWidth;
  const canvasHeight = renderer.domElement.clientHeight;

  // Calculer les coordonnées en pixels (de -1 à 1 vers 0 à canvasWidth/Height)
  const x = (vector.x * 0.5 + 0.5) * canvasWidth;
  const y = (-(vector.y * 0.5) + 0.5) * canvasHeight; // Inverser l'axe Y pour correspondre aux coordonnées de l'écran

  return { x, y };
}

const isAnimating = ref(false); // Ajout de cette variable

function focusPoint(index) {
  if (isAnimating.value) return; // Ignore la sélection si une animation est en cours

  if (selectedPoint.value) {
    selectedPoint.value.material.copy(pointMaterial); // Réinitialiser la couleur du point précédent
  }

  const targetPoint = points[index];
  isFocused.value = true;
  selectedImageIndex.value = index;

  selectedPoint.value = targetPoint;
  targetPoint.material.color.set(0xff0000); // Changer la couleur pour indiquer la sélection

  const pointPosition = targetPoint.position.clone(); // Position du point sélectionné
  const distanceFromPoint = 0.5; // Distance fixe que tu veux entre le point et la caméra

  // Calculer la direction de la caméra vers le point
  const cameraDirection = camera.value.position.clone().sub(pointPosition).normalize(); // Direction de la caméra vers le point
  const newCameraPosition = pointPosition.clone().add(cameraDirection.multiplyScalar(distanceFromPoint)); // Nouvelle position de la caméra

  // Animer la caméra
  isAnimating.value = true; // Démarrer l'animation
  moveCameraSmoothly(camera.value.position.clone(), newCameraPosition, pointPosition, () => {
    const sphereCenter2D = get2DPositionOfSphere(targetPoint, camera.value, renderer.value);
    showCircleAtPosition(sphereCenter2D); // Afficher le cercle après l'animation
    isAnimating.value = false; // Fin de l'animation
  });
}



// Fonction pour déplacer la caméra en douceur
function moveCameraSmoothly(startPosition, targetPosition, lookAtPosition, callback = null) {
  const duration = 4000; // Durée de l'animation
  const startTime = performance.now();

  function animateCamera() {
    const elapsed = performance.now() - startTime;
    const t = Math.min(elapsed / duration, 1); // Normaliser le temps

    // Interpolation de la position de la caméra
    const lerpedPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, t);
    camera.value.position.copy(lerpedPosition);

    // Interpoler la direction pour le lookAt
    const currentLookAt = new THREE.Vector3(); // Position actuelle du lookAt
    currentLookAt.copy(camera.value.position).add(camera.value.getWorldDirection(new THREE.Vector3())); // Direction actuelle
    const lerpedLookAt = new THREE.Vector3().lerpVectors(currentLookAt, lookAtPosition, t); // Nouvelle direction

    camera.value.lookAt(lerpedLookAt); // Mettre à jour le lookAt de la caméra

    // Continuer l'animation
    if (t < 1) {
      requestAnimationFrame(animateCamera);
      removeCircle();
    } else if (callback) {
      callback(); // Appeler le callback à la fin de l'animation
    }
  }

  animateCamera(); // Démarrer l'animation
}


function resetFocus() {
  // Supprimer le cercle quand on réinitialise la vue
  removeCircle();

  isFocused.value = false;
  selectedImageIndex.value = null;

  if (selectedPoint.value) {
    selectedPoint.value.material.copy(pointMaterial);
  }

  // Déplacer la caméra vers la position initiale
  moveCameraSmoothly(camera.value.position.clone(), initialCameraPosition, new THREE.Vector3(0, 0, 0)); // Regarde vers le centre
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
  position: relative; 
  width: 50%;
  height: 87vh; /* Utilisation de la pleine hauteur de la fenêtre */
  overflow: hidden;
}

.sphere-container canvas {
  width: 100%;
  height: 100%;
  display: block;
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

