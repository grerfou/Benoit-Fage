<template>
  <div>
    <!-- En-tête -->
    <div class="FlexContainer">
      <div class="flex-item">∫¬√</div>
      <div class="flex-item">Benoit Fage</div>
      <div class="flex-item">
        <a href="#" @click.prevent="handleMenuLink('/')">Home, </a>
        <a href="#" @click.prevent="handleMenuLink('/Work')">Work, </a>
        <a href="#" @click.prevent="handleMenuLink('/contact')">About</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullScreenMenuComponent",
  methods: {
    handleMenuLink(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
/* Fonts */
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

/* Base */
a {
  text-decoration: none;
  cursor: pointer;
  color: black;
}

/* En-tête */
.FlexContainer {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1100;
}
.flex-item {
  font-family: "test";
  font-weight: 500;
}
</style>

