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

    },
}
</script>