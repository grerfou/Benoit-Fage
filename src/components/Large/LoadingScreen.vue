<template>
  <div
    class="loading-screen"
    :style="{ backgroundColor: backgroundColor }"
  >
    <span :style="{ color: textColor }">{{ percentage }}/100</span>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const percentage = ref(0);

const textColor = computed(() => {
  // Du blanc au noir en fonction du % (inverse du fond)
  const c = Math.floor(255 * (1 - percentage.value / 100));
  return `rgb(${c},${c},${c})`;
});

const backgroundColor = computed(() => {
  // Du noir au blanc en fonction du %
  const c = Math.floor(255 * (percentage.value / 100));
  return `rgb(${c},${c},${c})`;
});

onMounted(() => {
  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    if (progress > 100) clearInterval(interval);
    else percentage.value = progress;
  }, 30);
});
</script>

<style scoped>


@font-face {
  font-family: IBM;
  src: url(/public/font/IBMPlexSans-Bold.woff);
}


.loading-screen {
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20rem;
  font-weight: bold;
  font-family: 'IBM';
  user-select: none;
  transition: background-color 0.3s linear;
}
</style>

