<template>
  <div class="bgc">
    <div class="flex">
      <div>
        <div class="loading-placeholder" ref="loadingPlaceholder1">
          <p class="loading-placeholder__message">Loading...</p>
        </div>
        <div class="canvas-container" ref="canvasContainer"></div>
      </div>
      <div class="order-info">
        <h1 class="order-info__title">Overview of your order</h1>
        <p id="type" class="order-info__shoe-type">
          Shoe type: {{ shoe.shoeType }}
        </p>

        <p class="order-info__user-name">Name: {{ shoe.userName }}</p>
        <p class="order-info__user-address">
          Shipping address: {{ shoe.userAddress }}
        </p>

        <p class="order-info__user-email">Email: {{ shoe.userEmail }}</p>
        <p class="order-info__shoe-size">Size: {{ shoe.shoeSize }}</p>
        <p class="order-info__status">Status: {{ shoe.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

export default {
  data() {
    return {
      shoe: {
        jewel: null,
        shoeColorLaces: null,
        shoeColorPanelDown: null,
        shoeColorPanelUp: null,
        shoeColorSole: null,
        shoeMaterialPanelDown: null,
        shoeMaterialPanelUp: null,
        shoeSize: null,
        shoeType: null,
        status: null,
        userAddress: null,
        userEmail: null,
        userName: null,
        initials: null,
      },
    };
  },
  async mounted() {
    await this.fetchShoes();
    const squareSize = 280;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(squareSize, squareSize);
    renderer.setPixelRatio(window.devicePixelRatio);
    const canvasContainer = this.$refs.canvasContainer;
    this.$refs.canvasContainer.appendChild(renderer.domElement);

    camera.position.z = 7;

    const loadingManager = new THREE.LoadingManager();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);

    loadingManager.onStart = () => {
      this.loadingState = true;
      canvasContainer.style.display = "none";
      this.$refs.loadingPlaceholder1.style.display = "flex";
    };
    loadingManager.onLoad = () => {
      this.loadingState = false;
      canvasContainer.style.display = "block";
      this.$refs.loadingPlaceholder1.style.display = "none";
    };

    scene.background = new THREE.Color(0x242424);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;

    controls.minDistance = 7;
    controls.maxDistance = 7;

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

    if (this.shoe.shoeType === "AIR REV. NITRO S") {
      const updateShoeColors = () => {
        const shoeColorLaces = this.shoe.shoeColorLaces;
        const shoeLaces = shoe.getObjectByName("laces");
        shoeLaces.material.color.set(shoeColorLaces);

        const shoeColorSole = this.shoe.shoeColorSole;
        const soleColorTop = shoe.getObjectByName("sole_1");
        const soleColorBottom = shoe.getObjectByName("sole_2");
        soleColorTop.material.color.set(shoeColorSole);
        soleColorBottom.material.color.set(shoeColorSole);

        const textureLoader = new THREE.TextureLoader();
        const textureUrl = this.shoe.shoeMaterialPanelUp;
        const texture = textureLoader.load(textureUrl);

        const MaterialTop = shoe.getObjectByName("outside_1");

        MaterialTop.material = new THREE.MeshBasicMaterial({
          map: texture,
        });

        const shoeColorPanelDown = this.shoe.shoeColorPanelDown;
        const panelDownColor1 = shoe.getObjectByName("outside_1");
        const panelDownColor2 = shoe.getObjectByName("outside_2");
        panelDownColor1.material.color.set(shoeColorPanelDown);
        panelDownColor2.material.color.set(shoeColorPanelDown);

        const MaterialTop2 = shoe.getObjectByName("inside");

        MaterialTop2.material = new THREE.MeshBasicMaterial({
          map: texture,
        });

        const shoeColorPanelUp = this.shoe.shoeColorPanelUp;
        const panelUpColor = shoe.getObjectByName("inside");
        panelUpColor.material.color.set(shoeColorPanelUp);
      };

      let jewelGiraffe;

      gltfLoader.load("/models/pendantGiraffe.glb", (gltf) => {
        jewelGiraffe = gltf.scene;
        jewelGiraffe.scale.set(0.04, 0.04, 0.04);

        jewelGiraffe.rotation.x = -1.85;
        jewelGiraffe.rotation.y = 0.3;

        jewelGiraffe.position.z = 1.25;
        jewelGiraffe.position.y = 0.8;
        jewelGiraffe.position.x = -1.3;

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

        if (this.shoe.jewel === "Giraffe") {
          scene.add(jewelGiraffe);
        }
      });

      let jewelElephant;

      gltfLoader.load("/models/pendantElephant.glb", (gltf) => {
        jewelElephant = gltf.scene;
        jewelElephant.scale.set(0.05, 0.05, 0.05);

        jewelElephant.rotation.x = -1.95;
        jewelElephant.rotation.y = 0.6;

        jewelElephant.position.z = 1.25;
        jewelElephant.position.y = 1;
        jewelElephant.position.x = -1;

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

        if (this.shoe.jewel === "Elephant") {
          scene.add(jewelElephant);
        }
      });

      let jewelHedgehog;

      gltfLoader.load("/models/pendantHedgehog.glb", (gltf) => {
        jewelHedgehog = gltf.scene;
        jewelHedgehog.scale.set(0.05, 0.05, 0.05);

        jewelHedgehog.rotation.x = -1.95;
        jewelHedgehog.rotation.y = 0.6;

        jewelHedgehog.position.z = 1.15;
        jewelHedgehog.position.y = 1.2;
        jewelHedgehog.position.x = -1;

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

        if (this.shoe.jewel === "Hedgehog") {
          scene.add(jewelHedgehog);
        }
      });

      let jewelWhale;

      gltfLoader.load("/models/pendantWhale.glb", (gltf) => {
        jewelWhale = gltf.scene;
        jewelWhale.scale.set(0.05, 0.05, 0.05);

        jewelWhale.rotation.x = -2;
        jewelWhale.rotation.y = 0.6;

        jewelWhale.position.z = 0.95;
        jewelWhale.position.y = 1.4;
        jewelWhale.position.x = -1;

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

        if (this.shoe.jewel === "Whale") {
          scene.add(jewelWhale);
        }
      });

      const fontLoader = new FontLoader();
      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.4,
        roughness: 1,
        wireframe: true,
        wireframeLinewidth: 0.5,
      });

      fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
        const textGeometry = new TextGeometry(this.shoe.initials, {
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

          updateShoeColors();
        });

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        animate();
      });
    }

    if (this.shoe.shoeType === "AIR REV. XTRA BLACK") {
      const updateShoeColors = () => {
        const shoeColorLaces = this.shoe.shoeColorLaces;
        const laces = shoe.getObjectByName("laces");
        laces.material = laces.material.clone();
        laces.material.color.set(shoeColorLaces);

        const shoeColorSole = this.shoe.shoeColorSole;
        const sole = shoe.getObjectByName("sole");
        sole.material = sole.material.clone();
        sole.material.color.set(shoeColorSole);

        const shoeColorMain = this.shoe.shoeColorPanelUp;
        const main = shoe.getObjectByName("main");
        main.material = main.material.clone();
        main.material.color.set(shoeColorMain);

        const tipHeel = shoe.getObjectByName("heel-tip");
        tipHeel.material = tipHeel.material.clone();
        tipHeel.material.color.set(shoeColorSole);

        const textureLoader = new THREE.TextureLoader();
        const textureUrl = this.shoe.shoeMaterialPanelUp;
        const texture = textureLoader.load(textureUrl);

        const sides = shoe.getObjectByName("sides");
        sides.material = sides.material.clone();
        sides.material.map = texture;

        main.material.map = texture;
      };

      gltfLoader.load("/models/vans-shoe.glb", (gltf) => {
        shoe = gltf.scene;
        shoe.scale.set(1, 1, 1);
        shoe.rotation.order = "YXZ";

        shoe.rotation.x = 0;
        shoe.rotation.y = -0.15;
        shoe.rotation.z = -0.4;
        shoe.position.z = 0;
        shoe.position.y = -1.5;
        shoe.position.x = -0.5;

        scene.add(shoe);

        updateShoeColors();
      });

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    }
  },

  methods: {
    async fetchShoes() {
      try {
        const response = await fetch(
          `https://dev5-api-sneakers.onrender.com/api/v1/shoes?id=${this.$route.query.id}`
        );
        const data = await response.json();

        if (data.status === "success") {
          this.shoe = data.data.shoe || {};
        } else {
          console.error("Error fetching shoes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    },
  },
};
</script>

<style scoped>
.bgc {
  background-color: #242424;
  height: 100vh;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  gap: 100px;
}

.canvas-container {
  margin-top: 50px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin-top: 100px;
}

.order-info__title {
  font-family: "cooper-black-std", serif;
  font-weight: 400;
  color: white;
  font-size: 36px;
  letter-spacing: 1.08px;
  line-height: normal;
  margin: 0;
  margin-top: -30px;
  margin-bottom: 20px;
}

.order-info__shoe-type,
.order-info__user-name,
.order-info__user-address,
.order-info__user-email,
.order-info__shoe-size,
.order-info__status {
  font-family: "basic-sans", sans-serif;
  font-weight: 400;
  color: white;
  font-size: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

@media (max-width: 750px) {
  .flex {
    flex-direction: column-reverse;
    flex-wrap: wrap;
    gap: 0px;
    justify-content: left;
    align-items: baseline;
    margin-left: 20px;
  }

  .canvas-container {
    margin-top: 0px;
  }

  .order-info {
    margin-top: 50px;
  }

  .order-info__title {
    font-family: "cooper-black-std", serif;
    font-weight: 400;
    color: white;
    font-size: 24px;
    letter-spacing: 1.08px;
    line-height: normal;
    margin: 0;
    margin-bottom: 20px;
  }

  .order-info__shoe-type,
  .order-info__user-name,
  .order-info__user-address,
  .order-info__user-email,
  .order-info__shoe-size,
  .order-info__status {
    font-size: 14px;
  }
}
</style>
