<template>
  <div>
    <div class="canvas-container" ref="canvasContainer"></div>
    <div id="colors">
      <div :class="{ options: true }" @click="updateColor('#FFFF00')">
        <div
          :class="{
            circles: true,
            'selected-circle': selectedOption === '#FFFF00',
            yellow: true,
          }"
        ></div>
        <p v-if="selectedOption === '#FFFF00'">Yellow</p>
      </div>

      <div :class="{ options: true }" @click="updateColor('#FF0000')">
        <div
          :class="{
            circles: true,
            'selected-circle': selectedOption === '#FF0000',
            red: true,
          }"
        ></div>
        <p v-if="selectedOption === '#FF0000'">Red</p>
      </div>

      <div :class="{ options: true }" @click="updateColor('#000000')">
        <div
          :class="{
            circles: true,
            'selected-circle': selectedOption === '#000000',
            black: true,
          }"
        ></div>
        <p v-if="selectedOption === '#000000'">Black</p>
      </div>

      <div :class="{ options: true }" @click="updateColor('#C9C9C9')">
        <div
          :class="{
            circles: true,
            'selected-circle': selectedOption === '#C9C9C9',
            grey: true,
          }"
        ></div>
        <p v-if="selectedOption === '#C9C9C9'">Grey</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  data() {
    return {};
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

    gltfLoader.load("src/assets/models/new-shoe.glb", (gltf) => {
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

    const updateColorFromDiv = (hexColor) => {
      console.log("💕");
      if (shoe) {
        console.log("💕", hexColor);
        this.selectedOption = hexColor;
        const lacesMaterial = shoe.getObjectByName("laces").material;
        lacesMaterial.color.setStyle(hexColor);
        lacesMaterial.needsUpdate = true;
      }
    };

    this.updateColor = updateColorFromDiv;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  },

  methods: {},
};
</script>

<style scoped>
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
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
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
  background-color: #000;
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
</style>
