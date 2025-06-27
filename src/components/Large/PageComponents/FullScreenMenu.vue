<template>
  <div>
    <!-- En-tête -->
    <div class="FlexContainer">
      <div class="flex-item">∫¬√</div>
      <div class="flex-item">Benoit Fage</div>
      <div class="flex-item">
        <button @click="toggleMenu" :class="buttonClass">{{ buttonText }}</button>
      </div>
    </div>

    <!-- Menu plein écran -->
    <div v-if="isMenuVisible" class="full-screen-menu">
      <div
        class="menu-content"
        v-show="isContentVisible"
        :class="{ 'fade-out': isFadingOut }"
      >
        <ul>
          <li><router-link to="/" @click.native="toggleMenu">Home</router-link></li>
          <li><router-link to="/work" @click.native="toggleMenu">Work</router-link></li>
          <li><router-link to="/contact" @click.native="toggleMenu">About</router-link></li>
        </ul>
      </div>
    </div>

    <!-- Cercle qui se dilate -->
    <div
      ref="circle"
      class="circle-expand"
      :class="{ 'circle-expand-active': isCircleExpanded }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "FullScreenMenuComponent",
  data() {
    return {
      isMenuVisible: false,        // Affichage du menu
      isContentVisible: false,     // Affichage du menu-content
      isCircleExpanded: false,     // Expansion du cercle
      isFadingOut: false           // Transition de sortie du contenu
    };
  },
  computed: {
    buttonText() {
      return this.isCircleExpanded ? "Exit" : "Menu";
    },
    buttonClass() {
      return this.isCircleExpanded ? "menu-button-exit" : "menu-button";
    }
  },
  methods: {
    toggleMenu() {
      if (!this.isCircleExpanded) {
        // OUVERTURE
        this.isMenuVisible = true;
        this.isContentVisible = false;
        this.isFadingOut = false;

        // Expand le cercle puis affiche le contenu
        requestAnimationFrame(() => {
          this.isCircleExpanded = true;
        });

        setTimeout(() => {
          this.isContentVisible = true;
        }, 400); // attendre que le cercle ait bien commencé à s’ouvrir

      } else {
        // FERMETURE
        this.isFadingOut = true;
        this.isContentVisible = false;

        setTimeout(() => {
          this.isCircleExpanded = false;
        }, 300); // après disparition du contenu

        setTimeout(() => {
          this.isMenuVisible = false;
          this.isFadingOut = false;
        }, 900); // après fermeture complète du cercle
      }
    }
  }
};
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

/* Liens */
a {
  text-decoration: none;
  color: white;
}

li {
  list-style: none;
}


/* En-tête */
.FlexContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1100;
}
.flex-item {
  font-family: "test";
  font-weight: 500;
}
.menu-button,
.menu-button-exit {
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-family: "test";
  font-size: 1rem;
}
.menu-button {
  color: black;
}
.menu-button-exit {
  color: white;
}

/* Menu plein écran */
.full-screen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 2rem;
  padding-bottom: 7vh;
  font-size: 4rem;
  font-family: "Terminal_Grotesque";
  overflow: hidden;
}

/* Contenu du menu */
.menu-content {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}
.fade-out {
  opacity: 0;
}

/* Cercle animé */
.circle-expand {
  position: fixed;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  transform-origin: center;
  transform: translate(50%, -50%) scale(0);
  transition: transform 0.3s ease-in-out;
  z-index: -1;
  pointer-events: none;
}
.circle-expand-active {
  transform: translate(50%, -50%) scale(100);
}
</style>

