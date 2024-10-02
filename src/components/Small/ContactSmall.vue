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
      <p>Phone : 06.18.96.98</p>
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
      <p>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis. <br> <br>
        If you are interested, some manifesto I like : one, to, three, four 
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

