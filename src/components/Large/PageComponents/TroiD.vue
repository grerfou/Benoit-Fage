<template>
  <div ref="backgroundContainer" class="background-scene"></div>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';

import modelUrl from '/public/model/Boid.glb';

const backgroundContainer = ref(null);
const scene = shallowRef(null);
const camera = shallowRef(null);
const renderer = shallowRef(null);
const model = shallowRef(null);
const clock = shallowRef(new THREE.Clock());

const mouse = { x: 0, y: 0 };
let animationInterval = null;

function initThree() {
  scene.value = new THREE.Scene();

  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.z = 5;
  camera.value.position.y = 1;
  camera.value.position.x = -1;

  renderer.value = new THREE.WebGLRenderer({ alpha: true, antialias: false }); // Antialias désactivé
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Résolution plafonnée
  renderer.value.setClearColor(0x000000, 0);
  backgroundContainer.value.appendChild(renderer.value.domElement);

  // Lumière simplifiée
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.value.add(ambientLight);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
}

function loadModel() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);

  loader.load(modelUrl, (gltf) => {
    model.value = gltf.scene;

    // Échelle ajustée
    model.value.scale.set(1.5, 1.5, 1.5);

    // Appliquer alpha/transparence
    model.value.traverse((child) => {
      if (child.isMesh) {
        const mat = child.material;
        (Array.isArray(mat) ? mat : [mat]).forEach((m) => {
          m.transparent = true;
          m.opacity = 0.3;
        });
      }
    });

    scene.value.add(model.value);
    startAnimation(); // Animation allégée
  }, undefined, (error) => {
    console.error('Erreur de chargement du modèle :', error);
  });
}

// Animation allégée (FPS réduit)
function startAnimation() {
  const fps = 30;
  const interval = 1000 / fps;

  animationInterval = setInterval(() => {
    const delta = clock.value.getDelta();

    if (model.value) {
      model.value.rotation.y = mouse.x * Math.PI;
      model.value.rotation.x = mouse.y * Math.PI * 0.5;
    }

    renderer.value.render(scene.value, camera.value);
  }, interval);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
}

function onWindowResize() {
  camera.value.aspect = window.innerWidth / window.innerHeight;
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(window.innerWidth, window.innerHeight);
}

onMounted(() => {
  initThree();
  loadModel();
});

onBeforeUnmount(() => {
  clearInterval(animationInterval);
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  if (renderer.value) renderer.value.dispose();
  if (model.value) {
    model.value.traverse((child) => {
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
  z-index: -1;
  pointer-events: none;
}
</style>

