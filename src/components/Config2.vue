<template>
  <div class="shoe-configurator">
    <div class="canvas-container" ref="canvasContainer"></div>
    <progress
      class="progbar"
      :value="progbarValue"
      :max="progbarMax"
    ></progress>
    <div class="configurator">
      <a
        class="configurator__arrow"
        @click="
          if (currentPartIndex > 0) {
            currentPartIndex--;
            updateCameraPosition();
          } else {
            currentPartIndex = 2;
            updateCameraPosition();
          }
        "
      >
        ←
      </a>

      <div
        class="configurator__flex"
        v-if="
          (currentPartIndex && currentPartIndex < 3) || currentPartIndex == 0
        "
      >
        <div>
          <p class="configurator__subtitle" style="text-transform: capitalize">
            {{ shoePart }} ({{ currentPartIndex + 1 }}/3)
          </p>
        </div>

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

        <div class="configurator__AIGenerator" v-else>
          <input v-model="textInput" placeholder="Enter text..." />
          <button class="configurator__generateButton" @click="generateImage">
            Generate
          </button>
          <div v-if="loading">Loading...</div>
        </div>
      </div>
      <a
        class="configurator__arrow"
        @click="
          if (currentPartIndex < 2) {
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

    <button v-if="progressState" class="configurator__button" @click="goToInfo">
      I'm finished!
    </button>

    <h2 class="user-details__title" v-if="progressState" ref="infoSection">
      Your information:
    </h2>
    <div v-if="progressState" class="user-details">
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
    <button v-if="progressState" @click="handleDoneButtonClick">
      Send order!
    </button>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useRouter } from "vue-router";
import TWEEN from "tween.js";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const router = useRouter();

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

export default {
  setup() {},
  data() {
    return {
      textInput: "",
      generatedImage: null,
      textureUrl: "",
      loading: false,

      shoeParts: ["laces", "sole", "main"],
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
      // materialOptions: [
      //   "/textures/lexica-1.webp",
      //   "/textures/lexica-2.webp",
      //   "/textures/lexica-3.webp",
      //   "/textures/lexica-4.webp",
      // ],
      progbarValue: 0,
      progbarMax: 3,
      progressState: false,
    };
  },
  mounted() {
    const canvasContainer = this.$refs.canvasContainer;
    let windowWidth = window.innerWidth * 2;
    let windowHeight = window.innerHeight;
    const ratio = windowWidth / windowHeight;

    const clock = new THREE.Clock();

    const scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
      .setPath("/cubemap/golf/")
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
    const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    resize();
    window.addEventListener("resize", resize);
    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight * 0.78);
      camera.aspect =
        canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      if (window.innerWidth < 500) {
        renderer.setSize(window.innerWidth, window.innerHeight * 0.73);
        camera.aspect =
          canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
      }
    }

    camera.position.z = 9;

    const loadingManager = new THREE.LoadingManager();


    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/draco/' );
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader( dracoLoader );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;

    controls.minDistance = 4;
    controls.maxDistance = 10;

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

    //load shoePlatform.glb
    gltfLoader.load("/models/shoePlatform.glb", (gltf) => {
      const shoePlatform = gltf.scene;
      shoePlatform.scale.set(2.5, 2.5, 2.5);
      shoePlatform.position.z = -1;
      shoePlatform.position.y = -5;
      shoePlatform.position.x = -0.5;
      shoePlatform.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0,
            envMap: scene.background,
          });
        }
      });
      scene.add(shoePlatform);
    });

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
      shoe.position.y = -1;
      shoeGroup.add(shoe);
    });

    const resetCamera = () => {
      const initialPosition = { x: 0, y: 0, z: 9 };
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

    // const updateMaterial = (materialType, textureUrl) => {
    //   if (shoe) {
    //     const texture = this.textureLoader.load(textureUrl);

    //     texture.repeat.set(2, 2);
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;

    //     let material;
    //     switch (materialType) {
    //       case "top":
    //         handleProgress("top");
    //         const topObject = shoe.getObjectByName("sides");
    //         const topMaterial = topObject.material.clone();
    //         topMaterial.map = new THREE.TextureLoader().load(textureUrl);
    //         topMaterial.needsUpdate = true;
    //         topObject.material = topMaterial;
    //         this.selectedMaterials.shoeMaterialPanelUp = textureUrl;
    //         break;
    //       case "bottom":
    //         handleProgress("bottom");
    //         const bottomObject = shoe.getObjectByName("main");
    //         const bottomMaterial = bottomObject.material.clone();
    //         bottomMaterial.map = new THREE.TextureLoader().load(textureUrl);
    //         bottomMaterial.needsUpdate = true;
    //         bottomObject.material = bottomMaterial;
    //         this.selectedMaterials.shoeMaterialPanelDown = textureUrl;
    //         break;
    //       default:
    //         break;
    //     }

    //     if (material) {
    //       material.map = texture;
    //       material.needsUpdate = true;
    //     }
    //   }
    // };

    // this.updateMaterial = updateMaterial;

    const updateMaterialAI = () => {
      if (shoe && this.textureUrl) {
        console.log("updateMaterialAI");
        const texture = this.textureLoader.load(this.textureUrl);

        texture.repeat.set(2, 2);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        handleProgress("generatedImage");
        const topObject = shoe.getObjectByName("sides");
        const topMaterial = topObject.material.clone();
        topMaterial.map = texture;
        topMaterial.needsUpdate = true;
        topObject.material = topMaterial;
        this.selectedMaterials.shoeMaterialPanelUp = this.textureUrl;

        const bottomObject = shoe.getObjectByName("main");
        const bottomMaterial = bottomObject.material.clone();
        bottomMaterial.map = texture;
        bottomMaterial.needsUpdate = true;
        bottomObject.material = bottomMaterial;
        this.selectedMaterials.shoeMaterialPanelDown = this.textureUrl;
      }
    };

    this.updateMaterialAI = updateMaterialAI;

    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
      renderer.render(scene, camera);
      shoeGroup.position.y = Math.sin(clock.getElapsedTime()) * 0.2 - 0.8;
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
        case "generatedImage":
          if (this.selectedMaterials.shoeMaterialPanelUp === null && this.selectedMaterials.shoeMaterialPanelDown === null) {
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
    goToInfo() {
      this.$refs.infoSection.scrollIntoView({ behavior: "smooth" });
    },
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
          shoeType: "AIR REV. XTRA BLACK",
          shoeSize: this.shoeSize,
          shoeColorSole: this.selectedColors.shoeColorSole,
          shoeColorLaces: this.selectedColors.shoeColorLaces,
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

          if (data && data.data && data.data.shoe && data.data.shoe._id) {
            const newId = data.data.shoe._id;
            this.$router.push({ path: "/thankyou", query: { id: newId } });
          } else {
            console.error("Invalid server response format");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async generateImage() {
      try {
        this.loading = true;
        const imageData = await query({ inputs: this.textInput });
        const imageUrl = URL.createObjectURL(imageData);
        this.generatedImage = imageUrl;
        this.textureUrl = imageUrl; // Store the generated image URL

        if (this.generatedImage) {
          this.loading = false;
          //call the updateMaterialAI function
          this.updateMaterialAI();
        }
      } catch (error) {
        console.error("Error generating image:", error);
      }
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
