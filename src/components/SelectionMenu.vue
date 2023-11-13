<template>
    <menu>
        <div id="arrows">
          <button @click="selectPage('left')" class="arrows-item">left</button>
          <h2 class="arrows-item">{{ pageName }}</h2>
          <h3 class="arrows-item">{{ currentPage }} / 4</h3>
          <button @click="selectPage('right')" class="arrows-item">right</button>
        </div>
  
        <div v-if="currentPage==='1'">
  
          <div class="selections">
            <div :class="{ 'options': true, }" @click="selectSoleColor('black')">
              <div :class="{ 'circles': true, 'selected-circle': selectedOption === 'black', 'black': true   }"></div>
              <p v-if="selectedOption==='black'">Black</p>
            </div>
            
            <div :class="{ 'options': true, }" @click="selectSoleColor('dark-red')">
              <div class="circles dark-red"></div>
              <p v-if="selectedOption==='dark-red'">Dark Red</p>
            </div>
            
            <div :class="{ 'options': true, }" @click="selectSoleColor('yellow')">
              <div class="circles yellow"></div>
              <p v-if="selectedOption==='yellow'">Yellow</p>
            </div>
            
            <div :class="{ 'options': true, }" @click="selectSoleColor('grey')">
              <div class="circles grey"></div>
              <p v-if="selectedOption==='grey'">Grey</p>
            </div>
          </div>
  
        </div>
  
        
    </menu>
</template>

<script>
    export default {
        name: 'Menu',
        data() {
            return {
                selectedOption: 'black',
                pageName: 'Sole',
                currentPage: '1',
                finalOptions: {
                shoeColorSole: null,
                shoeColorLaces: null,
                shoeColorPanelUp: null,
                shoeColorPanelDown: null,
                shoeColorMaterialUp: null,
                shoeColorMaterialDown: null,
                },
            };
            },
        methods: {
            selectSoleColor(color) {
                const previouslySelectedCircle = document.querySelector('.selected-circle');
                if (previouslySelectedCircle) {
                previouslySelectedCircle.classList.remove('selected-circle');
                }

                const newlySelectedCircle = document.querySelector(`.circles.${color}`);
                if (newlySelectedCircle) {
                newlySelectedCircle.classList.add('selected-circle');
                }  

                this.selectedOption = color;
                this.finalOptions.shoeColorSole = color;

                console.log('🌻', color);

            },
        },
    };
</script>

<style>

</style>
