<template>
    <div class="models-container">
      <h1 id="ourmodels" class="models-container__title">Our models</h1>
      <div class="model flex">
        <div>
          <div class="canvas-container" ref="canvasContainer1"></div>
        </div>
        <div>
          <h1 class="model__name">AIR REV. NITRO S</h1>
          <h2 class="model__type">Custom shoes</h2>
          <p class="model__price">€200,00</p>
          <div class="model__buttons buttons">
            <button>
              <router-link to="/customize" class="buttons__link"
                >CUSTOMIZE</router-link
              >
            </button>
          </div>
        </div>
      </div>
  
      <div class="model flex">
        <div>
          <div class="canvas-container" ref="canvasContainer2"></div>
        </div>
        <div>
          <h1 class="model__name">AIR REV. XTRA</h1>
          <h2 class="model__type">Custom shoes</h2>
          <p class="model__price">€180,00</p>
          <div class="model__buttons buttons">
            <button>
              <router-link to="/config2" class="buttons__link"
                >CUSTOMIZE</router-link
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  </script>
  
  <style scoped>
  .models-container {
    background-color: #242424;
  }
  
  a {
    text-decoration: none;
    color: #d6ff38;
  }
  
  .models-container__title {
    font-family: "cooper-black-std", serif;
    font-weight: 400;
    color: white;
    font-size: 36px;
    letter-spacing: 1.08px;
    line-height: normal;
    margin: 0;
    padding-top: 50px;
    margin-left: 50px;
  }
  
  .model {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100vw;
  }
  
  img {
    width: 25vw;
  }
  
  .model__name,
  .model__type,
  .model__price {
    font-family: "cooper-black-std", serif;
    font-weight: 400;
    color: white;
  }
  
  .model__name {
    font-size: 36px;
    letter-spacing: 1.08px;
    line-height: normal;
    margin: 0;
  }
  
  .model__type {
    font-size: 20px;
    letter-spacing: 0.72px;
    line-height: normal;
    white-space: nowrap;
    margin: 0;
  }
  
  .model__price,
  p {
    font-family: "basic-sans", sans-serif;
    font-weight: 400;
    color: white;
    font-size: 16px;
    letter-spacing: 0;
    line-height: normal;
    white-space: nowrap;
  }
  
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  button {
    width: 299px;
    height: 36px;
    top: 0;
    left: 0;
    background-color: #000000;
    font-family: "basic-sans", sans-serif;
    font-weight: 700;
    color: #d6ff38;
    font-size: 14px;
    letter-spacing: 1.61px;
    line-height: normal;
  }
  
  .buttons__link {
    text-decoration: none;
    color: #d6ff38;
  }
  
  @media (max-width: 800px) {
    .models-container__title {
      font-size: 30px;
      margin: 0;
      padding-top: 25px;
      margin-left: 25px;
      margin-bottom: 50px;
    }
  
    .model {
      flex-wrap: wrap;
      width: 90vw;
      justify-content: left;
      margin-left: 25px;
    }
  
    .model__name {
      font-size: 24px;
    }
    button {
      margin-bottom: 50px;
    }
  }
  
  @media (max-width: 400px) {
    .models-container__title {
      font-size: 24px;
      padding-top: 20px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
  
    .model__name {
      font-size: 20px;
    }
  
    .model__type {
      font-size: 16px;
    }
  
    .model__price,
    p {
      font-size: 16px;
    }
  
    button {
      width: 150px;
      font-size: 12px;
      margin-bottom: 50px;
    }
  }
  </style>
  