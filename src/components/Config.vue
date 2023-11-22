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

      <div id="jewels">
        <p class="subtitle">Jewels</p>
        <div :class="{ options: true }" @click="addJewelGiraffe">
          <div
            :class="{
              circles: true,
              jewelGiraffe: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="addJewelElephant">
          <div
            :class="{
              circles: true,
              jewelElephant: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="addJewelHedgehog">
          <div
            :class="{
              circles: true,
              jewelHedgehog: true,
            }"
          ></div>
        </div>

        <div :class="{ options: true }" @click="addJewelWhale">
          <div
            :class="{
              circles: true,
              jewelWhale: true,
            }"
          ></div>
        </div>
      </div>
    </div>

    <div class="user-details">
      <div class="user-details-div">
        <label for="shoeSize">Shoe Size:</label>
        <input type="number" v-model="shoeSize" />
      </div>
      <div class="user-details-div">
        <label for="userName">User Name:</label>
        <input type="text" v-model="userName" />
      </div>
      <div class="user-details-div">
        <label for="userAddress">User Address:</label>
        <input type="text" v-model="userAddress" />
      </div>
      <div class="user-details-div">
        <label for="userEmail">User Email:</label>
        <input type="email" v-model="userEmail" />
      </div>
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
      jewel: null,
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

    let jewelGiraffe;

    gltfLoader.load("/models/pendantGiraffe.glb", (gltf) => {
      jewelGiraffe = gltf.scene;
      jewelGiraffe.scale.set(0.04, 0.04, 0.04);

      jewelGiraffe.rotation.x = -1.85;
      jewelGiraffe.rotation.y = 0.3;

      jewelGiraffe.position.z = 1.25;
      jewelGiraffe.position.y = 0.8;
      jewelGiraffe.position.x = -1.3;
      jewelGiraffe.visible = false;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelGiraffe.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      scene.add(jewelGiraffe);
    });

    this.addJewelGiraffe = () => {
      jewelGiraffe.visible = !jewelGiraffe.visible;
      jewelElephant.visible = false;
      jewelHedgehog.visible = false;
      jewelWhale.visible = false;
      this.jewel = "Giraffe";
      console.log(this.jewel);
    };

    let jewelElephant;

    gltfLoader.load("/models/pendantElephant.glb", (gltf) => {
      jewelElephant = gltf.scene;
      jewelElephant.scale.set(0.05, 0.05, 0.05);

      jewelElephant.rotation.x = -1.95;
      jewelElephant.rotation.y = 0.6;

      jewelElephant.position.z = 1.25;
      jewelElephant.position.y = 1;
      jewelElephant.position.x = -1;
      jewelElephant.visible = false;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelElephant.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      scene.add(jewelElephant);
    });

    this.addJewelElephant = () => {
      jewelElephant.visible = !jewelElephant.visible;
      jewelGiraffe.visible = false;
      jewelHedgehog.visible = false;
      jewelWhale.visible = false;
      this.jewel = "Elephant";
      console.log(this.jewel);
    };

    let jewelHedgehog;

    gltfLoader.load("/models/pendantHedgehog.glb", (gltf) => {
      jewelHedgehog = gltf.scene;
      jewelHedgehog.scale.set(0.05, 0.05, 0.05);

      jewelHedgehog.rotation.x = -1.95;
      jewelHedgehog.rotation.y = 0.6;

      jewelHedgehog.position.z = 1.15;
      jewelHedgehog.position.y = 1.2;
      jewelHedgehog.position.x = -1;
      jewelHedgehog.visible = false;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelHedgehog.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      scene.add(jewelHedgehog);
    });

    this.addJewelHedgehog = () => {
      jewelHedgehog.visible = !jewelHedgehog.visible;
      jewelGiraffe.visible = false;
      jewelElephant.visible = false;
      jewelWhale.visible = false;
      this.jewel = "Hedgehog";
      console.log(this.jewel);
    };

    let jewelWhale;

    gltfLoader.load("/models/pendantWhale.glb", (gltf) => {
      jewelWhale = gltf.scene;
      jewelWhale.scale.set(0.05, 0.05, 0.05);

      jewelWhale.rotation.x = -2;
      jewelWhale.rotation.y = 0.6;

      jewelWhale.position.z = 0.95;
      jewelWhale.position.y = 1.4;
      jewelWhale.position.x = -1;
      jewelWhale.visible = false;

      const material = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });

      jewelWhale.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      scene.add(jewelWhale);
    });

    this.addJewelWhale = () => {
      jewelWhale.visible = !jewelWhale.visible;
      jewelGiraffe.visible = false;
      jewelElephant.visible = false;
      jewelHedgehog.visible = false;
      this.jewel = "Whale";
      console.log(this.jewel);
    };

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
          jewel: this.jewel,
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

p {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: black;
}

label {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: white;
}

button {
  color: #d6ff38;
  background-color: #000;
  width: 60%;
  max-width: 300px;
  height: 68px;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 80px;
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
  gap: 120px;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  margin-bottom: 50px;
  overflow-x: auto;
  flex-wrap: nowrap; /* Prevent items from wrapping */
}

.subtitle {
  color: white;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.user-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-left: 80px;
  margin-right: 80px;
  margin-bottom: 20px;
  gap: 40px;
  flex-wrap: wrap;
}
.user-details-div {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
input {
  border: 2px solid #d6ff38;
  background-color: #242424;
  color: white;
}

.jewelGiraffe {
  background-color: #fff;
}

.jewelElephant {
  background-color: #fff;
}

.jewelHedgehog {
  background-color: #fff;
}
</style>
