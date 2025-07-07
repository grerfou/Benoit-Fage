<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TroiD from './PageComponents/TroiD.vue'

gsap.registerPlugin(ScrollTrigger)

const originalText = 'CreativeCoder~Artist'
const glitchChars = '!@#$%^&*()_+{}[]<>?/\\|~'
const glitchedText = ref(originalText.split(''))

// Couleurs différentes pour chaque lettre
const colors = [
  '#c03f13' 
]

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
    indices.includes(i)
      ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
      : char
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

  const letters = document.querySelectorAll('.letter')

  gsap.fromTo(
    letters,
    { x: 0, opacity: 0, filter: 'blur(3px)', rotateY: 90 },
    {
      x: 0,
      opacity: 1,
      filter: 'blur(0.5px)',
      rotateY: 0,
      ease: 'back.out(1.7)',
      duration: 1.2,
      stagger: 0.05,
      onComplete: () => {
        gsap.to(letters, {
          scrollTrigger: {
            trigger: '.parentElement',
            start: 'top top',
            end: 'bottom 80%',
            end: '+=500',
            pin: true,
            scrub: true,
          },
          x: -50,
          opacity: 0,
          stagger: 0.95,
          ease: 'none',
        })
      },
    }
  )
})

onBeforeUnmount(() => {
  clearInterval(glitchInterval)
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <TroiD :modelDisplayTime="3000" />

  <div class="parentElement animated-border">
    <div class="glitch-title">
      <span 
        v-for="(char, index) in glitchedText" 
        :key="index" 
        class="letter"
      >
        {{ char }}
      </span>
    </div>

    <div class="filler-content" />
  </div>
</template>

<style scoped>

.parentElement {
  position: relative;
  height: 100vh;
  margin-top: 1rem;
}

.glitch-title {
  top: 0;
  left: 0;
  width: 100%;
  max-width: 90vw;               /* ✅ limite largeur sur petits écrans */
  margin: 0 auto;                /* ✅ centre le texte */
  padding-top: 9rem;
  background-color: transparent;
  z-index: 10;

  display: flex;
  flex-wrap: wrap;              /* ✅ autorise les retours à la ligne */
  justify-content: center;
  text-align: center;

  font-family: 'Terminal_Grotesque', monospace;
  font-size: clamp(3rem, 5vw + 1rem, 10rem);
  pointer-events: none;
  word-break: break-word;
}


.letter {
  display: inline-block;
  backface-visibility: hidden;
  min-width: 0.5ch;
  padding: 0 0.15em;
  border-radius: 0.1em;
  color: black;
}

</style>


