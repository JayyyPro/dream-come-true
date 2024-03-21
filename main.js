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
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

renderer.shadowMap.enabled = true;

function positionObjectAndLightOnIt(nameObject, x, y, z, rotationX, rotationY, rotationZ, xLight, yLight, zLight) {
    const spotLight = new THREE.SpotLight(0xffffff, 2, 50, Math.PI / 4, 1, 2);
    spotLight.position.set(xLight, yLight, zLight);
    spotLight.distance = 20;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.focus = 1;
    scene.add(spotLight);

    loader.load(nameObject, (gltf) => {
        const material = new THREE.MeshLambertMaterial();
        let meshObject;
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                meshObject = child;
            }
        });
        const mesh = new THREE.Mesh( meshObject.geometry, meshObject.material );
        mesh.position.set(x, y, z);
        mesh.scale.set(1.5, 1.5, 1.5);
        if (rotationX != null) mesh.rotation.x = rotationX;
        if (rotationY != null) mesh.rotation.y = rotationY;
        if (rotationZ != null) mesh.rotation.z = rotationZ;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add( mesh );
        spotLight.target = mesh;
    });
}

// item 1 : chair
positionObjectAndLightOnIt('chair.glb', 0, 0, -25, Math.PI / 2, null, -Math.PI / 2, 2.5, 5, -25);

// item 2 : lamp
positionObjectAndLightOnIt('lamp.glb', 10, 0, -75, Math.PI / 2, null, null, 10, 5, -75);

// item 3 : ketchup
positionObjectAndLightOnIt('ketchup.glb', -10, 0, -115, Math.PI / 2, null, null, -12.5, 5, -117.5);

// item 4 : bed
positionObjectAndLightOnIt('bed.glb', 10, 0, -200, Math.PI / 2, null, null, 10, 5, -200);

/* BEDROOM */
// make a wall
const wallVertical = new THREE.BoxGeometry(0.5, 5, 10);
const wallHorizontal = new THREE.BoxGeometry(10, 5, 0.5);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const wall1 = new THREE.Mesh(wallVertical, wallMaterial);
wall1.castShadow = true;
wall1.position.set(-5, 2.5, 0);
scene.add(wall1);
const wall2 = new THREE.Mesh(wallHorizontal, wallMaterial);
wall2.castShadow = true;
wall2.position.set(0, 2.5, 5);
scene.add(wall2);
const wall3 = new THREE.Mesh(wallVertical, wallMaterial);
wall3.castShadow = true;
wall3.position.set(5, 2.5, 0);
wall3.castShadow = true;
scene.add(wall3);
const wall4 = new THREE.Mesh(wallHorizontal, wallMaterial);
wall4.position.set(0, 2.5, -5);
wall4.castShadow = true;
scene.add(wall4);

const spotLight1 = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 3, 1, 1);
spotLight1.position.set(0, 5, 0);
spotLight1.castShadow = true;
spotLight1.shadow.mapSize.width = 1024;
spotLight1.shadow.mapSize.height = 1024;
spotLight1.shadow.camera.near = 1;
spotLight1.shadow.camera.far = 10;
spotLight1.shadow.focus = 1;
const spotLight2 = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 3, 1, 1);
spotLight2.position.set(0, 5, 5);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 1;
spotLight2.shadow.camera.far = 10;
spotLight2.shadow.focus = 1;
const spotLight3 = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 3, 1, 1);
spotLight3.position.set(0, 5, -5);
spotLight3.castShadow = true;
spotLight3.shadow.mapSize.width = 1024;
spotLight3.shadow.mapSize.height = 1024;
spotLight3.shadow.camera.near = 1;
spotLight3.shadow.camera.far = 10;
spotLight3.shadow.focus = 1;
const spotLight4 = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 3, 1, 1);
spotLight4.position.set(5, 5, 0);
spotLight4.castShadow = true;
spotLight4.shadow.mapSize.width = 1024;
spotLight4.shadow.mapSize.height = 1024;
spotLight4.shadow.camera.near = 1;
spotLight4.shadow.camera.far = 10;
spotLight4.shadow.focus = 1;
const spotLight5 = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 3, 1, 1);
spotLight5.position.set(-5, 5, 0);
spotLight5.castShadow = true;
spotLight5.shadow.mapSize.width = 1024;
spotLight5.shadow.mapSize.height = 1024;
spotLight5.shadow.camera.near = 1;
spotLight5.shadow.camera.far = 10;
spotLight5.shadow.focus = 1;
const targetLights = new THREE.Object3D();
targetLights.position.set(0, 2.5, 0);
spotLight1.target = targetLights;
spotLight2.target = targetLights;
spotLight3.target = targetLights;
spotLight4.target = targetLights;
spotLight5.target = targetLights;

// make a group with the walls and the lights
const bedroom = new THREE.Group();
bedroom.add(wall1);
bedroom.add(wall2);
bedroom.add(wall3);
bedroom.add(wall4);
bedroom.add(spotLight1);
bedroom.add(spotLight2);
bedroom.add(spotLight3);
bedroom.add(spotLight4);
bedroom.add(spotLight5);
bedroom.add(targetLights);
bedroom.position.set(20, 0, -300);
scene.add(bedroom);

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
