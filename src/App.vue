<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <div>
    <HelloWorld></HelloWorld>
    <HelloWorld></HelloWorld>
    <HelloWorld></HelloWorld>
    <HelloWorld></HelloWorld>
  </div>

</template>


<style scoped>

div {
  height: 100vh;
  width: 100vw
}


/*
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
*/
</style>
