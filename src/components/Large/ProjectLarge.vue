
  
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

<FullScreenMenu />
  <div class="parentElement">

    <div class="nav">
      <h3><router-link to="/work" @click.native="toggleMenu">«</router-link></h3>
    </div>

    <div>
      <h3 class="titles" v-if="projectData">{{ projectData.titre }}</h3>
    </div>
       
    <!-- Informations supplémentaires sur le projet -->
    <div class="parent" v-if="projectData">

      <div class= "item">
        <h4>{ Tools }</h4>
        <p>{{ projectData.Tools || 'N/A' }}</p>
        
        <h4>{ Type }</h4>
        <p>{{ projectData.Type || 'N/A' }}</p>
      </div>

      <div class="item graph">
        <h4>{ Date }</h4>
        <p>{{ projectData.Date || 'N/A' }}</p>
        
        <h4>{ State }</h4>
        <p>{{ projectData.State || 'N/A' }}</p>
      </div>

      <p class="ExplainText" v-if="projectData">{{ projectData.text || 'No description available' }}</p>

    </div>



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

.parentElement
{
  display: flex;
  flex-direction: column;
  height: 87vh;
  margin-top: 0.5vh;
  padding-left: 3vh;
  padding-right: 3vh;
  padding-bottom: 6vh;
  border: 1px solid black;
  font-weight: 900;
  overflow: auto;
  text-justify: auto;
  gap: 10px
}

.graph
{
  text-align: end;
}

.nav
{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}

.parent
{
  margin: 0;
  padding: 0;
  display: grid;
	grid-template-columns: 25% 50% 1fr;
  justify-content: space-between;
  margin-bottom: 20vh;
}


.titles
{
  padding: 1%;
  margin-bottom: 10vh;
  font-size: 6.5rem;
}

.pres
{
  max-width: 100%;
  height: 100%;
}

.item
{
  font-size: 1.2rem;
  justify-self: center;
}

.ImgData
{
  display: flex;
  flex-direction: column;
}

.ExplainText
{
  margin-bottom: 20%;
  padding-left: 25%;
  text-align: justify;
}

h3
{
  margin: 0;
  padding: 0;
  font-family: 'NeuePowerTrial-Regular';
  color: black;
}

h4
{
  font-family: 'TWKBurns-Light';
}

p
{
  padding: 0;
  font-family: 'TWKBurns-Regular';
  font-size: small;
  font-weight: lighter;
}

a
{
  margin: 0;
  padding: 0;
  font-size: 3rem;
  text-decoration: none;
  color: black;
}

</style>

