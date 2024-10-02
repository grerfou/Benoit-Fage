te>
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


/*


Note :


Function --> get2DPositionOfSphere()

// Fonction pour obtenir la position 2D du centre d'une sphère
function get2DPositionOfSphere(point, camera, renderer) {
  const vector = point.position.clone();

  vector.project(camera);

  const widthHalf = renderer.domElement.clientWidth / 2;
  const heightHalf = renderer.domElement.clientHeight / 2;

  const x = (vector.x * widthHalf) + widthHalf;
  const y = -(vector.y * heightHalf) + heightHalf;

  return { x, y };
}


*/











import * as THREE from 'three';
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRouter } from 'vue-router';

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
let arrowHelper = null; // Pour stocker la flèche
const router = useRouter();

// Variable pour le décalage de la flèche
const arrowOffset = new THREE.Vector3(0, 0.5, 0); // Ajustez les valeurs selon vos besoins

// Liste des images associées aux titres
const images = [
  '/img/ImgPres/1.jpg',
  '/img/ImgPres/2.jpg',
  '/img/ImgPres/3.jpeg',
  '/img/ImgPres/4.jpg',
  '/img/ImgPres/5.jpg',
  '/img/ImgPres/6.jpg',
  '/img/ImgPres/7.jpeg',
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

const initialCameraPosition = new THREE.Vector3(3, 5, 3); // Position initiale de la caméra
const pointMaterial = new THREE.MeshBasicMaterial({ 
  color: 0x00000, 
  wireframe: true,
  opacity: 0.5
});

function initThree() {
  scene.value = new THREE.Scene();

  // Initialisation de la caméra
  camera.value = new THREE.PerspectiveCamera(75, 10, 0.1, 1000); // Temporairement 1 pour le ratio
  camera.value.position.copy(initialCameraPosition);

  // Configuration du renderer
  renderer.value = new THREE.WebGLRenderer({ alpha: true });

  // Ajouter le canvas dans le conteneur sphereContainer
  sphereContainer.value.appendChild(renderer.value.domElement);

  // Mettre à jour la taille du renderer en fonction de la taille réelle du conteneur
  updateRendererSize();

  positions.forEach((pos, index) => {
    const pointGeometry = new THREE.SphereGeometry(0.1, 12, 12);
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
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  window.addEventListener('resize', onWindowResize);
  renderer.value.domElement.addEventListener('click', onDocumentMouseClick);

  animate();
}

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);
  renderer.value.render(scene.value, camera.value);
}

// Mettre à jour la taille du renderer en fonction de celle du conteneur
function updateRendererSize() {
  if (sphereContainer.value) {
    const width = sphereContainer.value.clientWidth;
    const height = sphereContainer.value.clientHeight;

    renderer.value.setSize(width, height);
    camera.value.aspect = width / height;
    camera.value.updateProjectionMatrix();
  }
}

// Fonction de redimensionnement
function onWindowResize() {
  updateRendererSize();
}

// Fonction de gestion des clics de souris
function onDocumentMouseClick(event) {
  const rect = renderer.value.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera.value);
  const intersects = raycaster.intersectObjects(points);

  if (intersects.length > 0) {
    const clickedPoint = intersects[0].object;

    // Réinitialiser la couleur de la sphère précédemment sélectionnée
    if (selectedPoint.value) {
      selectedPoint.value.material.copy(pointMaterial);
    }

    // Mettre à jour la sphère sélectionnée
    selectedPoint.value = clickedPoint;
    clickedPoint.material.color.set(0xff0000);

    // Supprimer l'ancienne flèche si elle existe
    if (arrowHelper) {
      scene.value.remove(arrowHelper);
    }

    // Créer une nouvelle flèche et la positionner près de la sphère sélectionnée
    const direction = new THREE.Vector3(0, 1, 0);  // Direction de la flèche (vers le haut dans cet exemple)
    const length = 0.5;  // Longueur de la flèche
    const color = 0x00ff00;  // Couleur de la flèche

    // Appliquer le décalage de la flèche
    const arrowPosition = clickedPoint.position.clone().add(arrowOffset);
    arrowHelper = new THREE.ArrowHelper(direction, arrowPosition, length, color);
    scene.value.add(arrowHelper);

    // Rediriger vers une autre page avec l'index du point
    const pointIndex = clickedPoint.userData.index;
    navigateToProject(pointIndex);
  } else {
    // Si aucun point n'est cliqué, retirer la flèche
    if (arrowHelper) {
      scene.value.remove(arrowHelper);
      arrowHelper = null;
    }
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

// Focaliser la caméra sur un point spécifique
function focusPoint(index) {
  if (selectedPoint.value) {
    selectedPoint.value.material.copy(pointMaterial);
  }

  const target = points[index]; // Utiliser une variable locale pour le point cible
  isFocused.value = true;
  selectedImageIndex.value = index;

  selectedPoint.value = target;
  target.material.color.set(0xff0000);

  // Supprimer l'ancienne flèche si elle existe
  if (arrowHelper) {
    scene.value.remove(arrowHelper);
  }

  // Créer une nouvelle flèche et la positionner près de la sphère sélectionnée
  const direction = new THREE.Vector3(0, 1, 0); // Direction de la flèche
  const length = 0.5; // Longueur de la flèche
  const color = 0x00ff00; // Couleur de la flèche
  const arrowPosition = target.position.clone().add(arrowOffset); // Appliquer le décalage de la flèche
  arrowHelper = new THREE.ArrowHelper(direction, arrowPosition, length, color);
  scene.value.add(arrowHelper);

  // Animer la caméra pour se focaliser sur le point
  moveCameraSmoothly(camera.value.position, target.position.clone().add(new THREE.Vector3(0, 1, 2)));
}

// Fonction d'animation de la caméra
function moveCameraSmoothly(from, to) {
  const duration = 1; // Durée de l'animation en secondes
  const startTime = performance.now();

  function update() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Interpolation linéaire pour la position de la caméra
    camera.value.position.lerpVectors(from, to, progress);
    camera.value.lookAt(to); // Regarder vers le point cible

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  update();
}

// Réinitialiser la vue
function resetFocus() {
  isFocused.value = false;
  selectedImageIndex.value = null;

  if (selectedPoint.value) {
    selectedPoint.value.material.copy(pointMaterial);
  }

  // Supprimer la flèche
  if (arrowHelper) {
    scene.value.remove(arrowHelper);
    arrowHelper = null;
  }

  moveCameraSmoothly(camera.value.position, initialCameraPosition);
}

onMounted(() => {
  initThree();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  if (renderer.value && renderer.value.domElement) {
    renderer.value.domElement.removeEventListener('click', onDocumentMouseClick);
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

