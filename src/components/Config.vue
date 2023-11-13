<template>
    <div class="canvas-container" ref="canvasContainer"></div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export default{
    mounted(){
        const windowWidth = window.innerWidth*2;
        const ratio = windowWidth / window.innerHeight;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight*0.5);
        renderer.setPixelRatio(window.devicePixelRatio);
        this.$refs.canvasContainer.appendChild(renderer.domElement);
        
        camera.position.z = 5;

        const loadingManager = new THREE.LoadingManager();

        const gltfLoader = new GLTFLoader(loadingManager);

        const controls = new OrbitControls(camera, renderer.domElement);
        
        scene.background = new THREE.Color(0xffffff);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.7);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.7);
        const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.7);
        directionalLight.position.set(0, 0, 1);
        directionalLight2.position.set(0, 0, -1);
        directionalLight3.position.set(0, 1, 0);
        scene.add(directionalLight);
        scene.add(directionalLight2);
        scene.add(directionalLight3);
        

        let shoe;

        //add shoe model
        gltfLoader.load('src/assets/models/new-shoe.glb', (gltf) => {
            shoe = gltf.scene;
            shoe.scale.set(2.5, 2.5, 2.5);
            shoe.rotation.y = 1.5;
            shoe.position.z = 0;
            shoe.position.y = -0.5;
            shoe.position.x = -0.5;
            scene.add(shoe);
        });        

        const animate = () => {
            requestAnimationFrame(animate);
            
            renderer.render(scene, camera);
        };

        animate();
    },
}
</script>

<style scoped>

#threeContainers{
    width: 100%;
    height: 50vh;
}
</style>