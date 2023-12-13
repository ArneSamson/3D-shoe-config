<template>
  <div class="models-container">
    <h1 id="ourmodels" class="models-container__title">Our models</h1>
    <div class="models-container__flexbox">
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
              <router-link to="/config" class="buttons__link"
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
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "Menu",
  mounted() {
    const windowWidth = window.innerWidth;
    const squareSize = windowWidth * 0.2;

    const createScene = (container, modelPath) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(squareSize, squareSize);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      camera.position.z = 5;

      const loadingManager = new THREE.LoadingManager();

      const gltfLoader = new GLTFLoader(loadingManager);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.maxPolarAngle = Math.PI / 2;
      controls.enablePan = false;

      controls.minDistance = 5;
      controls.maxDistance = 5;

      scene.background = new THREE.Color(0x242424);

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

      gltfLoader.load(modelPath, (gltf) => {
        shoe = gltf.scene;
        shoe.rotation.order = "YXZ";

        if (modelPath === "/models/new-shoe.glb") {
          shoe.scale.set(2, 2, 2);
          shoe.rotation.x = 0.5;
          shoe.rotation.y = 1.5;
          shoe.position.z = 0;
          shoe.position.y = 0.5;
          shoe.position.x = -0.5;
          scene.add(shoe);
        } else {
          shoe.scale.set(0.75, 0.75, 0.75);
          shoe.rotation.x = 0;
          shoe.rotation.y = -0.15;
          shoe.rotation.z = -0.4;
          shoe.position.z = 0;
          shoe.position.y = -0.5;
          shoe.position.x = -0.5;
          scene.add(shoe);
        }
      });

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    };

    createScene(this.$refs.canvasContainer1, "/models/new-shoe.glb");
    createScene(this.$refs.canvasContainer2, "/models/vans-shoe.glb");
  },
};
</script>

<style scoped>
.models-container {
  background-color: #242424;
}

a {
  text-decoration: none;
  color: var(--color-accent);
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

.models-container__flexbox {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-left: 75px;
  align-items: center;
  margin-bottom: 50px;
  gap: 100px;
}

.model {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
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
  font-size: 24px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin: 0;
}

.model__type {
  font-size: 16px;
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
  color: var(--color-accent);
  font-size: 14px;
  letter-spacing: 1.61px;
  line-height: normal;
  margin: 0px;
}

.buttons__link {
  text-decoration: none;
  color: var(--color-accent);
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
