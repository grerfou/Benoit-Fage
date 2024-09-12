<!-- MenuButton.vue -->
<template>
  <button @click="toggleMenu" class="menu-button">
    Menu
  </button>
</template>

<script>
export default {
  name: "MenuButton",
  methods: {
    toggleMenu() {
      this.$emit("toggle-menu");
    }
  }
};
</script>

<style scoped>
.menu-button {
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>

