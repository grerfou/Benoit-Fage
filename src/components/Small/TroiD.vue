<template>
  <div ref="container" class="three-container"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
  name: 'ThreejsGltfLoader',
  props: {
    modelUrl: {
      type: String,
      required: true
    },
    scale: {
      type: Object,
      default: () => ({ x: 1, y: 1, z: 1 })
    },
    rotation: {
      type: Object,
      default: () => ({ x: 0, y: 0, z: 0 })
    },
    rotationSpeed: {
      type: Object,
      default: () => ({ x: 0, y: 0.01, z: 0 })  // Par défaut, rotation sur l'axe Y
    }
  },
  data() {
    return {
      model: null
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.container.appendChild(renderer.domElement);

      // Light
      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);

      // Load GLTF model
      const loader = new GLTFLoader();
      loader.load(this.modelUrl, (gltf) => {
        // Clear previous objects in the scene
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            // Create wireframe material
            const wireframeMaterial = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              wireframe: true
            });

            // Create a wireframe from the geometry
            const wireframe = new THREE.WireframeGeometry(child.geometry);
            child.material = wireframeMaterial;
            child.geometry = wireframe;
          }
        });

        // Apply transformations
        gltf.scene.scale.set(this.scale.x, this.scale.y, this.scale.z);
        gltf.scene.rotation.set(
          this.rotation.x,
          this.rotation.y,
          this.rotation.z
        );

        this.model = gltf.scene;
        scene.add(this.model);
      }, undefined, (error) => {
        console.error(error);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the model if it's loaded
        if (this.model) {
          this.model.rotation.x += this.rotationSpeed.x;
          this.model.rotation.y += this.rotationSpeed.y;
          this.model.rotation.z += this.rotationSpeed.z;
        }

        // Render the scene
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  }
};
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>

