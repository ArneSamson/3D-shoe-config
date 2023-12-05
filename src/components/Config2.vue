<template>
  <div class="shoe-configurator">
    <progress
      class="progbar"
      :value="progbarValue"
      :max="progbarMax"
    ></progress>

    <div class="canvas-container" ref="canvasContainer"></div>

    <div class="configurator">
      <a
        class="configurator__arrow"
        @click="
          if (currentPartIndex > 0) {
            currentPartIndex--;
            updateCameraPosition();
          } else {
            currentPartIndex = 3;
            updateCameraPosition();
          }
        "
      >
        ←
      </a>

      <div
        class="configurator__flex"
        v-if="
          (currentPartIndex && currentPartIndex < 4) || currentPartIndex == 0
        "
      >
        <div>
          <p class="configurator__subtitle" style="text-transform: capitalize">
            {{ shoePart }} ({{ currentPartIndex + 1 }}/4)
          </p>
        </div>

        <!-- Color Options (for 'laces' and 'sole' parts) -->
        <div v-if="shoePart === 'laces' || shoePart === 'sole'">
          <div class="configurator__flex2">
            <div
              v-for="color in colorOptions"
              :key="color"
              class="configurator__options"
              @click="updateColor(shoePart, color)"
            >
              <div
                class="configurator__circle"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Material Options (for 'inside' and 'outside' parts) -->
        <div v-else>
          <div class="configurator__flex2">
            <div
              v-for="material in materialOptions"
              :key="material"
              class="configurator__options"
              @click="updateMaterial(materialPart, material)"
            >
              <div
                class="configurator__circle"
                :style="{ backgroundImage: `url(${material})` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <a
        class="configurator__arrow"
        @click="
          if (currentPartIndex < 3) {
            currentPartIndex++;
            updateCameraPosition();
          } else {
            currentPartIndex = 0;
            updateCameraPosition();
          }
        "
      >
        →
      </a>
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

    <div v-if="formError" class="configurator__error-message">
      {{ formError }}
    </div>
    <button @click="handleDoneButtonClick">Send order!</button>
    <router-link to="/config2"
      ><button class="router">Go to AIR REV. NITRO S</button></router-link
    >
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
import TWEEN from "tween.js";

const router = useRouter();

