<script setup>
import FullScreenMenu from './PageComponents/FullScreenMenu.vue'
</script>



<template>

  <FullScreenMenu />
  <div class="parentElement">


    <div>
      <h3 class="Title">Typo</h3>
      <p>TWKBurns-Regular</p>
      <p>TWKBurns-Light</p>
      <p>NeuePowerTrial-Regular</p>
      <p>Terminal_Grotesque</p>
    </div>

    <div>
      <h3 class="Title">Information</h3> 
      <p>E-mail : benoit.fage@icloud.com</p>
      <p>Location : FR</p>
    </div>

    <div>
      <h3 class="Title">Curriculum Vitae</h3>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
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
        My name is Benoit, Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
      </p>
    </div>

  </div>
</template>



<script>
export default {
  name: 'LargeComponent'
};
</script>



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

</style>

