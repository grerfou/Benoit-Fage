<template>
  <div class="loader-container">
    <div class="rectangle">
      <div ref="topLine" class="border-line top"></div>
      <div ref="rightLine" class="border-line right"></div>
      <div ref="bottomLine" class="border-line bottom"></div>
      <div ref="leftLine" class="border-line left"></div>
    </div>
    <p>{{ progress }}%</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const topLine = ref(null)
const rightLine = ref(null)
const bottomLine = ref(null)
const leftLine = ref(null)

const progress = ref(0)

onMounted(() => {
  const tl = gsap.timeline({
    onUpdate: () => {
      progress.value = Math.floor(tl.progress() * 100)
    }
  })

  // Animations simultanées
  tl.to(topLine.value, { width: 0, duration: 2, ease: 'power1.inOut' }, 0)
  tl.to(bottomLine.value, { width: 0, duration: 2, ease: 'power1.inOut' }, 0)
  tl.to(rightLine.value, { height: 0, duration: 2, ease: 'power1.inOut' }, 0)
  tl.to(leftLine.value, { height: 0, duration: 2, ease: 'power1.inOut' }, 0)
})
</script>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  overflow: hidden;
}

.rectangle {
  position: relative;
  width: 90vw;
  height: 90vh;
  /* un peu de marge intérieure pour que les lignes soient un peu détachées des bords */
  margin: 20px;
}

.border-line {
  position: absolute;
  background-color: black;
}

/* Ligne du haut */
.top {
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
  transform-origin: left center;
}

/* Ligne du bas */
.bottom {
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
  transform-origin: right center;
}

/* Ligne de droite */
.right {
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  transform-origin: top center;
}

/* Ligne de gauche */
.left {
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  transform-origin: bottom center;
}

p {
  margin-top: 1rem;
  font-size: 1.2rem;
}
</style>

