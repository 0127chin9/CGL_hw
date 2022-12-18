import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { buildScene, shootFirework } from './buildScene';

var camera, scene, renderer;

init();
animate();

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set (100,200,100);
  
  const controls = new OrbitControls( camera, renderer.domElement );

  ////////////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  scene.add(gridXZ);
  
  buildScene();
  setInterval(shootFirework, 500);
}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

export {scene};
