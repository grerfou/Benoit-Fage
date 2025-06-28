<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import TroiD from './PageComponents/TroiD.vue'
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'

const originalText = 'Creative Coder  ~  Artist'
const glitchChars = '!@#$%^&*()_+{}[]<>?/\\|~'

const words = originalText.split(' ')
const glitchedWords = ref(words.map(word => word.split('')))

function glitchText(word, glitchCount = 2) {
  const chars = [...word]
  const indices = []

  while (indices.length < glitchCount && indices.length < chars.length) {
    const randIndex = Math.floor(Math.random() * chars.length)
    if (!indices.includes(randIndex) && chars[randIndex] !== ' ') {
      indices.push(randIndex)
    }
  }

  return chars.map((char, i) =>
    indices.includes(i) ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
  )
}

let glitchInterval = null

onMounted(async () => {
  glitchInterval = setInterval(() => {
    glitchedWords.value = glitchedWords.value.map(word => glitchText(word, 2))
    setTimeout(() => {
      glitchedWords.value = words.map(word => word.split(''))
    }, 200)
  }, 900)

  await nextTick()

  gsap.fromTo(
    '.letter',
    {
      x: -100,
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
      <span class="word" v-for="(word, wIndex) in glitchedWords" :key="wIndex">
        <span class="letter" v-for="(char, cIndex) in word" :key="cIndex">{{ char }}</span>
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
  gap: 0.3em;
}

.word {
  white-space: nowrap; /* Empêche la coupure des mots */
  display: inline-flex;
  gap: 0.05em;
}

.letter {
  display: inline-block;
  backface-visibility: hidden;
  min-width: 0.5ch;
}
</style>

