import * as THREE from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 100, 0.1, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0x23f63 } );
const floor = new THREE.Mesh( geometry, material );
floor.position.y = -0.5;
scene.add( floor );

const positionCube = [{x: 0, z: 0}];
const geometry2 = new THREE.BoxGeometry( 1.5, 2, 0.5 );
const material2 = new THREE.MeshBasicMaterial( { color: 0x25f23 } );
const material3 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
let cube = new THREE.Mesh( geometry2, material2 );
let animateCube = false;
cube.position.x = Math.random() * 10 - 5;
cube.position.z = Math.random() * 10 - 5;
positionCube.push({x: cube.position.x, z: cube.position.z});
scene.add( cube );


camera.position.z = 5;

window.onkeydown = window.onkeyup = function(e){
    var e = e || event;
    key[e.keyCode] = e.type === 'keydown';
};
const key = [];
(function loop(){
    var y = 0, l = key.length, i, t;
    for(i = 0; i < l; i ++){
        if(key[i]){
            t = i + ' (0x'+i.toString(16)+')';
            let x = 0;
            let z = 0;
            if (t === "65 (0x41)") {
                x = Math.cos(camera.rotation.y) * 0.05;
                z = Math.sin(camera.rotation.y) * 0.05;
                camera.position.x -= x;
                camera.position.z += z;
                if(checkCollision()){
                    camera.position.x += x;
                    camera.position.z -= z;
                }
            }
            else if (t === "87 (0x57)") {
                x = Math.sin(camera.rotation.y) * 0.05;
                z = Math.cos(camera.rotation.y) * 0.05;
                camera.position.x -= x;
                camera.position.z -= z;
                if(checkCollision()){
                    camera.position.x += x;
                    camera.position.z += z;
                }
            }
            else if (t === "68 (0x44)") {
                x = Math.cos(camera.rotation.y) * 0.05;
                z = Math.sin(camera.rotation.y) * 0.05;
                camera.position.x += x;
                camera.position.z -= z;
                if(checkCollision()){
                    camera.position.x -= x;
                    camera.position.z += z;
                }
            }
            else if (t === "83 (0x53)") {
                x = Math.sin(camera.rotation.y) * 0.05;
                z = Math.cos(camera.rotation.y) * 0.05;
                camera.position.x += x;
                camera.position.z += z;
                if(checkCollision()){
                    camera.position.x -= x;
                    camera.position.z -= z;
                }
            }
            y += 22;
        }
    }
    setTimeout(loop,1000/60);
})();

// Marche un peu mais c'est encore cassé. C'est dog shit
function checkCollision() {
    for (let i = 0; i < positionCube.length; i++) {
        if (camera.position.x < positionCube[1].x + 1.5 &&
            camera.position.x + 1.5 > positionCube[1].x &&
            camera.position.z < positionCube[1].z + 0.7 &&
            camera.position.z > positionCube[1].z) {
            cube = new THREE.Mesh( geometry2, material3 );
            return true;
        }
    }
    return false;
}

window.addEventListener("mousemove", (event) => {
    // Lock pointer
    window.addEventListener("click", (event) => {
        renderer.domElement.requestPointerLock();
    })

    // Rotate Y axis
    if (document.pointerLockElement === renderer.domElement) {
        camera.rotation.y -= event.movementX * 0.001;
    }
});

window.addEventListener("keyup", (e) =>{
    if (e.key === "e"){
        if (animateCube){
            animateCube = false
            document.getElementById("info").innerText = "Stu fa là maudit malade?!"
        }
        else{
            animateCube = true
            document.getElementById("info").innerText = "Comment ça ça bouge ? Jpense que chu fatigué..."

        }
    }
})
function animate() {
    requestAnimationFrame( animate );

    if (animateCube === true){
        cube.translateY("0.01")
        cube.rotation.x += 0.01;
    }
    renderer.render( scene, camera );
}
animate();