export default {
  setup() {},
  data() {
    return {
      shoeParts: ["laces", "sole", "inside", "outside"],
      materialParts: ["bottom", "top"],
      currentPartIndex: 0,
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
      colorOptions: ["#ffd700", "#88FF00", "#00FFA6", "#A200FF"],
      materialOptions: [
        "/textures/lexica-1.webp",
        "/textures/lexica-2.webp",
        "/textures/lexica-3.webp",
        "/textures/lexica-4.webp",
      ],
      progbarValue: 0,
      progbarMax: 4,
      progressState: false,
    };
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;

    const windowWidth = window.innerWidth * 2;
    const ratio = windowWidth / window.innerHeight;

    const clock = new THREE.Clock();

    const scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
      .setPath("/cubemap/jpg/")
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
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

    let shoeGroup = new THREE.Group();
    shoeGroup.rotation.order = "YXZ";

    shoeGroup.rotation.x = 0;
    shoeGroup.rotation.y = 4.8;
    shoeGroup.rotation.z = -0.5;

    shoeGroup.position.z = -1.5;
    shoeGroup.position.y = -1.5;
    shoeGroup.position.x = -1;

    let shoe;

    this.textureLoader = new TextureLoader();

    gltfLoader.load("/models/vans-shoe.glb", (gltf) => {
      shoe = gltf.scene;
      shoe.scale.set(1, 1, 1);

      shoeGroup.add(shoe);
    });

    const resetCamera = () => {
      const initialPosition = { x: 0, y: 0, z: 7 };
      const initialRotation = { x: 0, y: 0, z: 0 };

      new TWEEN.Tween(camera.position)
        .to(initialPosition, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to(initialRotation, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    };

    const updateCameraPosition = (currentPartIndex) => {
      resetCamera();

      const targetValues = getTargetValues(this.currentPartIndex);

      new TWEEN.Tween(shoeGroup.rotation)
        .to({ x: targetValues.rotationX, y: targetValues.rotationY }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(shoeGroup.position)
        .to({ y: targetValues.positionY, z: targetValues.positionZ }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    };

    const getTargetValues = (currentPartIndex) => {
      switch (this.currentPartIndex) {
        case 0:
          return {
            rotationX: 0,
            rotationY: 4.8,
            rotationZ: -0.5,
            positionX: -1,
            positionY: -1.5,
            positionZ: -1.5,
          };
        case 1:
          return {
            rotationX: 0.6,
            rotationY: 2.8,
            rotationZ: -0.5,
            positionX: -1,
            positionY: -0.5,
            positionZ: 1,
          };
        case 2:
          return {
            rotationX: 0,
            rotationY: 4,
            rotationZ: -0.5,
            positionX: -1,
            positionY: -1.5,
            positionZ: -1.5,
          };
        case 3:
          return {
            rotationX: 0,
            rotationY: -0.5,
            rotationZ: -0.5,
            positionX: -1,
            positionY: -1.5,
            positionZ: -1.5,
          };
        default:
          return {
            rotationX: 0,
            rotationY: 4.8,
            rotationZ: -0.5,
            positionX: -1,
            positionY: -1.5,
            positionZ: -1.5,
          };
      }
    };

    this.updateCameraPosition = updateCameraPosition;

    const updateColor = (colorType, hexColor) => {
      if (shoe) {
        let material;
        switch (colorType) {
          case "laces":
            handleProgress("laces");
            material = shoe.getObjectByName("laces").material;
            this.selectedColors.shoeColorLaces = hexColor;
            break;
          case "sole":
            handleProgress("sole");
            const soleObject = shoe.getObjectByName("sole");
            const heelTipObject = shoe.getObjectByName("heel-tip");
            const soleMaterial = soleObject.material.clone();
            const tipHeelMaterial = heelTipObject.material.clone();
            soleMaterial.color.setStyle(hexColor);
            tipHeelMaterial.color.setStyle(hexColor);
            soleObject.material = soleMaterial;
            heelTipObject.material = tipHeelMaterial;
            this.selectedColors.shoeColorSole = hexColor;
            break;
          case "inside":
            handleProgress("inside");
            const insideObject = shoe.getObjectByName("main");
            const insideMaterial = insideObject.material.clone();
            insideMaterial.color.setStyle(hexColor);
            insideObject.material = insideMaterial;
            this.selectedColors.shoeColorPanelDown = hexColor;
            break;
          case "outside":
            handleProgress("outside");
            const outsideObject = shoe.getObjectByName("sides");
            const outsideMaterial = outsideObject.material.clone();
            outsideMaterial.color.setStyle(hexColor);
            outsideObject.material = outsideMaterial;
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
            handleProgress("top");
            const topObject = shoe.getObjectByName("sides");
            const topMaterial = topObject.material.clone();
            topMaterial.map = new THREE.TextureLoader().load(textureUrl);
            topMaterial.needsUpdate = true;
            topObject.material = topMaterial;
            this.selectedMaterials.shoeMaterialPanelUp = textureUrl;
            break;
          case "bottom":
            handleProgress("bottom");
            const bottomObject = shoe.getObjectByName("main");
            const bottomMaterial = bottomObject.material.clone();
            bottomMaterial.map = new THREE.TextureLoader().load(textureUrl);
            bottomMaterial.needsUpdate = true;
            bottomObject.material = bottomMaterial;
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
      TWEEN.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleProgress = (selectedItem) => {
      switch (selectedItem) {
        case "laces":
          if (this.selectedColors.shoeColorLaces === null) {
            this.progbarValue += 1;
          }
          break;
        case "sole":
          if (this.selectedColors.shoeColorSole === null) {
            this.progbarValue += 1;
          }
          break;
        case "inside":
          if (this.selectedColors.shoeColorPanelDown === null) {
            this.progbarValue += 1;
          }
          break;
        case "outside":
          if (this.selectedColors.shoeColorPanelUp === null) {
            this.progbarValue += 1;
          }
          break;
        case "top":
          if (this.selectedMaterials.shoeMaterialPanelUp === null) {
            this.progbarValue += 1;
          }
          break;
        case "bottom":
          if (this.selectedMaterials.shoeMaterialPanelDown === null) {
            this.progbarValue += 1;
          }
          break;
        default:
          break;
      }

      if (this.progbarValue === this.progbarMax && !this.progressState) {
        onProgressComplete();
        this.progressState = true;
      }
    };

    this.handleProgress = handleProgress;

    const onProgressComplete = () => {
      const particleGeometry = new THREE.BufferGeometry();
      const count = 400;
      const spreadDistance = 10;

      let vertices = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        vertices[i] = THREE.MathUtils.randFloatSpread(1);
      }
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        transparent: true,
        opacity: 1,
        map: this.textureLoader.load("/particle/flower.png"),
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const animateConfetti = () => {
        const elapsedTime = clock.getElapsedTime();
        const speedFactor = 0.01;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;

          const x = particleGeometry.attributes.position.array[i3];
          const y = particleGeometry.attributes.position.array[i3 + 1];
          const z = particleGeometry.attributes.position.array[i3 + 2];

          particleGeometry.attributes.position.array[i3] = x + x * speedFactor;
          particleGeometry.attributes.position.array[i3 + 1] =
            y + y * speedFactor + Math.sin(elapsedTime * 2 + i) * 0.01;
          particleGeometry.attributes.position.array[i3 + 2] =
            z + z * speedFactor + Math.cos(elapsedTime * 2 + i) * 0.01;

          if (particleGeometry.attributes.position.array[i3 + 1] > 3) {
            particleGeometry.attributes.position.array[i3 + 1] =
              -spreadDistance;
          }
        }

        particleGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);

        requestAnimationFrame(animateConfetti);
      };

      animateConfetti();
    };

    this.onProgressComplete = onProgressComplete;

    scene.add(shoeGroup);
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
    materialPart() {
      return this.materialParts[this.currentPartIndex - 2];
    },
  },
};
</script>
