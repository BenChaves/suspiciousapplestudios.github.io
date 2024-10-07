import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(7);
//moveCamera()

//GEOMETRY
const geometry = new THREE.DodecahedronGeometry(10, 0);
const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
const die = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry(geometry, 1);
const edgeMat = new THREE.LineBasicMaterial({color: 0x39fc03});
const dieWire = new THREE.LineSegments(edges, edgeMat);

scene.add(dieWire)

die.scale.set(0.99, 0.99, 0.99)

//die.scale.set(0.8, 0.8, 0.8)

scene.add(die)

//LIGHTING
const pointlight = new THREE.PointLight(0xffffff, 40);
pointlight.position.set(10,10,10)

const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);

scene.add(pointlight, ambientlight)

//HELPERS 
/*
const lightHelper = new THREE.PointLightHelper(pointlight);
const grid = new THREE.GridHelper(200, 50);
*/

//scene.add(lightHelper, grid)

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

//STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)*2);

  star.position.set(x,y,z);
  scene.add(star)
}

//Array(200).fill().forEach(addStar) //add stars :D

//BACKGROUND
const bgTex = new THREE.TextureLoader().load('space.jpg');
//scene.background = bgTex;



//Scroll event
/*
function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  //move geo and other stuff here

  //camera movement
  camera.position.z = t * -0.01 + 20;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera
*/





//RENDER LOOP
function animate(){
  requestAnimationFrame(animate);
  //begin of render loop

  dieWire.rotation.x += 0.001; //rotate die
  dieWire.rotation.y += 0.001;
  dieWire.rotation.y += 0.0009;

  die.rotation.x += 0.001; //rotate die
  die.rotation.y += 0.001;
  die.rotation.y += 0.0009;

  //controls.update(); //may not be needed

  //end of render loop
  renderer.render(scene, camera);
}

animate()
