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

let animationId = null;

function initThree() {
  scene.value = new THREE.Scene();

  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.set(-1, 1, 5);

  renderer.value = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.value.setClearColor(0x000000, 0);
  backgroundContainer.value.appendChild(renderer.value.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.value.add(ambientLight);

  window.addEventListener('resize', onWindowResize);
}

function loadModel() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);

  loader.load(modelUrl, (gltf) => {
    model.value = gltf.scene;
    model.value.scale.set(1.5, 1.5, 1.5);

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
    startAnimation();
  }, undefined, (error) => {
    console.error('Erreur de chargement du modèle :', error);
  });
}

function animate() {
  animationId = requestAnimationFrame(animate);

  const delta = clock.value.getDelta();

  if (model.value) {
    // Rotation continue sur les 3 axes
    model.value.rotation.x += delta * 0.5;  // Vitesse X
    model.value.rotation.y += delta * 0.3;  // Vitesse Y
    model.value.rotation.z += delta * 0.2;  // Vitesse Z
  }

  renderer.value.render(scene.value, camera.value);
}

function startAnimation() {
  if (!animationId) {
    animate();
  }
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
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  window.removeEventListener('resize', onWindowResize);
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

