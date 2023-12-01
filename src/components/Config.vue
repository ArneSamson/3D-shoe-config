<template>
  <div>
    <div class="canvas-container" ref="canvasContainer"></div>

    <div id="configurator">

      <button @click="if (currentPartIndex > 0) currentPartIndex--;
        else currentPartIndex = 4
        checkProgress()
        "
      >⬅️</button>

      <div
      v-if = "currentPartIndex && currentPartIndex < 4 || currentPartIndex == 0"
      >
        <p class="subtitle">{{ shoePart }} color</p>
        <div
          v-for="color in colorOptions"
          :key="color"
          :class="{ options: true }"
          @click="updateColor(shoePart, color)"
        >
        <div class="circle" :style="{ backgroundColor: color }"></div>
        </div>
      </div>

      <div v-if="shoePart === 'inside' || shoePart === 'outside'"
      >
        <p class="subtitle">{{ materialPart }} material</p>
        <div
          v-for="material in materialOptions"
          :key="material"
          :class="{ options: true }"
          @click="updateMaterial(materialPart, material)"
        >
          <div
            class="circle"
            :style="{ backgroundImage: `url(${material})` }"
          ></div>
        </div>
      </div>

      <div v-if="currentPartIndex === 4">
        <p class="subtitle">jewel</p>
        <div
          v-for="jewelType in jewelOptions"
          :key="jewelType"
          :id="`${jewelType}jewel`"
          :class="{ options: true }"
          @click="updateJewel(jewelType)"
        >
          <div
            class="circle"
            :style="{
              backgroundImage: `url('/media/${jewelType.toLowerCase()}.jpg')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }"
          ></div>
        </div>
      </div>

      <button
        @click="if (currentPartIndex < 4) currentPartIndex++
        else currentPartIndex = 0
        checkProgress()
        ;"
      >➡️</button>
    </div>

    <div class="initials-container">
      <input id="checkbox" type="checkbox" @change="toggleInitials()" />
      <label> Add your initials to your shoe:</label>
      <input v-model="initials" @input="handleInitialsInput" maxlength="2" />
    </div>

    <h2>Your information:</h2>
    <div class="user-details">
      <div class="user-details-div">
        <label for="shoeSize">Shoe Size:</label>
        <select id="shoeSize" name="shoeSize" v-model="shoeSize">
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
          <option value="39">39</option>
          <option value="40">40</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
          <option value="47">47</option>
          <option value="48">48</option>
          <option value="49">49</option>
          <option value="50">50</option>
        </select>
      </div>
      <div class="user-details-div">
        <label for="userName">Your name:</label>
        <input type="text" v-model="userName" />
      </div>
      <div class="user-details-div">
        <label for="userAddress">Your address:</label>
        <input type="text" v-model="userAddress" />
      </div>
      <div class="user-details-div">
        <label for="userEmail">Your email:</label>
        <input type="email" v-model="userEmail" />
      </div>
    </div>

    <div v-if="formError" class="error-message">{{ formError }}</div>

    <button @click="handleDoneButtonClick">Send order!</button>

    <div id="shoetype">
      <h1>You are currently editing: AIR REV. NITRO S</h1>
      <p class="price">€ 200</p>
      <router-link to="/config2"
        ><button class="router">Go to AIR REV. XTRA BLACK</button></router-link
      >
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useRouter } from "vue-router";
const router = useRouter();

export default {
  setup() {},
  data() {
    return {
      shoeParts: ['laces', 'sole', 'inside', 'outside'],
      materialParts: ['bottom', 'top'],
      currentPartIndex: 0,
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
      colorOptions: ["#ffd700", "#88FF00", "#00FFA6", "#A200FF"],
      materialOptions: [
        "/textures/leather.jpg",
        "/textures/holes.jpg",
        "/textures/latex.jpg",
        "/textures/fabric.jpg",
      ],
      jewelOptions: ["Giraffe", "Elephant", "Hedgehog", "Whale"],
    };
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    const windowWidth = window.innerWidth * 2;
    const ratio = windowWidth / window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
      .setPath("/cubemap/jpg/")
      .load([
        "px.jpg",
        "nx.jpg",
        "py.jpg",
        "ny.jpg",
        "pz.jpg",
        "nz.jpg",
      ]); 
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

    // scene.background = new THREE.Color(0xffffff);

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

    this.textureLoader = new TextureLoader();

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
      }
    };

    this.updateColor = updateColor;

    const updateMaterial = (materialType, textureUrl) => {
      if (shoe) {
        const texture = this.textureLoader.load(textureUrl);

        texture.repeat.set(2, 2);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

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

    const checkProgress = () => {
      console.log("checking progress");
      if(this.selectedColors.shoeColorLaces &&
        this.selectedColors.shoeColorSole &&
        this.selectedColors.shoeColorPanelDown &&
        this.selectedColors.shoeColorPanelUp &&
        this.selectedMaterials.shoeMaterialPanelDown &&
        this.selectedMaterials.shoeMaterialPanelUp &&
        this.jewel){
          console.log("all selected");
          const geometry = new THREE.BoxGeometry(
            5, 5, 5
          );
          const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
          const cube = new THREE.Mesh( geometry, material );
          scene.add( cube );
  
        }
    }

    this.checkProgress = checkProgress;
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

  computed: {
    shoePart() {
      return this.shoeParts[this.currentPartIndex];
    },
    materialPart(){
      return this.materialParts[this.currentPartIndex-2];
    },
  },
};
</script>

<style scoped>
.initials-container {
  display: flex;
  flex-direction: row;
  align-items: start;
  padding: 43px;
  gap: 20px;
  margin-left: 40px;
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
  margin-top: 40px;
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
  padding-bottom: 10px;
  overflow-x: auto;
  flex-wrap: nowrap;
}

.subtitle {
  color: white;
}

.error-message {
  color: red;
  margin-top: 10px;
  margin-left: 100px;
  margin-bottom: 10px;
  font-family: "basic-sans", sans-serif;
  font-size: 18px;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  margin-left: 100px;
  margin-bottom: 20px;
  gap: 40px;
  flex-wrap: wrap;
}
.user-details-div {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

input,
select {
  border: 2px solid #d6ff38;
  background-color: #242424;
  color: white;
  height: 20px;
  width: 200px;
  font-family: "basic-sans", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}

select {
  height: 30px;
}
.options .circle {
  cursor: pointer;
  transition: transform 0.2s;
  width: 30px;
  height: 30px;
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
  max-width: 250px;
  height: 34px;
  font-family: "basic-sans", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: block;
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 30px;
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
  margin-left: 100px;
  margin-top: 200px;
}

h2 {
  color: white;
  font-size: 1.5rem;
  margin: 0;
  font-family: "cooper-black-std", serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.6px;
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-top: 80px;
}

.price {
  color: white;
  font-size: 1.5rem;
  margin: 0;
  font-family: "basic-sans", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.6px;
  margin-left: 100px;
  margin-top: 5px;
}

#checkbox {
  border: 2px solid #d6ff38;
  background-color: #242424;
  color: white;
  width: 20px;
  margin-left: 15px;
}

#shoetype {
  margin-top: 50px;
}
</style>
