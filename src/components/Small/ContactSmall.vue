<script setup>
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
</script>



<template>

  <FullScreenMenu />
  <div class="parentElement">


    <div class="marg">
      <h3 class="Title">Typo</h3>
        <a href="https://www.weltkern.com/shop/detail-typeface/burns"><p>TWKBurns</p></a>
        <a href="https://power-type.com/neue-power/"><p>NeuePowerTrial</p></a>
        <a href="https://velvetyne.fr/fonts/terminal-grotesque/"><p>Terminal_Grotesque</p></a>

    </div>

    <div class="inf">
      <h3 class="Title">Information</h3> 
      <p>E-mail : benoit.fage@icloud.com</p>
      <p>Phone : +33 6.18.96.31.98</p>
      <p>Location : FR</p>
    </div>

    <div>
      <h3 class="Title">Curriculum Vitae</h3>
      <ul>
        <li>
          <p>DNSEP &nbsp; &nbsp; &nbsp; &nbsp; √  &nbsp; <span class="tt"> September 2023 to July 2025 </span>&nbsp; ¬ <a href="https://www.esadse.fr/en/home/">Saint-Etienne Higher School of Art and Design</a></p>
          <p>ERASMUS &nbsp; √ &nbsp; <span class="tt"> May 2023 to August 2023 </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ¬ <a href="https://hfg-karlsruhe.de/"> Hochschule für Gestaltung karlsruhe</a></p>
          <p>DNA &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; √ &nbsp; <span class="tt">October 2020 to July 2023 </span>&nbsp; &nbsp; &nbsp; &nbsp;¬ <a href="https://www.esadse.fr/en/home/">Saint-Etienne Higher School of Art and Design </a></p>
          <p>Prépa &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;√ &nbsp;<span class="tt">September 2019 to June 2020 </span>&nbsp;¬ Pass'art</p>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="Title">Tools</h3>
      <p>Blender, Vuejs, Threejs, Vanillajs, Vercel, Onrender, Processing, Raylib, Inkscape, NeoVim, Pureref, Darktable, Arduino, CMake , Meshroom, and a lot of small personnal tools (new page coming son)</p>
    </div>

    <div>
      <h3 class="Title">CreativeProcess, Etitcs works</h3>
        <p class="fivet">

          Hello and thank you for reading these few lines to get to know me a little better, “both in my work and in my artistic practice” I like to play with experimentation and iteration, I like to go back and forth, try, take back, add, remove, modify, change until I get a satisfactory result.
I also have a strong ethical interest in all my work, especially environmental and human concerns. I'm passionate about experimental, light-hearted or more classic graphics, and thinking about how to interact with them to give them movement and life. 
My main medium is FrontEnd and creative programming in general, but I'm capable of doing any kind of 3D, and thinking about different kinds of physical or digital interaction. 
In short, I seem to have a rather versatile profile that doesn't close any door, always ready for new projects, passionate about programming and creativity, I'll always be able to meet a need.
          <br>
          <br>
            If you are interested, some manifesto I like : <br><a href="https://archive.org/stream/The_Conscience_of_a_Hacker/hackersmanifesto.txt" target="_blank">The Conscience of a Hacker</a>,<br> <a href="https://kairos.technorhetoric.net/12.3/topoi/stolley/" target="_blank">The_Lofi_Declaration</a>,<br> <a href="https://archive.org/details/GuerillaOpenAccessManifesto" target="_blank">Guerilla Open Access Manifesto</a>
        </p>
    </div>

    <div>
      <h2 class="Title">Who am I ?</h2>
      <p>
        My name is Benoit, i'm a young digital Designer/Artist,  Passionate about computers in many senses of the word, I have used them to create different types of graphics .
      </p>
    </div>

  </div>
</template>




<style scoped>
@import './../../assets/SmallComponent.css';

.Title
{
  font-family: TWKBurns-Light;
}

.fivet
{
  text-align: justify;
}

p
{
  font-size: 0.9rem;
  font-family: TWKBurns-Regular;
}

a
{
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
}

.inf
{
  line-height: 0.5rem;
}


.marg
{
  margin: 0;
  padding: 0;
  line-height: 0.5rem; 
}

</style>

