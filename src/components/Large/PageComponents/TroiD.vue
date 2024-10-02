<template>
  <div ref="backgroundContainer" class="background-scene"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
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
const backgroundContainer = ref(null);
const scene = shallowRef(null);
const camera = shallowRef(null);
const renderer = shallowRef(null);
const mixer = shallowRef(null);
const clock = shallowRef(new THREE.Clock());
const activeModel = shallowRef(null);
const currentModelIndex = ref(0);
const isMoving = ref(false);

// Fréquence d'animation
let lastFrameTime = 0;
const maxFPS = 30; // Limiter à 30 FPS

// Timer pour détecter l'arrêt de la souris
let stopMoveTimeout = null;

// Fonction pour initialiser Three.js
function initThree() {
  scene.value = new THREE.Scene();

  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.z = 5;

  renderer.value = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.value.setPixelRatio(window.devicePixelRatio * 0.5);
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setClearColor(0x000000, 0); // Fond transparent
  renderer.value.sortObjects = false;
  backgroundContainer.value.appendChild(renderer.value.domElement);

  const light = new THREE.AmbientLight(0x404040);
  scene.value.add(light);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
}

// Fonction pour charger un modèle
function loadModel(index) {
  if (index >= models.length) return;

  const { url, position, rotation } = models[index];

  // Vérifier si le modèle est déjà dans le cache
  if (modelCache[url]) {
    setModel(modelCache[url], position, rotation);
  } else {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/path/to/draco/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(url, (gltf) => {
      modelCache[url] = gltf.scene.clone();
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
        if (child.material.map) child.material.map.dispose(); // Nettoyage des textures
      }
    });
  }

  activeModel.value = model;

  activeModel.value.position.set(position.x, position.y, position.z);
  activeModel.value.rotation.set(rotation.x, rotation.y, rotation.z);

  activeModel.value.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
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
function animate(time) {
  requestAnimationFrame(animate);

  const delta = time - lastFrameTime;
  const interval = 1000 / maxFPS;

  if (delta > interval) {
    lastFrameTime = time - (delta % interval);

    const deltaTime = clock.value.getDelta();

    if (isMoving.value && activeModel.value) {
      activeModel.value.rotation.y += deltaTime * 0.5; // Ajuster la vitesse de rotation
    }

    if (mixer.value) {
      mixer.value.update(deltaTime);
    }

    renderer.value.render(scene.value, camera.value);
  }
}

// Gestion du mouvement de la souris pour déclencher l'animation
function onMouseMove() {
  // Activer le mouvement
  isMoving.value = true;
  
  // Réinitialiser le timer d'arrêt
  clearTimeout(stopMoveTimeout);
  
  // Déclencher l'arrêt du mouvement après 500ms d'inactivité
  stopMoveTimeout = setTimeout(() => {
    isMoving.value = false;
  }, 500);
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
  window.removeEventListener('mousemove', onMouseMove);
  if (renderer.value) {
    renderer.value.dispose();
  }
  if (activeModel.value) {
    activeModel.value.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
        if (child.material.map) child.material.map.dispose();
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
  z-index: -1;
  pointer-events: none;
}
</style>
