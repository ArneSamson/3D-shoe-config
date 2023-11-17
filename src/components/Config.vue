<template>
  <div>
    <div class="canvas-container" ref="canvasContainer"></div>

    <div id="configurator">
      <div id="lacecolor">
        <p class="subtitle">Laces color</p>
        <div :class="{ options: true }" @click="updateColorLaces('#FFFF00')">
          <div
            :class="{
              circles: true,
              yellow: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorLaces('#FF0000')">
          <div
            :class="{
              circles: true,
              red: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorLaces('#FFC0CB')">
          <div
            :class="{
              circles: true,
              black: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorLaces('#C9C9C9')">
          <div
            :class="{
              circles: true,
              grey: true,
            }"
          ></div>
        </div>
      </div>

      <div id="solecolor">
        <p class="subtitle">Sole color</p>
        <div :class="{ options: true }" @click="updateColorSole('#FFFF00')">
          <div
            :class="{
              circles: true,
              yellow: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorSole('#FF0000')">
          <div
            :class="{
              circles: true,
              red: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorSole('#FFC0CB')">
          <div
            :class="{
              circles: true,
              black: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorSole('#C9C9C9')">
          <div
            :class="{
              circles: true,
              grey: true,
            }"
          ></div>
        </div>
      </div>

      <div id="bottomcolor">
        <p class="subtitle">Panel one color</p>
        <div :class="{ options: true }" @click="updateColorinside('#FFFF00')">
          <div
            :class="{
              circles: true,
              yellow: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorinside('#FF0000')">
          <div
            :class="{
              circles: true,
              red: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorinside('#FFC0CB')">
          <div
            :class="{
              circles: true,
              black: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorinside('#C9C9C9')">
          <div
            :class="{
              circles: true,
              grey: true,
            }"
          ></div>
        </div>
      </div>

      <div id="topcolor">
        <p class="subtitle">Panel two color</p>
        <div :class="{ options: true }" @click="updateColorTop('#FFFF00')">
          <div
            :class="{
              circles: true,
              yellow: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorTop('#FF0000')">
          <div
            :class="{
              circles: true,
              red: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorTop('#FFC0CB')">
          <div
            :class="{
              circles: true,
              black: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="updateColorTop('#C9C9C9')">
          <div
            :class="{
              circles: true,
              grey: true,
            }"
          ></div>
        </div>
      </div>

      <div id="topmaterial">
        <p class="subtitle">Panel one material</p>
        <div
          :class="{ options: true }"
          @click="updateMaterialTop('/textures/leather.jpg')"
        >
          <div
            :class="{
              circles: true,
              leather: true,
            }"
          ></div>
        </div>

        <div
          :class="{ options: true }"
          @click="updateMaterialTop('/textures/holes.jpg')"
        >
          <div
            :class="{
              circles: true,
              holes: true,
            }"
          ></div>
        </div>

        <div
          :class="{ options: true }"
          @click="updateMaterialTop('/textures/latex.jpg')"
        >
          <div
            :class="{
              circles: true,
              latex: true,
            }"
          ></div>
        </div>

        <div
          :class="{ options: true }"
          @click="updateMaterialTop('/textures/fabric.jpg')"
        >
          <div
            :class="{
              circles: true,
              fabric: true,
            }"
          ></div>
        </div>
      </div>

      <div id="bottommaterial">
        <p class="subtitle">Panel two material</p>
        <div
          :class="{ options: true }"
          @click="updateMaterialBottom('/textures/leather.jpg')"
        >
          <div
            :class="{
              circles: true,
              leather: true,
            }"
          ></div>
        </div>

        <div
          :class="{ options: true }"
          @click="updateMaterialBottom('/textures/holes.jpg')"
        >
          <div
            :class="{
              circles: true,
              holes: true,
            }"
          ></div>
        </div>

        <div
          :class="{ options: true }"
          @click="updateMaterialBottom('/textures/latex.jpg')"
        >
          <div
            :class="{
              circles: true,
              latex: true,
            }"
          ></div>
        </div>

        <div
          :class="{ options: true }"
          @click="updateMaterialBottom('/textures/fabric.jpg')"
        >
          <div
            :class="{
              circles: true,
              fabric: true,
            }"
          ></div>
        </div>
      </div>
    </div>

    <div class="user-details">
      <label for="shoeSize">Shoe Size:</label>
      <input type="number" v-model="shoeSize" />

      <label for="userName">User Name:</label>
      <input type="text" v-model="userName" />

      <label for="userAddress">User Address:</label>
      <input type="text" v-model="userAddress" />

      <label for="userEmail">User Email:</label>
      <input type="email" v-model="userEmail" />
    </div>

    <div v-if="formError" class="error-message">{{ formError }}</div>

    <button @click="handleDoneButtonClick">Done</button>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

