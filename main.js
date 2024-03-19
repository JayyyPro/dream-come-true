import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.y = 1;

const controls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    speed: 0.1,
    shiftPressed: false,
    baseSpeed: 0.1,
    runningSpeed: 0.2
};

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
    if (event.code === 'ShiftLeft') {
        controls.shiftPressed = true;
    }
    updateControls();
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
    if (event.code === 'ShiftLeft') {
        controls.shiftPressed = false;
    }
    updateControls();
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
