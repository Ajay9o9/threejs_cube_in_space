import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer(
  {
    canvas: document.querySelector('#bg'),
  }
);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
const boxTexture = new THREE.TextureLoader().load('saltwater.jpg');

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(60);
camera.position.setX(60);

renderer.render(scene, camera);

const geometry = new THREE.BoxGeometry(
 25,25,25
);
const material = new THREE.MeshBasicMaterial(
  {
    map: boxTexture
  }
  
);

const torus = new THREE.Mesh(geometry, material);


scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper =  new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {

  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);

  scene.add(star);

}

Array(200).fill().forEach(addStar);


scene.background = spaceTexture;


function animate(){
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  torus.rotation.z += 0.008;

  controls.update();

  renderer.render(scene, camera);
}

animate();

