<template>
  <div>
    <div class="canvas-container" ref="canvasContainer"></div>

    <h1>AIR REV. XTRA BLACK</h1>
    <p class="price">€ 180</p>

    <router-link to="/"
      ><button class="router">Go to other model</button></router-link
    >
    <p id="disclaimer">
      This shoe is the ultimate custom shoe, since all the artwork that is used,
      is created for our brand by Stable Diffusion and Lexica and is not
      available anywhere else.
    </p>

    <div id="configurator">
      <div
        v-for="colorType in ['laces', 'sole', 'main']"
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
        v-for="materialType in ['sides', 'tip']"
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
          <div
            class="circle"
            :style="{
              backgroundImage: `url(${material})`,
              backgroundSize: 'cover',
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
      selectedColors: {
        shoeColorLaces: null,
        shoeColorSole: null,
        shoeColorPanelUp: null,
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
      colorOptions: [
        "#7DBAAE",
        "#91131D",
        "#DD9D1D",
        "#9A244B",
        "#5A9E50",
        "#FCD4D4",
        "#9DB7D8",
        "#F9EEB0",
      ],
      materialOptions: [
        "/textures/sd-1.webp",
        "/textures/sd-2.webp",
        "/textures/sd-3.webp",
        "/textures/sd-4.webp",
        "/textures/lexica-1.webp",
        "/textures/lexica-2.webp",
        "/textures/lexica-3.webp",
        "/textures/lexica-4.webp",
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

    gltfLoader.load("/models/vans-shoe.glb", (gltf) => {
      shoe = gltf.scene;

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          console.log("Part Name:", child.name);
        }
      });
      shoe.scale.set(2.2, 2.2, 2.2);

      shoe.rotation.order = "YXZ";

      shoe.rotation.x = 0.5;
      shoe.rotation.y = 1.5;

      shoe.position.z = 0;
      shoe.position.y = -0.5;
      shoe.position.x = -0.5;

      scene.add(shoe);
    });
    const jewelModels = {
      Giraffe: { model: null, position: new THREE.Vector3(-1.6, 0.8, 1.35) },
      Elephant: { model: null, position: new THREE.Vector3(-1, 1, 1.25) },
      Hedgehog: { model: null, position: new THREE.Vector3(-1, 1.2, 1.15) },
      Whale: { model: null, position: new THREE.Vector3(-1, 1.4, 0.95) },
    };

    Object.keys(jewelModels).forEach((jewelType) => {
      const modelPath = `/models/pendant${jewelType}.glb`;
      gltfLoader.load(modelPath, (gltf) => {
        const jewelModel = gltf.scene;
        jewelModel.scale.set(0.05, 0.05, 0.05);
        jewelModel.rotation.x = -2;
        jewelModel.rotation.y = 0.6;
        jewelModel.position.copy(jewelModels[jewelType].position);

        const material = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 1,
          roughness: 0.3,
        });

        jewelModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });

        jewelModel.visible = false;
        jewelModels[jewelType].model = jewelModel;
        scene.add(jewelModel);
      });
    });

    const updateJewel = (jewelType) => {
      Object.keys(jewelModels).forEach((type) => {
        const model = jewelModels[type].model;
        model.visible = type === jewelType;
        if (type === jewelType) this.jewel = jewelType;
      });
    };

    this.updateJewel = updateJewel;

    const updateColor = (colorType, hexColor) => {
      if (shoe) {
        let material;
        switch (colorType) {
          case "laces":
            const laces = shoe.getObjectByName("laces");
            if (laces && laces.material) {
              laces.material = laces.material.clone();
              laces.material.color.setStyle(hexColor);
              laces.material.needsUpdate = true;
              this.selectedColors.shoeColorLaces = hexColor;
            }
            break;
          case "sole":
            const sole = shoe.getObjectByName("sole");
            if (sole && sole.material) {
              sole.material = sole.material.clone();
              sole.material.color.setStyle(hexColor);
              sole.material.needsUpdate = true;
              this.selectedColors.shoeColorSole = hexColor;
            }
            break;
          case "main":
            const main = shoe.getObjectByName("main");
            if (main && main.material) {
              main.material = main.material.clone();
              main.material.color.setStyle(hexColor);
              main.material.needsUpdate = true;
              this.selectedColors.shoeColorPanelUp = hexColor;
            }
            break;
        }
      }
    };

    this.updateColor = updateColor;

    const updateMaterial = (materialType, textureUrl) => {
      if (shoe) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(textureUrl);

        let material;
        switch (materialType) {
          case "sides":
            const sides = shoe.getObjectByName("sides");
            if (sides && sides.material) {
              sides.material = sides.material.clone();
              sides.material.map = texture;
              sides.material.needsUpdate = true;
              this.selectedMaterials.shoeMaterialPanelUp = textureUrl;
            }
            break;
          case "tip":
            const tip = shoe.getObjectByName("tip-heel");
            if (tip && tip.material) {
              tip.material = tip.material.clone();
              tip.material.map = texture;
              tip.material.needsUpdate = true;
              this.selectedMaterials.shoeMaterialPanelDown = textureUrl;
            }
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

      if (this.initialsState === true) {
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
        this.selectedColors.shoeColorPanelUp &&
        this.selectedMaterials.shoeMaterialPanelDown &&
        this.selectedMaterials.shoeMaterialPanelUp
      ) {
        this.formError = null;

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
          shoeColorPanelUp: this.selectedColors.shoeColorPanelUp,
          shoeMaterialPanelDown: this.selectedMaterials.shoeMaterialPanelDown,
          shoeMaterialPanelUp: this.selectedMaterials.shoeMaterialPanelUp,
          status: "Order placed",
          userName: this.userName,
          userAddress: this.userAddress,
          userEmail: this.userEmail,
        },
      };

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

#disclaimer {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  color: white;
  margin-left: 40px;
  margin-right: 80px;
  margin-bottom: 40px;
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

#configurator {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 120px;
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

.router {
  text-decoration: none;
  color: #d6ff38;
  background-color: #000;
  width: 20%;
  max-width: 150px;
  height: 24px;
  font-family: "cooper-black-std", serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  display: block;
  margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 0px;
}

h1 {
  color: white;
  font-size: 1.5rem;
  margin: 0;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.6px;
  margin-left: 40px;
  margin-top: 20px;
}

.price {
  color: white;
  font-size: 1.5rem;
  margin: 0;
  font-family: "cooper-black-std", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.6px;
  margin-left: 40px;
  margin-top: 20px;
}
</style>
