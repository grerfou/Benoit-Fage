<template>
  <div>
    <!-- En-tête -->
    <div class="FlexContainer">
      <div class="flex-item">∫¬√</div>
      <div class="flex-item">Benoit Fage</div>

      <div class="flex-item">
        <a href="#" @click.prevent="handleMenuLink('/')">
                <span>Home, </span>
        </a>
        <a href="#" @click.prevent="handleMenuLink('/Work')">
                <span>Work, </span>
        </a>
        <a href="#" @click.prevent="handleMenuLink('/contact')">
                <span>About</span>
        </a>
      </div>



      <!--
      <div class="flex-item">
        <button @click="toggleMenu" :class="buttonClass">{{ buttonText }}</button>
      </div>
      -->


    </div>

    <!-- Cercle animé -->
    <div
      ref="circle"
      class="circle-expand"
      :class="{ 'circle-expand-active': isCircleExpanded }"
    ></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: "FullScreenMenuComponent",
  data() {
    return {
      isMenuVisible: false,
      isContentVisible: false,
      isCircleExpanded: false,
      isFadingOut: false
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
        // ▶️ OUVERTURE
        this.isMenuVisible = true;
        this.isContentVisible = false;
        this.isFadingOut = false;

        requestAnimationFrame(() => {
          this.isCircleExpanded = true;
        });

        setTimeout(() => {
          this.isContentVisible = true;

          // GSAP entrée
          gsap.fromTo('.menu-letter', {
            y: -40,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.4,
            ease: 'power2.out'
          });
        }, 400);
      } else {
        this.closeMenu();
      }
    },

    closeMenu(callback) {
      this.isFadingOut = true;

      gsap.to('.menu-letter', {
        y: -30,
        opacity: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: 'power1.in',
        onComplete: () => {
          this.isContentVisible = false;
          setTimeout(() => {
            this.isCircleExpanded = false;
          }, 200);
          setTimeout(() => {
            this.isMenuVisible = false;
            this.isFadingOut = false;
            if (callback) callback();
          }, 600);
        }
      });
    },

    handleMenuLink(path) {
      this.closeMenu(() => {
        this.$router.push(path);
      });
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
}
li {
  list-style: none;
}
span{
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

/* Menu */
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

.menu-content {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}
.fade-out {
  opacity: 0;
}

/* Cercle */
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

/* Animation lettre par lettre */
.menu-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(-30px);
}
</style>

