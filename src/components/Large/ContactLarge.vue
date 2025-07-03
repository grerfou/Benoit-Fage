<script setup>
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

onMounted(() => {
  const elements = gsap.utils.toArray('.scramble')

  elements.forEach(el => {
    let originalText = el.getAttribute('data-text') || ''
    // Remplace \n par <br> pour HTML
    const htmlText = originalText.replace(/\\n/g, '<br>')

    // Vide le contenu avant animation
    el.innerHTML = ''

    gsap.fromTo(
      el,
      { text: { value: '', innerHTML: true, scrambleText: true } },
      {
        text: {
          value: htmlText,
          delimiter: '',
          innerHTML: true,
          scrambleText: {
            chars: '!@#%&_-+=?<>',
            speed: 0.9,
            revealDelay: 0.9,
            tweenLength: false,
          },
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        duration: 4,
        ease: 'power2.out',
      }
    )
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="container">

    <h3 class="Title scramble" data-text="CreativeProcess, Etitcs works"></h3>

    <p class="scramble" data-text="Hello and thank you for reading these few lines to get to know me a little better, “both in my work and in my artistic practice” I like to play with experimentation and iteration, I like to go back and forth, try, take back, add, remove, modify, change until I get a satisfactory result. I also have a strong ethical interest in all my work, especially environmental and human concerns. I'm passionate about experimental, light-hearted or more classic graphics, and thinking about how to interact with them to give them movement and life. My main medium is FrontEnd and creative programming in general, but I'm capable of doing any kind of 3D, and thinking about different kinds of physical or digital interaction. In short, I seem to have a rather versatile profile that doesn't close any door, always ready for new projects, passionate about programming and creativity, I'll always be able to meet a need.\nIf you are interested, some manifesto I like :&lt;a href=&quot;https://archive.org/stream/The_Conscience_of_a_Hacker/hackersmanifesto.txt&quot; target=&quot;_blank&quot;&gt;The Conscience of a Hacker&lt;/a&gt;,&lt;br&gt;&lt;a href=&quot;https://kairos.technorhetoric.net/12.3/topoi/stolley/&quot; target=&quot;_blank&quot;&gt;The_Lofi_Declaration&lt;/a&gt;,&lt;br&gt;&lt;a href=&quot;https://archive.org/details/GuerillaOpenAccessManifesto&quot; target=&quot;_blank&quot;&gt;Guerilla Open Access Manifesto&lt;/a&gt;"></p>

    <h3 class="Title scramble" data-text="Tools"></h3>
    <p class="scramble" data-text="Blender, Vuejs, Threejs, Vanillajs, Vercel, Onrender, Processing, C/C++, Raylib, Inkscape, NeoVim, Pureref, Darktable, Arduino, CMake , Meshroom, Strapi, and a lot of small personnal tools (new page coming son)"></p>

    <h3 class="Title scramble" data-text="Curriculum Vitae"></h3>
    <p class="scramble" data-text="DNSEP √ 2023–2025 ¬ ESADSE\nERASMUS √ 2023 ¬ HfG Karlsruhe\nDNA √ 2020–2023 ¬ ESADSE\nPrépa √ 2019–2020 ¬ Pass'art"></p>

    <h3 class="Title scramble" data-text="Information"></h3>
    <p class="scramble" data-text="E-mail : &lt;a href=&quot;mailto:benoit.fage@icloud.com&quot;&gt;benoit.fage@icloud.com&lt;/a&gt;\nPhone : +33 6.18.96.31.98\nLocation : FR"></p>

  </div>
</template>

<style scoped>
@font-face {
  font-family: "test";
  src: url("/public/font/IBMPlexSans-LightItalic.ttf");
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.container {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  height: 100%;
  padding: 3rem;
  white-space: normal;
}

.scramble {
  white-space: normal;
}

/* Style pour les liens dans le contenu animé */
:deep(a) {
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
}

:deep(a):hover {
  text-decoration: underline;
}

.Title {
  font-size: 2rem;
  font-family: 'test';
}

p {
  font-size: 1.1rem;
  font-family: 'test';
}
</style>

