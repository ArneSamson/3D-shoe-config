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
          <div :class="{ 'options': true, }" @click="selectColor('black', 'sole')">
            <div :class="{ 'circles': true, 'selected-circle': selectedOption === 'black', 'black': true   }"></div>
            <p v-if="selectedOption==='black'">Black</p>
          </div>
          
          <div :class="{ 'options': true, }" @click="selectColor('dark-red', 'sole')">
            <div class="circles dark-red"></div>
            <p v-if="selectedOption==='dark-red'">Dark Red</p>
          </div>
          
          <div :class="{ 'options': true, }" @click="selectColor('yellow', 'sole')">
            <div class="circles yellow"></div>
            <p v-if="selectedOption==='yellow'">Yellow</p>
          </div>
          
          <div :class="{ 'options': true, }" @click="selectColor('grey', 'sole')">
            <div class="circles grey"></div>
            <p v-if="selectedOption==='grey'">Grey</p>
          </div>
        </div>

      </div>

      <div v-if="currentPage === '2'">

        <div class="selections">
          <div :class="{ 'options': true, }" @click="selectColor('black', 'laces')">
            <div :class="{ 'circles': true, 'selected-circle': selectedOption === 'black', 'black': true   }"></div>
            <p>Black</p>
          </div>
          
          <div :class="{ 'options': true, }" @click="selectColor('dark-red', 'laces')">
            <div class="circles dark-red"></div>
            <p>Dark Red</p>
          </div>
          
          <div :class="{ 'options': true, }" @click="selectColor('yellow', 'laces')">
            <div class="circles yellow"></div>
            <p>Yellow</p>
          </div>
          
          <div :class="{ 'options': true, }" @click="selectColor('grey', 'laces')">
            <div class="circles grey"></div>
            <p>Grey</p>
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
              shoeColorMaterialUp: null,
              shoeColorPanelDown: null,
              shoeColorMaterialDown: null,
            },
        };
        },
        methods: {

            selectColor(color, part) {
                let notConvertedColor = color;
                let convertedColor = null;

                switch(notConvertedColor)  {
                case 'black':
                    convertedColor = '#000';
                    break;
                case 'dark-red':
                    convertedColor = '#AC0202';
                    break;
                case 'yellow':
                    convertedColor = '#D6FF38';
                    break;
                case 'grey':
                    convertedColor = '#C9C9C9';
                    break;
                }

                switch(part) {
                    case 'sole':
                        this.assignColor(color);
                        this.finalOptions.shoeColorSole = convertedColor;
                    break;
                    case 'laces':
                        this.assignColor(color);
                        this.finalOptions.shoeColorLaces = convertedColor;
                    break;
                }

                console.log('💕', convertedColor);
                console.log('💕', part);

                console.log('💕', this.finalOptions);

            },

            assignColor(color) {
                const previouslySelectedCircle = document.querySelector('.selected-circle');
                if (previouslySelectedCircle) {
                previouslySelectedCircle.classList.remove('selected-circle');
                }

                const newlySelectedCircle = document.querySelector(`.circles.${color}`);
                if (newlySelectedCircle) {
                newlySelectedCircle.classList.add('selected-circle');
                }  

                this.selectedOption = color;
            },


            //page selection_______________________________________________________
            selectPage(direction) {
                if (direction === 'left') {
                if (this.currentPage !== '1') {
                    this.currentPage = (parseInt(this.currentPage) - 1).toString();
                } 
                } else {
                if (this.currentPage !== '4') {
                    this.currentPage = (parseInt(this.currentPage) + 1).toString();
                }
                };

                switch (this.currentPage){
                case '1':
                    this.pageName = 'Sole';
                    break;
                case '2':
                    this.pageName = 'Laces';
                    break;
                case '3':
                    this.pageName = 'Pannels';
                    break;
                case '4':
                    this.pageName = 'Upper';
                    break;
                }

            },
            //page selection_______________________________________________________
    },
  };
</script>

<style>
menu{
    margin: 0;
    padding: 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-color: #000;
    border-width: 2px 0 0 0;
    border-style: solid;
  }

  #arrows {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .arrows-item{
    padding-left: 20px;
    padding-right: 20px;
  }

  .shoe-desc{
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 43px;
    background-color: #D6FF38;
  }

  .selections{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    max-width: 500px;
  }
  .options{
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

  }
  .circles{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px 0;
    border: 2px solid #fff;
  }

  h1{
    color: #000;
    font-size: 1.5rem;
    margin: 0;
    font-family: 'cooper-black-std', serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.6px;
  }
  h2{
    color: #000;
    font-family: 'inter', sans-serif;
    font-size: 1§px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
  h3{
    color: #000;
    font-family: 'inter', sans-serif;
    font-size: 1§px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
  p{
    font-family: 'inter', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    color: #000;
  }

  button{
    color: #D6FF38;
    background-color: #000;
    margin: 43px;
    width: 300px;
    height: 68px;
    font-family: 'inter', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

  }

.selected-circle {
  border: 2px solid red; /* Apply red border for the selected circle */
}

.black {
  background-color: #000;
}

.dark-red {
  background-color: #AC0202;
}

.yellow {
  background-color: #D6FF38;
}

.grey {
  background-color: #C9C9C9;
}
</style>
