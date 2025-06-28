<template>
  <div
    class="loading-screen"
    :style="{ backgroundColor: backgroundColor }"
  >
    <span :style="{ color: textColor }">{{ percentage }}/100</span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const percentage = ref(0)

const textColor = computed(() => {
  const c = Math.floor(255 * (1 - percentage.value / 100))
  return `rgb(${c},${c},${c})`
})

const backgroundColor = computed(() => {
  const c = Math.floor(255 * (percentage.value / 100))
  return `rgb(${c},${c},${c})`
})

onMounted(() => {
  let progress = 0
  const interval = setInterval(() => {
    progress++
    if (progress > 100) clearInterval(interval)
    else percentage.value = progress
  }, 30)
})
</script>

<style scoped>
@font-face {
  font-family: IBM;
  src: url(/public/font/IBMPlexSans-Bold.woff);
}

.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: 'IBM';
  user-select: none;
  transition: background-color 0.3s linear;
}

.loading-screen span {
  font-size: 20rem;
}

/* Media query pour mobile */
@media (max-width: 768px) {
  .loading-screen span {
    font-size: 5rem;
  }
}
</style>

