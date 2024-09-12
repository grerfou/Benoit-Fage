<!-- FullScreenMenuComponent.vue -->
<template>
  <div>
    <!-- Conteneur flexible pour l'en-tête -->
    <div class="FlexContainer">
      <div class="flex-item">BF</div>
      <div class="flex-item">benoit fage</div>
      <!-- Bouton pour ouvrir/fermer le menu -->
      <div class="flex-item">
        <button @click="toggleMenu" :class="buttonClass" >{{ buttonText }}</button>
      </div>
    </div>
    
    <!-- Menu plein écran -->
    <div v-if="isMenuOpen" class="full-screen-menu">
      <div class="menu-content">
        <!-- Contenu du menu -->
        <ul>
          <li><a href="#section1">Works</a></li>
          <li><a href="#section2">About</a></li>
          <li><a href="#section3">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullScreenMenuComponent",
  data() {
    return {
      isMenuOpen: false, // État pour gérer l'ouverture et la fermeture du menu
    };
  },
  computed: {
    buttonText() {
      return this.isMenuOpen ? 'Exit' : 'Menu'; // Change le texte en fonction de l'état
    },
    buttonClass() {
      return this.isMenuOpen ? 'menu-button-exit' : 'menu-button'; // Change la classe en fonction de l'état
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Inverse l'état pour ouvrir/fermer le menu
    },
  },
};
</script>


<style scoped>

@font-face {
    font-family: 'Terminal_Grotesque';
    src: url('/public/font/terminal-grotesque.ttf');
}

ul
{
  list-style-type: none;
}

a
{
  color: rgba(255, 255, 255, 1);
}

/* Style du conteneur flexible */
.FlexContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000; /* Priorité au-dessus du contenu */
}


/* Style pour le bouton de menu */
.menu-button {
  color: Black;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.0);
}

/* Style pour le bouton de menu lorsque le menu est ouvert */
.menu-button-exit {
  color: White;
  border: none;
  background-color: rgba(0, 0, 0, 0.0);
  cursor: pointer;
}


/* Style pour le menu plein écran */
.full-screen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 999;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: normal;
}

/* Style pour le contenu du menu */
.menu-content {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  padding-bottom: 7vh;
  font-size: 4rem;
  font-family: "Terminal_Grotesque";
}

</style>

