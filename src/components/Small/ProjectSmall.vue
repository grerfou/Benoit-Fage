
  
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
    
    <!-- Affichage de l'image principale du projet -->
    <img v-if="projectData && projectData.imageProject" class="imagePres" :src="projectData.imageProject" alt="Image pres"/> 
    <h3 v-if="projectData">{{ projectData.titre }}</h3>

    <!-- Informations supplémentaires sur le projet -->
    <div class="parent" v-if="projectData">
      <div>
        <h4>{ Tools }</h4>
        <p>{{ projectData.Tools || 'N/A' }}</p>
        
        <h4>{ Type }</h4>
        <p>{{ projectData.Type || 'N/A' }}</p>
      </div>

      <div>
        <h4>{ Date }</h4>
        <p>{{ projectData.Date || 'N/A' }}</p>
        
        <h4>{ State }</h4>
        <p>{{ projectData.State || 'N/A' }}</p>
      </div>
    </div>
    
    <!-- Affichage du texte de description du projet -->
    <p class="ExplainText" v-if="projectData">{{ projectData.text || 'No description available' }}</p>
    
    <!-- Affichage des images supplémentaires du projet -->
    <div class="ImgData" v-if="projectData" v-for="(item, index) in projectData.image" :key="index">
      <img :src="item.src" :id="item.id" :data-date="item.date" :data-description="item.description" alt="Project Image" />
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
  text-justify: auto
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
  padding-right: 50%;
  text-align: justify;
}

h3
{
  font-family: 'NeuePowerTrial-Regular';
  color: black;
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
  color: black;
}

</style>
