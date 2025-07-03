<template>
  <div ref="container" class="background-scene"></div>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const container = ref(null);
const scene = shallowRef(null);
const camera = shallowRef(null);
const renderer = shallowRef(null);
const model = shallowRef(null);

let animationId = null;

function initThree() {
  scene.value = new THREE.Scene();

  camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.value.position.set(-1, 1, 5);

  // Cleanup previous renderer if any
  if (renderer.value) {
    if (renderer.value.domElement.parentNode) {
      renderer.value.domElement.parentNode.removeChild(renderer.value.domElement);
    }
    renderer.value.dispose();
  }

  renderer.value = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.value.setClearColor(0xffffff, 0); // Transparent background

  if (container.value && !container.value.contains(renderer.value.domElement)) {
    container.value.appendChild(renderer.value.domElement);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.value.add(ambientLight);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('scroll', onScroll, { passive: true });
}

function loadModel() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    '/model/computer.glb', 
    (gltf) => {
      model.value = gltf.scene;
      model.value.scale.set(2, 2, 2);

      model.value.traverse((child) => {
        if (child.isMesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 1;
            mat.depthWrite = false;
            mat.needsUpdate = true;
          });
        }
      });

      scene.value.add(model.value);
      animate();

      // Appliquer l'opacité initiale selon la position de scroll
      onScroll();
    },
    undefined,
    (error) => console.error('Erreur de chargement :', error)
  );
}

function updateOpacity(opacity) {
  if (!model.value) return;
  model.value.traverse((child) => {
    if (child.isMesh) {
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        mat.opacity = opacity;
        mat.transparent = opacity < 1;
        mat.depthWrite = false;
        mat.needsUpdate = true;
      });
    }
  });
}

function onScroll() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = Math.min(scrollY / maxScroll, 1);

  const newOpacity = 1 - scrollRatio; // 1 en haut, 0 en bas
  updateOpacity(newOpacity);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  if (model.value) {
    // Rotation en fonction du scroll
    const rotation = window.scrollY * 0.001;
    model.value.rotation.y = rotation;
  }
  renderer.value.render(scene.value, camera.value);
}

function onWindowResize() {
  camera.value.aspect = window.innerWidth / window.innerHeight;
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
}

onMounted(() => {
  initThree();
  loadModel();
  onWindowResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('scroll', onScroll);

  if (animationId) cancelAnimationFrame(animationId);

  if (renderer.value) {
    if (renderer.value.domElement.parentNode) {
      renderer.value.domElement.parentNode.removeChild(renderer.value.domElement);
    }
    renderer.value.dispose();
  }

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
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>

