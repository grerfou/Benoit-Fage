<template>
  <div>
    <!-- En-tête -->
    <div :class="['FlexContainer', { 'menu-open': isCircleExpanded }]">
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
          
          <li>
            <a href="#" @click.prevent="handleMenuLink('/')">
              <span v-for="(char, i) in 'Home'" :key="'home' + i" class="menu-letter">{{ char }}</span>
            </a>
          </li>

          <li>
            <a href="#" @click="scrollTo('home'); toggleMenu()">
              <span v-for="(char, i) in 'Work'" :key="'work' + i" class="menu-letter">{{ char }}</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="handleMenuLink('/contact')">
              <span v-for="(char, i) in 'About'" :key="'about me' + i" class="menu-letter">{{ char }}</span>
            </a>
          </li>
        </ul>
      </div>
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
        this.isMenuVisible = true;
        this.isContentVisible = false;
        this.isFadingOut = false;

        requestAnimationFrame(() => {
          this.isCircleExpanded = true;
        });

        setTimeout(() => {
          this.isContentVisible = true;
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
  transition: color 0.3s ease;
}
.flex-item {
  font-family: "test";
  font-weight: 500;
  transition: color 0.3s ease;
}

/* Quand menu ouvert → texte en blanc */
.FlexContainer.menu-open .flex-item {
  color: white;
}

.menu-button,
.menu-button-exit {
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-family: "test";
  font-size: 1rem;
  transition: color 0.3s ease;
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
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-start;
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
  z-index: 5;
  top: 0;
  right: 0;
  width: 80px;
  height: 80px;
  background-color: rgb(0, 0, 0);
  border-radius: 50%;
  transform-origin: center;
  transform: translate(50%, -50%) scale(0);
  transition: transform 0.3s ease-in-out;
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

