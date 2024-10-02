<script setup>
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
</script>



<template>

  <FullScreenMenu />
  <div class="parentElement">

    <div class="graphOne">
      <div class="One">
        <h3 class="Title">Typo</h3>
        <a href="https://www.weltkern.com/shop/detail-typeface/burns" target="_blank"><p>TWKBurns</p></a>
        <a href="https://power-type.com/neue-power/" target="_blank"><p>NeuePowerTrial</p></a>
        <a href="https://velvetyne.fr/fonts/terminal-grotesque/" target="_blank"><p>Terminal_Grotesque</p></a>
      </div>

      <div class="Two">
        <h3 class="Title">Information</h3> 
        <p>E-mail : benoit.fage@icloud.com</p>
        <p>Phone : 06.18.96.31.78</p>
        <p>Location : FR</p>
      </div>
    </div>



    <div class="Three">
      <h3 class="Title">Curriculum Vitae</h3>
      <ul>
        <li>
          <p>DNSEP &nbsp; &nbsp; &nbsp; &nbsp; √  &nbsp; <span class="tt"> September 2023 to July 2025 </span>&nbsp; ¬ <a href="https://www.esadse.fr/en/home/" target="_blank">Saint-Etienne Higher School of Art and Design</a></p>
          <p>ERASMUS &nbsp; √ &nbsp; <span class="tt"> May 2023 to August 2023 </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ¬ <a href="https://hfg-karlsruhe.de/" target="_blank"> Hochschule für Gestaltung karlsruhe</a></p>
          <p>DNA &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; √ &nbsp; <span class="tt">October 2020 to July 2023 </span>&nbsp; &nbsp; &nbsp; &nbsp;¬ <a href="https://www.esadse.fr/en/home/" target="_blank">Saint-Etienne Higher School of Art and Design </a></p>
          <p>Prépa &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;√ &nbsp;<span class="tt">September 2019 to June 2020 </span>&nbsp;¬ Pass'art</p>
        </li>
      </ul>
    </div>




    <div class="graph">
      <div class="Four">
        <h3 class="Title">Tools</h3>
        <p class="Tools">Blender, Vuejs, Threejs, Vanillajs, Vercel, Onrender, Processing, Raylib, Inkscape, NeoVim, Pureref, Darktable, Arduino, CMake , Meshroom, and a lot of small personnal tools (new page coming son)
        </p>
      </div>

      <div class="Five">
        <h3 class="Title">CreativeProcess, Etitcs works</h3>
        <p class="fivet">

          Hello and thank you for reading these few lines to get to know me a little better, “both in my work and in my artistic practice” I like to play with experimentation and iteration, I like to go back and forth, try, take back, add, remove, modify, change until I get a satisfactory result.
I also have a strong ethical interest in all my work, especially environmental and human concerns. I'm passionate about experimental, light-hearted or more classic graphics, and thinking about how to interact with them to give them movement and life. 
My main medium is FrontEnd and creative programming in general, but I'm capable of doing any kind of 3D, and thinking about different kinds of physical or digital interaction. 
In short, I seem to have a rather versatile profile that doesn't close any door, always ready for new projects, passionate about programming and creativity, I'll always be able to meet a need.
          <br>
          <br>
            If you are interested, some manifesto I like : <a href="https://archive.org/stream/The_Conscience_of_a_Hacker/hackersmanifesto.txt" target="_blank">The Conscience of a Hacker</a>, <a href="https://kairos.technorhetoric.net/12.3/topoi/stolley/" target="_blank">The_Lofi_Declaration</a>, <a href="https://archive.org/details/GuerillaOpenAccessManifesto" target="_blank">Guerilla Open Access Manifesto</a>
        </p>
      </div>
    </div>

      <div class="Six">
        <h2 class="Title">Who am I ?</h2>
        <p class="pres">
        My name is Benoit, i'm a young digital Designer/Artist,  Passionate about computers in many senses of the word, I have used them to create different types of graphics .
        </p>
      </div>


  </div>
</template>




<style scoped>
@import './../../assets/SmallComponent.css';

.Title
{
  font-size: 2rem;
  font-family: TWKBurns-Light;
}

.tt
{
  font-family: TWKBurns-Light;
}

p
{
  font-size: 1.1rem;
  font-family: TWKBurns-Regular;
}

a
{
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
}

ul
{
  line-height: 0.2rem;
}

.graph
{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: normal;
  align-content: normal;
  margin-bottom: 10vh;
  margin-top: 5vh;
}

.graphOne
{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: normal;
  align-content: normal;
  width: 100%;
  margin-top: 10vh;
  line-height: 0.7rem;
}

.pres
{
  text-align: center;
}

.Tools
{
  text-align: justify;
}

.Two
{
  text-align: end;
}

.Four
{
  padding-right: 10%;
}

.Five
{
  text-align: end;
}

.fivet
{
  text-align: justify;
}

.Six
{
  text-align: center;
  width: 100%;
}



</style>

