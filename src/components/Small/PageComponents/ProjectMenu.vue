<template>
    <div class="menu-container">
      <!-- Menu HTML/CSS -->
      <ul class="menu">
        <li @mouseover="focusPoint(0)" @mouseout="resetFocus">Projet 1</li>
        <li @mouseover="focusPoint(1)" @mouseout="resetFocus">Projets 2</li>
        <li @mouseover="focusPoint(2)" @mouseout="resetFocus">Projet 3</li>
      </ul>
      
      <!-- La div existante où le canevas Three.js sera placé -->
      <div ref="sphereContainer" class="sphere-container"></div>
    </div>
  </template>
  
  <script setup>
  import * as THREE from 'three';
  import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  
  const sphereContainer = ref(null);
  const scene = shallowRef(null);
  const camera = shallowRef(null);
  const renderer = shallowRef(null);
  const points = []; // Pour stocker les points de la sphère
  
  // Fonction pour initialiser Three.js
  function initThree() {
    scene.value = new THREE.Scene();
  
    camera.value = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.value.position.set(0, 0, 5);
  
    renderer.value = new THREE.WebGLRenderer({ alpha: true });
    renderer.value.setSize(window.innerWidth, window.innerHeight);
    
    // Ajouter le canevas Three.js à la div
    sphereContainer.value.appendChild(renderer.value.domElement);
  
    // Créer la sphère de base
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.value.add(sphere);
  
    // Matériau pour les points
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  
    // Ajouter des points sur la sphère
    const positions = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0)
    ];
  
    positions.forEach((pos, index) => {
      const pointGeometry = new THREE.SphereGeometry(0.05, 32, 32);
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.copy(pos);
      scene.value.add(point);
      points.push(point);
      console.log(`Point ${index} ajouté à ${pos.toArray()}`);
    });
  
    const light = new THREE.AmbientLight(0xffffff);
    scene.value.add(light);
  
    const controls = new OrbitControls(camera.value, renderer.value.domElement);
  
    window.addEventListener('resize', onWindowResize);
  
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
  
  // Focus sur un point spécifique de la sphère
  function focusPoint(index) {
    const targetPoint = points[index];
    if (targetPoint) {
      console.log(`Focus sur le point ${index}`);
      const newPos = targetPoint.position.clone().multiplyScalar(1.5);
      camera.value.position.copy(newPos);
      camera.value.lookAt(targetPoint.position);
    } else {
      console.error(`Point ${index} non trouvé`);
    }
  }
  
  // Réinitialiser la caméra
  function resetFocus() {
    console.log("Réinitialisation de la caméra");
    camera.value.position.set(0, 0, 5);
    camera.value.lookAt(new THREE.Vector3(0, 0, 0));
  }
  
  // Initialisation du composant
  onMounted(() => {
    initThree();
  });
  
  // Nettoyage du composant
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize);
    if (renderer.value) {
      renderer.value.dispose();
    }
  });
  </script>
  
  <style scoped>
  .menu-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
  }
  
  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    margin: 10px;
    cursor: pointer;
  }
  
  .sphere-container {
    width: 100%; /* Ajuste cette valeur selon tes besoins */
    height: 50vh; /* Prend la hauteur de la fenêtre */
    position: relative;
    overflow: hidden; /* Empêche le débordement du canvas */
  }
  
  .sphere-container canvas {
    width: 100%; /* Canevas prend toute la largeur de la div */
    height: 100%; /* Canevas prend toute la hauteur de la div */
    display: block; /* Empêche les espaces blancs autour du canevas */
  }
  </style>
  