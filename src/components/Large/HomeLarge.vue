<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import TroiD from './PageComponents/TroiD.vue'
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'

const originalText = 'Creative Coder  ~  Artist'
const glitchChars = '!@#$%^&*()_+{}[]<>?/\\|~'
const glitchedText = ref(originalText.split(''))

let glitchInterval = null

function glitchText(text, glitchCount = 3) {
  const chars = text.split('')
  const indices = []

  while (indices.length < glitchCount) {
    const randIndex = Math.floor(Math.random() * chars.length)
    if (!indices.includes(randIndex) && chars[randIndex] !== ' ') {
      indices.push(randIndex)
    }
  }

  return chars.map((char, i) =>
    indices.includes(i) ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
  )
}

onMounted(async () => {
  glitchInterval = setInterval(() => {
    glitchedText.value = glitchText(originalText, 3)
    setTimeout(() => {
      glitchedText.value = originalText.split('')
    }, 900)
  }, 600)

  await nextTick()

  // Animation GSAP raffinée lettre par lettre
  gsap.fromTo(
    '.letter',
    {
      X: -100,
      opacity: 0,
      filter: 'blur(3px)',
      rotateY: 90,
    },
    {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      rotateY: 0,
      ease: 'back.out(1.7)',
      duration: 1.2,
      stagger: {
        each: 0.05,
        from: 'start',
      },
    }
  )
})

onBeforeUnmount(() => {
  clearInterval(glitchInterval)
})
</script>

<template>
  <FullScreenMenu />
  <TroiD :modelDisplayTime="3000" />

  <div class="parentElement">
    <div class="size glitch-title">
      <span v-for="(char, index) in glitchedText" :key="index" class="letter">
        {{ char }}
      </span>
    </div>
    <div class="item item6 croix"></div>
  </div>
</template>

<style scoped>
@import './../../assets/LargeComponent.css';

.size {
  padding-top: 0;
}

.glitch-title {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: 'Terminal_Grotesque', monospace;
  font-size: clamp(3rem, 5vw + 1rem, 10rem);
  max-width: 90vw;
  backface-visibility: hidden;
}

.letter {
  display: inline-block;
  backface-visibility: hidden;
  min-width: 0.5ch; /* pour forcer un espace visible */
}
</style>

