<template>
  <div>
    <div class="canvas-container" ref="canvasContainer"></div>

    <div>
      <div class="initials-container">
        <label>
          <input type="checkbox" @change="toggleInitials()" />
          Show Initials
        </label>
        <input v-model="initials" @input="handleInitialsInput" maxlength="2" />
      </div>
    </div>

    <div id="configurator">

      <div
        v-for="colorType in ['laces', 'sole', 'inside', 'outside']"
        :key="colorType"
        :id="`${colorType}color`"
      >
        <p class="subtitle">{{ colorType }} color</p>
        <div
          v-for="color in colorOptions"
          :key="color"
          :class="{ options: true }"
          @click="updateColor(colorType, color)"
        >
          <div class="circle" :style="{ backgroundColor: color }"></div>
        </div>
      </div>

      <div
        v-for="materialType in ['top', 'bottom']"
        :key="materialType"
        :id="`${materialType}material`"
      >
        <p class="subtitle">{{ materialType }} material</p>
        <div
          v-for="material in materialOptions"
          :key="material"
          :class="{ options: true }"
          @click="updateMaterial(materialType, material)"
        >
          <div class="circle" :style="{ backgroundImage: `url(${material})` }">
          </div>
        </div>
      </div>

      <div>
        <p class="subtitle">Jewels</p>
        
        <div
          v-for="jewelType in jewelOptions"
          :key="jewelType"
          :id="`${jewelType}jewel`"
          :class="{ options: true }"
          @click="updateJewel(jewelType)"
        >
          <div
            :class="{
              circles: true,
              [`jewel${jewelType}`]: true,
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
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export default {
  setup() {},
  data() {
    return {
      initials: "",
      initialsState: false,
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
      colorOptions: ["#FFFF00", "#FF0000", "#FFC0CB", "#C9C9C9"],
      materialOptions: [
        "/textures/leather.jpg",
        "/textures/holes.jpg",
        "/textures/latex.jpg",
        "/textures/fabric.jpg",
      ],
      jewelOptions: [
        "Giraffe",
        "Elephant",
        "Hedgehog",
        "Whale",
      ],
    };
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    const windowWidth = window.innerWidth * 2;
    const ratio = windowWidth / window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    resize();
    window.addEventListener("resize", resize);
    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight * 0.5);
      camera.aspect =
        canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
    }

    camera.position.z = 7;

    const loadingManager = new THREE.LoadingManager();

    const gltfLoader = new GLTFLoader(loadingManager);

    const fontLoader = new FontLoader();
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.4,
      roughness: 1,
      wireframe: true,
      wireframeLinewidth: 0.5,
    });

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

    let shoeText;

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
    let jewelElephant;
    let jewelHedgehog;
    let jewelWhale;

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

    const updateJewel = (jewelType) => {
      if (jewelType) {
        switch (jewelType) {
          case "Giraffe":
            jewelGiraffe.visible = true;
            jewelElephant.visible = false;
            jewelHedgehog.visible = false;
            jewelWhale.visible = false;
            this.jewel = "Giraffe";
            break;
          case "Elephant":
            jewelElephant.visible = true;
            jewelGiraffe.visible = false;
            jewelHedgehog.visible = false;
            jewelWhale.visible = false;
            this.jewel = "Elephant";
            break;
          case "Hedgehog":
            jewelHedgehog.visible = true;
            jewelGiraffe.visible = false;
            jewelElephant.visible = false;
            jewelWhale.visible = false;
            this.jewel = "Hedgehog";
            break;
          case "Whale":
            jewelWhale.visible = true;
            jewelGiraffe.visible = false;
            jewelElephant.visible = false;
            jewelHedgehog.visible = false;
            this.jewel = "Whale";
            break;
          default:
            break;
        }
      }
    };

    this.updateJewel = updateJewel;

    const updateColor = (colorType, hexColor) => {
      if (shoe) {
        let material;
        switch (colorType) {
          case "laces":
            material = shoe.getObjectByName("laces").material;
            this.selectedColors.shoeColorLaces = hexColor;
            break;
          case "sole":
            const soleMaterialTop = shoe.getObjectByName("sole_1").material;
            const soleMaterialBottom = shoe.getObjectByName("sole_2").material;
            soleMaterialTop.color.setStyle(hexColor);
            soleMaterialTop.needsUpdate = true;
            soleMaterialBottom.color.setStyle(hexColor);
            soleMaterialBottom.needsUpdate = true;
            this.selectedColors.shoeColorSole = hexColor;
            break;
          case "inside":
            material = shoe.getObjectByName("inside").material;
            this.selectedColors.shoeColorPanelDown = hexColor;
            break;
          case "outside":
            const topMaterialTop = shoe.getObjectByName("outside_1").material;
            const topMaterialBottom =
              shoe.getObjectByName("outside_2").material;
            topMaterialTop.color.setStyle(hexColor);
            topMaterialTop.needsUpdate = true;
            topMaterialBottom.color.setStyle(hexColor);
            topMaterialBottom.needsUpdate = true;
            this.selectedColors.shoeColorPanelUp = hexColor;
            break;
          default:
            break;
        }

        if (material) {
          material.color.setStyle(hexColor);
          material.needsUpdate = true;
        }

        console.log("Updated color:", colorType, hexColor);
        console.log("Selected colors:", this.selectedColors);
      }
    };

    this.updateColor = updateColor;

    const updateMaterial = (materialType, textureUrl) => {
      if (shoe) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(textureUrl);

        console.log("💕", texture);

        let material;
        switch (materialType) {
          case "top":
            material = shoe.getObjectByName("outside_1").material;
            this.selectedMaterials.shoeMaterialPanelUp = textureUrl;
            break;
          case "bottom":
            material = shoe.getObjectByName("inside").material;
            this.selectedMaterials.shoeMaterialPanelDown = textureUrl;
            break;
          default:
            break;
        }

        if (material) {
          material.map = texture;
          material.needsUpdate = true;
        }
      }
    };

    this.updateMaterial = updateMaterial;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleInitialsInput = () => {
      this.initials = this.initials.toUpperCase();
    };

    this.handleInitialsInput = handleInitialsInput;

    const toggleInitials = () => {
      this.initialsState = !this.initialsState;
      console.log(this.initialsState);
      console.log(this.initials);

      if (this.initialsState === true) {
        console.log("initialsState is true");

        fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
          const textGeometry = new TextGeometry(this.initials, {
            font: font,
            size: 0.25,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          this.shoeText = new THREE.Mesh(textGeometry, textMaterial);

          this.shoeText.rotation.order = "YXZ";

          this.shoeText.rotation.x = -0.5;
          this.shoeText.rotation.y = -1.75;

          this.shoeText.position.x = -1.88;
          this.shoeText.position.y = 2.2;
          this.shoeText.position.z = -0.45;

          scene.add(this.shoeText);
        });
      } else if (this.initialsState === false) {
        scene.remove(this.shoeText);
      }
    };

    this.toggleInitials = toggleInitials;
  },

  methods: {
    updateColor(type, hexColor) {
      if (shoe) {
        const material = shoe.getObjectByName(type).material;
        material.color.setStyle(hexColor);
        material.needsUpdate = true;
        this.selectedColors[type] = hexColor;
      }
    },
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
        this.selectedMaterials.shoeMaterialPanelUp &&
        this.initials
      ) {
        this.formError = null; // Clear any previous errors

        this.fetchData();
      } else {
        this.formError =
          "Please fill in all the required fields and selections.";
      }
    },

    fetchData() {
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
          initials: this.initials,
          status: "Order placed",
          userName: this.userName,
          userAddress: this.userAddress,
          userEmail: this.userEmail,
        },
      };

      // Additional properties for color and material selections
      data.shoe.colorOptions = this.colorOptions;
      data.shoe.selectedColors = this.selectedColors;
      data.shoe.selectedMaterials = this.selectedMaterials;

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

<style scoped>
.initials-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 43px;
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
  background-image: url("/media/giraffe.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}

.jewelElephant {
  background-image: url("/media/elephant.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}

.jewelHedgehog {
  background-image: url("/media/hedgehog.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}

.jewelWhale {
  background-image: url("/media/whale.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.options .circle {
  cursor: pointer;
  transition: transform 0.2s;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px 0;
  border: 2px solid #fff;
}

.options .circle:hover {
  transform: scale(1.2);
}
</style>
