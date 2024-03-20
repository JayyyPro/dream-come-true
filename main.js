import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

// white plane
const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// item 1 : chair
const spotLightChair = new THREE.SpotLight(0xffffff, 2, 50, Math.PI / 4, 1, 2);
spotLightChair.position.set(2.5, 5, -100);
spotLightChair.castShadow = true;
scene.add(spotLightChair);

loader.load('chair.glb', (gltf) => {
    const chair = gltf.scene;
    chair.position.set(0, 0, -100);
    chair.rotation.y = Math.PI / 2;
    scene.add(chair);
    spotLightChair.target = chair;
});

camera.position.z = 0;
camera.position.y = 2;
camera.position.x = 0;

const controls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    speed: 0.1,
    shiftPressed: false,
    ctrlPressed: false,
    baseSpeed: 0.1,
    runningSpeed: 0.2,
    mousePressed: false,
    mouseX: 0,
    mouseY: 0
};

const keys = {};

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    keys[event.code] = true;
    switch (event.code) {
        case 'ShiftLeft':
            controls.shiftPressed = true;
            break;
        case 'ControlLeft':
            controls.ctrlPressed = true;
            camera.position.y = 1;
            break;
    }
    updateControls();
});

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    keys[event.code] = false;
    switch (event.code) {
        case 'ShiftLeft':
            controls.shiftPressed = false;
            break;
        case 'ControlLeft':
            controls.ctrlPressed = false;
            camera.position.y = 2;
            break;
    }
    updateControls();
});

document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        controls.mousePressed = true;
        controls.mouseX = event.clientX;
        controls.mouseY = event.clientY;
    }
});

document.addEventListener('mouseup', () => {
    controls.mousePressed = false;
});

document.addEventListener('mousemove', (event) => {
    if (controls.mousePressed) {
        const deltaX = event.clientX - controls.mouseX;
        const sensitivity = 0.002;
        camera.rotation.y -= deltaX * sensitivity;
        controls.mouseX = event.clientX;
    }
});

function updateControls() {
    controls.moveForward = keys['KeyW'];
    controls.moveBackward = keys['KeyS'];
    controls.moveLeft = keys['KeyA'];
    controls.moveRight = keys['KeyD'];
}

function animate() {
    requestAnimationFrame(animate);

    if (controls.shiftPressed) {
        controls.speed = controls.runningSpeed;
    } else {
        controls.speed = controls.baseSpeed;
    }

    if (controls.moveForward) camera.translateZ(-controls.speed);
    if (controls.moveBackward) camera.translateZ(controls.speed);
    if (controls.moveLeft) camera.translateX(-controls.speed);
    if (controls.moveRight) camera.translateX(controls.speed);

    renderer.render(scene, camera);
}

animate();