export default {
  data() {
    return {
      selectedColors: {
        shoeColorLaces: null,
        shoeColorSole: null,
        shoeColorPanelUp: null,
        shoeColorPanelDown: null,
      },
      selectedMaterials: {
        shoeMaterialPanelUp: null,
        shoeMaterialPanelDown: null,
      },
      shoeSize: null,
      userName: null,
      userAddress: null,
      userEmail: null,
      formError: null,
    };
  },
  mounted() {
    const windowWidth = window.innerWidth * 2;
    const ratio = windowWidth / window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.$refs.canvasContainer.appendChild(renderer.domElement);

    camera.position.z = 7;

    const loadingManager = new THREE.LoadingManager();

    const gltfLoader = new GLTFLoader(loadingManager);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;

    scene.background = new THREE.Color(0xffffff);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.7);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.7);
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.7);
    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 1);
    directionalLight2.position.set(0, 0, -1);
    directionalLight3.position.set(0, 1, 0);
    directionalLight4.position.set(-1, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight2);
    scene.add(directionalLight3);
    scene.add(directionalLight4);

    let shoe;

    gltfLoader.load("/models/new-shoe.glb", (gltf) => {
      shoe = gltf.scene;
      shoe.scale.set(2.5, 2.5, 2.5);

      shoe.rotation.order = "YXZ";

      shoe.rotation.x = 0.5;
      shoe.rotation.y = 1.5;

      shoe.position.z = 0;
      shoe.position.y = -0.5;
      shoe.position.x = -0.5;

      scene.add(shoe);
    });

    const updateColorLacesFromDiv = (hexColor) => {
      console.log("💕");
      if (shoe) {
        console.log("💕", hexColor);
        const lacesMaterial = shoe.getObjectByName("laces").material;
        lacesMaterial.color.setStyle(hexColor);
        lacesMaterial.needsUpdate = true;
        this.selectedColors.shoeColorLaces = hexColor;
      }
    };

    this.updateColorLaces = updateColorLacesFromDiv;

    const updateColorSoleFromDiv = (hexColor) => {
      console.log("💕");
      if (shoe) {
        console.log("💕", hexColor);
        const soleMaterialTop = shoe.getObjectByName("sole_1").material;
        const soleMaterialBottom = shoe.getObjectByName("sole_2").material;
        soleMaterialTop.color.setStyle(hexColor);
        soleMaterialTop.needsUpdate = true;
        soleMaterialBottom.color.setStyle(hexColor);
        soleMaterialBottom.needsUpdate = true;
        this.selectedColors.shoeColorSole = hexColor;
      }
    };

    this.updateColorSole = updateColorSoleFromDiv;

    const updateColorinsideFromDiv = (hexColor) => {
      console.log("💕");
      if (shoe) {
        console.log("💕", hexColor);
        const insideMaterial = shoe.getObjectByName("inside").material;
        insideMaterial.color.setStyle(hexColor);
        insideMaterial.needsUpdate = true;
        this.selectedColors.shoeColorPanelDown = hexColor;
      }
    };

    this.updateColorinside = updateColorinsideFromDiv;

    const updateColorTopFromDiv = (hexColor) => {
      console.log("💕");
      if (shoe) {
        console.log("💕", hexColor);
        const topMaterialTop = shoe.getObjectByName("outside_1").material;
        const topMaterialBottom = shoe.getObjectByName("outside_2").material;
        topMaterialTop.color.setStyle(hexColor);
        topMaterialTop.needsUpdate = true;
        topMaterialBottom.color.setStyle(hexColor);
        topMaterialBottom.needsUpdate = true;
        this.selectedColors.shoeColorPanelUp = hexColor;
      }
    };

    this.updateColorTop = updateColorTopFromDiv;

    const updateMaterialTopFromDiv = (textureUrl) => {
      if (shoe) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(textureUrl);

        console.log("💕", texture);

        const MaterialTop = shoe.getObjectByName("outside_1").material;
        const MaterialBottom = shoe.getObjectByName("outside_2").material;

        MaterialTop.map = texture;
        MaterialTop.needsUpdate = true;

        MaterialBottom.map = texture;
        MaterialBottom.needsUpdate = true;

        this.selectedMaterials.shoeMaterialPanelUp = textureUrl;
      }
    };

    this.updateMaterialTop = updateMaterialTopFromDiv;

    const updateMaterialBottomFromDiv = (textureUrl) => {
      if (shoe) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(textureUrl);

        console.log("💕", texture);

        const MaterialTop = shoe.getObjectByName("inside").material;

        MaterialTop.map = texture;
        MaterialTop.needsUpdate = true;
        this.selectedMaterials.shoeMaterialPanelDown = textureUrl;
      }
    };

    this.updateMaterialBottom = updateMaterialBottomFromDiv;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  },

  methods: {
    handleDoneButtonClick() {
      if (
        this.shoeSize &&
        this.userName &&
        this.userAddress &&
        this.userEmail &&
        this.selectedColors.shoeColorLaces &&
        this.selectedColors.shoeColorSole &&
        this.selectedColors.shoeColorPanelDown &&
        this.selectedColors.shoeColorPanelUp &&
        this.selectedMaterials.shoeMaterialPanelDown &&
        this.selectedMaterials.shoeMaterialPanelUp
      ) {
        this.formError = null; // Clear any previous errors

        this.fetchData();
      } else {
        this.formError =
          "Please fill in all the required fields and selections.";
      }
    },

    fetchData() {
      console.log("fetching data");
      const data = {
        shoe: {
          shoeType: "AIR REV. NITRO S",
          shoeSize: this.shoeSize,
          shoeColorSole: this.selectedColors.shoeColorSole,
          shoeColorLaces: this.selectedColors.shoeColorLaces,
          shoeColorPanelDown: this.selectedColors.shoeColorPanelDown,
          shoeColorPanelUp: this.selectedColors.shoeColorPanelUp,
          shoeMaterialPanelDown: this.selectedMaterials.shoeMaterialPanelDown,
          shoeMaterialPanelUp: this.selectedMaterials.shoeMaterialPanelUp,
          status: "Order placed",
          userName: this.userName,
          userAddress: this.userAddress,
          userEmail: this.userEmail,
        },
      };

      fetch("https://dev5-api-sneakers.onrender.com/api/v1/shoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response if needed
          console.log("Data successfully sent:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style>
#threeContainers {
  width: 100%;
  height: 50vh;
}

menu {
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

.arrows-item {
  padding-left: 20px;
  padding-right: 20px;
}

.shoe-desc {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 43px;
  background-color: #d6ff38;
}

.selections {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 500px;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circles {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px 0;
  border: 2px solid #fff;
}

h1 {
  color: #000;
  font-size: 1.5rem;
  margin: 0;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.6px;
}

h2 {
  color: #000;
  font-family: "inter", sans-serif;
  font-size: 1§px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

h3 {
  color: #000;
  font-family: "inter", sans-serif;
  font-size: 1§px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

p {
  font-family: "inter", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: #000;
}

button {
  color: #d6ff38;
  background-color: #000;
  margin: 43px;
  width: 300px;
  height: 68px;
  font-family: "inter", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.selected-circle {
  border: 2px solid red; /* Apply red border for the selected circle */
}

.black {
  background-color: #ffc0cb;
}

.red {
  background-color: #ac0202;
}

.yellow {
  background-color: #d6ff38;
}

.grey {
  background-color: #c9c9c9;
}

.leather {
  background-image: url("/textures/leather.jpg");
  background-size: cover;
}

.holes {
  background-image: url("/textures/holes.jpg");
  background-size: cover;
}

.latex {
  background-image: url("/textures/latex.jpg");
  background-size: cover;
}

.fabric {
  background-image: url("/textures/fabric.jpg");
  background-size: cover;
}

#configurator {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding-bottom: 50px;
}

.subtitle {
  color: white;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
