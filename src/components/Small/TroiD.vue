<template>
  <div ref="backgroundContainer" class="background-scene"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';


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



// Objet de cache des modèles
const modelCache = {};

// Props
const props = defineProps({
  modelDisplayTime: {
    type: Number,
    default: 5000 // Temps d'affichage de chaque modèle en millisecondes
  }
});

// Références et état non réactif
const backgroundContainer = ref(null); // Référence au conteneur DOM
const scene = shallowRef(null); // Référence non réactive pour la scène
const camera = shallowRef(null); // Référence non réactive pour la caméra
const renderer = shallowRef(null); // Référence non réactive pour le renderer
const mixer = shallowRef(null); // Référence non réactive pour le mixer
const clock = shallowRef(new THREE.Clock()); // Référence non réactive pour l'horloge
const activeModel = shallowRef(null); // Référence non réactive pour le modèle actif
const currentModelIndex = ref(0); // Référence réactive pour l'index du modèle actuel
const isMoving = ref(false); // État pour savoir si le modèle est en mouvement

// Fonction pour initialiser Three.js
function initThree() {
  scene.value = new THREE.Scene();

  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.z = 5;

  renderer.value = new THREE.WebGLRenderer({ alpha: true });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setClearColor(0x000000, 0); // Fond transparent
  backgroundContainer.value.appendChild(renderer.value.domElement);

  const light = new THREE.AmbientLight(0x404040);
  scene.value.add(light);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('touchstart', onTouchStart); // Écouteur pour le début du toucher
  window.addEventListener('touchend', onTouchEnd); // Écouteur pour la fin du toucher
}

// Fonction pour charger un modèle (avec mise en cache)
function loadModel(index) {
  if (index >= models.length) return;

  const { url, position, rotation } = models[index];

  // Vérifier si le modèle est déjà dans le cache
  if (modelCache[url]) {
    console.log(`Using cached model: ${url}`);
    setModel(modelCache[url], position, rotation);
  } else {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      // Mettre en cache le modèle chargé
      modelCache[url] = gltf.scene.clone(); // Cloner pour éviter les références partagées
      setModel(modelCache[url], position, rotation);
    }, undefined, (error) => {
      console.error(`Error loading model: ${url}`, error);
    });
  }
}

// Fonction pour définir le modèle dans la scène
function setModel(model, position, rotation) {
  if (activeModel.value) {
    scene.value.remove(activeModel.value);
    activeModel.value.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }

  activeModel.value = model;

  // Appliquer les transformations de position et de rotation
  activeModel.value.position.set(position.x, position.y, position.z);
  activeModel.value.rotation.set(rotation.x, rotation.y, rotation.z);

  // Modifier les matériaux pour afficher en wireframe noir
  activeModel.value.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0x000000, // Couleur noire
        wireframe: true // Affichage en mode wireframe
      });
    }
  });

  scene.value.add(activeModel.value);

  if (mixer.value) {
    mixer.value.stopAllAction();
  }

  if (activeModel.value.animations?.length > 0) {
    mixer.value = new THREE.AnimationMixer(activeModel.value);
    activeModel.value.animations.forEach((clip) => {
      mixer.value.clipAction(clip).play();
    });
  }

  setTimeout(() => {
    currentModelIndex.value = (currentModelIndex.value + 1) % models.length;
    loadModel(currentModelIndex.value);
  }, props.modelDisplayTime);

  animate();
}

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.value.getDelta();

  if (isMoving.value && activeModel.value) {
    // Faire tourner le modèle lorsque isMoving est true
    activeModel.value.rotation.y += delta * 0.5; // Ajuster la vitesse de rotation selon tes besoins
  }

  if (mixer.value) {
    mixer.value.update(delta);
  }

  renderer.value.render(scene.value, camera.value);
}

// Gestion du toucher pour démarrer le mouvement
function onTouchStart() {
  isMoving.value = true;
}

// Gestion du toucher pour arrêter le mouvement
function onTouchEnd() {
  isMoving.value = false;
}

// Fonction pour gérer le redimensionnement de la fenêtre
function onWindowResize() {
  camera.value.aspect = window.innerWidth / window.innerHeight;
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(window.innerWidth, window.innerHeight);
}

// Initialisation lorsque le composant est monté
onMounted(() => {
  initThree();
  loadModel(currentModelIndex.value);
});

// Nettoyage avant la destruction du composant
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('touchstart', onTouchStart); // Supprimer l'écouteur du début du toucher
  window.removeEventListener('touchend', onTouchEnd); // Supprimer l'écouteur de la fin du toucher
  if (renderer.value) {
    renderer.value.dispose();
  }
  if (activeModel.value) {
    activeModel.value.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
});
</script>

<style scoped>
.background-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1; /* Assure que la scène reste en arrière-plan */
  pointer-events: none; /* Permet de cliquer à travers */
}
</style>

