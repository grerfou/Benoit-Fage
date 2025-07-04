<template>
  <div >
    <nav class="FlexContainer">
      <div class="flex-item">Benoit Fage</div>
      <div class="menu">
        <span @click="scrollTo('home')">Home/</span>
        <span @click="scrollTo('work')">Work/</span>
        <span @click="scrollTo('contact')">Contact/</span>
      </div>
    </nav>

    <section id="home" class="section">
      <HomeLarge />
    </section>

    <section id="work" class="section">
      <WorkLarge />
    </section>

    <section id="contact" class="section">
      <ContactLarge />
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HomeSmall from './HomeSmall.vue'
import WorkSmall from './WorkSmall.vue'
import ContactSmall from './ContactSmall.vue'
import Lenis from '@studio-freight/lenis'

const router = useRouter()
const route = useRoute()
let lenis = null

function scrollTo(id) {
  router.replace({ hash: `#${id}` })

  setTimeout(() => {
    const el = document.getElementById(id)
    if (el && lenis) {
      lenis.scrollTo(el, {
        offset: 0,
        duration: 1.2,
        easing: t => t, // Linéaire, tu peux changer pour une autre easing
      })
    }
  }, 500)
}

function raf(time) {
  lenis?.raf(time)
  requestAnimationFrame(raf)
}

onMounted(() => {
  lenis = new Lenis({
    duration: 0.7,
    easing: t => t,
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
  })

  requestAnimationFrame(raf)

  // Scroll au hash s'il y en a un à l'arrivée
  if (route.hash) {
    const id = route.hash.substring(1)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el && lenis) {
        lenis.scrollTo(el)
      }
    }, 300)
  }
})

onBeforeUnmount(() => {
  lenis = null
})
</script>

<style>
@font-face {
  font-family: "NeuePowerTrial-Regular";
  src: url("/public/font/NeuePowerTrial-Regular.woff");
}

@font-face {
  font-family: "Terminal_Grotesque";
  src: url("/public/font/terminal-grotesque.ttf");
}

@font-face {
  font-family: "test";
  src: url("/public/font/IBMPlexSans-LightItalic.ttf");
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  height: 370vh;
}

*, *::before, *::after {
  box-sizing: border-box;
}

span {
  cursor: grab;
}

.FlexContainer {
  font-size: 2rem;
  font-family: 'test';
  display: flex;
  justify-content: space-between;
  position: fixed; /* ✅ La nav reste visible même pendant le scroll */
  z-index: 1100;
  width: 100vw;
  top: 0;
  background-color: white;
  padding: 0rem 2rem;
  box-sizing: border-box;
}

.flex-item {
  font-family: "test";
  font-weight: 500;
}

/* Sections */
.section {
  width: 100vw;
  height: 100vh;
  padding-top: 5rem; /* Ajusté à la hauteur de la navbar */
}
</style>

