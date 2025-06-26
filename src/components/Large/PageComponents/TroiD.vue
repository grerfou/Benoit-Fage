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

// Pour stocker la position de la souris normalisée (-1 à 1)
const mouse = { x: 0, y: 0 };

function initThree() {
  scene.value = new THREE.Scene();

  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.z = 5;

  renderer.value = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.setClearColor(0x000000, 0);
  backgroundContainer.value.appendChild(renderer.value.domElement);

  const light = new THREE.AmbientLight(0xffffff, 0.6);
  scene.value.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 10, 7.5);
  scene.value.add(directionalLight);

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
    scene.value.add(model.value);
    animate();
  }, undefined, (error) => {
    console.error('Erreur de chargement du modèle :', error);
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.value.getDelta();

  if (model.value) {
    // Rotation basée sur la souris
    model.value.rotation.y = mouse.x * Math.PI;   // Rotation horizontale
    model.value.rotation.x = mouse.y * Math.PI * 0.5; // Rotation verticale (limitée)
  }

  renderer.value.render(scene.value, camera.value);
}

function onMouseMove(event) {
  // Convertir en coordonnées normalisées (-1 à 1)
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

