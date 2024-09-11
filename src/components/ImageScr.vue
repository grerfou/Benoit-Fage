<template>
  <div>
    <div class="image-display">
      <img :src="currentImage" alt="Scrolled Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        './src/assets/a.jpg',
        './src/assets/b.png',
        './src/assets/c.png',
        './src/assets/d.png',
      ],
      currentImageIndex: 0,
      scrollSpeedFactor: 1, // Facteur de vitesse pour accélérer le défilement des images
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;

      // Ajuster le défilement en fonction du facteur de vitesse
      const newImageIndex = Math.min(
        Math.floor(scrollFraction * (this.images.length) * this.scrollSpeedFactor),
        this.images.length - 1
      );

      if (newImageIndex !== this.currentImageIndex) {
        this.currentImageIndex = newImageIndex;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.image-display {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  border-bottom: 1px solid #ddd;
}

.image-display img {
  width: 100%;
  height: auto;
  display: block;
}

.scroll-content {
  padding: 20px;
  height: 2000px; /* Augmentez la hauteur pour permettre un meilleur défilement */
}
</style>

