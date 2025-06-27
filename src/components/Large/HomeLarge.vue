<template>
  <FullScreenMenu />
  <TroiD :modelDisplayTime="3000" />

  <div class="parentElement">
    <div class="size glitch-title">
      <span v-for="(letter, i) in letters" :key="i" class="letter">
        {{ letter === ' ' ? '\u00A0' : letter }}
      </span>
    </div>
    <div class="item item6 croix"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import gsap from 'gsap'
import TroiD from './PageComponents/TroiD.vue'
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'

const originalText = 'Creative Coder ~ Artist'
const glitchedText = ref(originalText)

const glitchChars = '!@#$%^&*()_+{}[]<>?/\\|~'
let glitchInterval = null

function glitchText(text, glitchCount = 5) {
  const chars = text.split('')
  const indices = []

  while (indices.length < glitchCount) {
    const randIndex = Math.floor(Math.random() * chars.length)
    if (!indices.includes(randIndex) && chars[randIndex] !== ' ') {
      indices.push(randIndex)
    }
  }

  const glitched = chars.map((char, i) =>
    indices.includes(i)
      ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
      : char
  )

  return glitched.join('')
}

const letters = computed(() => {
  return glitchedText.value.split('')
})

onMounted(() => {
  glitchInterval = setInterval(() => {
    glitchedText.value = glitchText(originalText, 3)
    setTimeout(() => {
      glitchedText.value = originalText
    }, 1000)
  }, 400)

  gsap.fromTo(
    '.letter',
    { y: 50, opacity: 0, rotationY: 180, transformOrigin: 'center' },
    {
      y: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.5,
    }
  )
})

onBeforeUnmount(() => {
  clearInterval(glitchInterval)
})
</script>

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
  font-size: clamp(6rem, 5vw + 1rem, 20rem);
  max-width: 90vw;
  backface-visibility: hidden;
}

.letter {
  display: inline-block;
  backface-visibility: hidden;
}

</style>

