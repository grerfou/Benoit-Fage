<script setup >
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import FullScreenMenu from './PageComponents/FullScreenMenu.vue';

const projectData = ref(null);
const route = useRoute();
const projectId = route.params.id;

async function fetchProjectData() {
  try {
    const response = await fetch('/projects.json'); // Chemin vers le fichier JSON
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    projectData.value = data.find(p => p.id === projectId) || {
      imageProject: '',
      titre: 'Project not found',
      Tools: 'N/A',
      Type: [],
      Date: 'N/A',
      State: 'N/A',
      image: [],
      text: 'Project not found'
    };
  } catch (error) {
    console.error('Erreur lors du chargement des données JSON:', error);
    projectData.value = {
      imageProject: '',
      titre: 'Error',
      Tools: 'N/A',
      Type: 'N/A',
      Date: 'N/A',
      State: 'N/A',
      image: [],
      text: 'Error loading project data'
    };
  }
}

onMounted(() => {
  fetchProjectData();
});

</script>

<template>

    <div>
    <nav class="FlexContainer">
      <div class="flex-item">Benoit Fage</div>
        <div class="menu">
            <span @click="scrollTo('home')">Home/</span>
            <span @click="scrollTo('work')">Work/</span>
            <span @click="scrollTo('contact')">Contact/</span>
        </div>
       </nav>

        <section id="home" class="section">
            <HomeSmall />
        </section>

        <section id="work" class="section">
            <WorkSmall />
        </section>

        <section id="contact" class="section">
            <ContactSmall />
        </section>
    </div>


  <div class="parentElement">

    <!--
    <div class="nav">
      <span><router-link to="/work" @click.native="toggleMenu">«</router-link></span>
    </div>
    -->
    
    <!-- Affichage de l'image principale du projet -->
    <img v-if="projectData && projectData.imageProject" class="imagePres" :src="projectData.imageProject" alt="Image pres"/> 
    <h3 v-if="projectData">{{ projectData.titre }}</h3>

    <!-- Informations supplémentaires sur le projet -->
    <div class="parent" v-if="projectData">
      <div>
        <h4>Tools</h4>
        <p>{{ projectData.Tools || 'N/A' }}</p>
        
        <h4>Type</h4>
        <p>{{ projectData.Type || 'N/A' }}</p>
      </div>

      <div>
        <h4>Date</h4>
        <p>{{ projectData.Date || 'N/A' }}</p>
        
        <h4>State</h4>
        <p>{{ projectData.State || 'N/A' }}</p>
      </div>
    </div>
    
    <!-- Affichage du texte de description du projet -->
    <p class="ExplainText" v-if="projectData">{{ projectData.text || 'No description available' }}</p>
    


    <div v-if="projectData">
      <div class="ImgData" v-for="(item, index) in projectData.image" :key="index">
        <!-- Si l'élément est une image -->
        <img v-if="item.type === 'image'" :src="item.src" :id="item.id" :data-date="item.date" :data-description="item.description" alt="Project Image" />
        
        <!-- Si l'élément est une vidéo -->
        <video id="video" v-else-if="item.type === 'video'" controls :id="item.id" :data-date="item.date" :data-description="item.description">
          <source :src="item.src" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>


  </div>

</template>
  
<style scoped>

.FlexContainer {
  font-size: 1rem;
  font-family: 'test';
  display: flex;
  justify-content: space-between;
  position: fixed; /* ✅ La nav reste visible même pendant le scroll */
  z-index: 1100;
  width: 100vw;
  top: 0;
  background-color: white;
  box-sizing: border-box;
}

.flex-item {
  font-family: "test";
  font-weight: 500;
}

.section {
  width: 100vw;
  margin-top: 1rem;
}

.parentElement
{
  display: flex;
  flex-direction: column;
  height: 87vh;
  margin-top: 0.5vh;

  /*
  padding-left: 3vh;
  padding-right: 3vh;

  */

  padding-bottom: 6vh;
  border: 1px solid black;
  font-weight: 900;
  overflow: auto;
  text-justify: auto
}

.nav {
  position: sticky;
  top: 0;
  background-color: none; /* ou autre, pour éviter que ça devienne transparent au scroll */
  z-index: 10; /* pour qu'elle reste au-dessus du contenu */
  padding-left: 1%;
  padding-right: 1%;
  padding-bottom: 1vh;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}


.parent
{
  margin: 0;
  padding-left: 5%;
  padding-right: 5%;
  display: grid;
	grid-template-rows: repeat(2, 100%);
	grid-template-columns: repeat(2, 1fr);
	gap: 0px;
}

.ImgData
{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1%;
}

.ExplainText
{
  margin-top: 5vh;
  margin-bottom: 20%;
  text-align: justify;
  padding-left: 5%;
  padding-right: 5%;
}

span{
  font-size: 2rem;
}

h3
{
  font-family: 'NeuePowerTrial-Regular';
  color: black;
  padding-left: 5%;
}

h4
{
  margin: 0;
  padding: 0;
  margin-top: 20%;
  margin-bottom: 5%;
  font-family: 'TWKBurns-Light';
}

p
{
  margin: 0;
  padding: 0;
  font-family: 'TWKBurns-Regular';
  font-size: small;
  font-weight: lighter;
}

a
{
  text-decoration: none;
  color: rgb(5, 74, 218);
}

</style>
