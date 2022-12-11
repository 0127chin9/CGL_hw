import * as THREE from "https://threejs.org/build/three.module.js"
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';

var camera, scene, renderer, ball;

var keys;
var T = 3;
var clock = new THREE.Clock();

function makeBall() {
  var geometry = new THREE.Group();
  var normalMat = new THREE.MeshNormalMaterial({
    wireframe: true
  });
  var body = new THREE.Mesh(new THREE.SphereGeometry(15, 15, 32), normalMat);
  var nose = new THREE.Mesh(new THREE.BoxGeometry(25, 4, 7), normalMat);
  nose.position.x = 25 / 2;
  geometry.add(body, nose);
  return geometry;
}

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(300, 400, 500); // camera at (0,0,500)
  let controls = new OrbitControls(camera, renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
  ////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(300, 30, 'red', 'white');
  scene.add(gridXZ);

  ball = makeBall();
  scene.add(ball);

  ///////////////////
  var pos1 = new THREE.Vector3(40, 15, 50);
  var pos2 = new THREE.Vector3(20, 65, -50);
  var pos3 = new THREE.Vector3(-50, 35, 0);
  var euler1 = new THREE.Euler(Math.PI * 0.25, Math.PI * 0.55, 0);
  var euler2 = new THREE.Euler(-Math.PI * 0.05, Math.PI * 1.27, -Math.PI * 0.15);
  var euler3 = new THREE.Euler(0, -Math.PI * 0.15, -Math.PI * 0.17);
  var quad1 = new THREE.Quaternion().setFromEuler(euler1);
  var quad2 = new THREE.Quaternion().setFromEuler(euler2);
  var quad3 = new THREE.Quaternion().setFromEuler(euler3);
  keys = [
    [0, pos1, quad1],
    [0.333, pos2, quad2],
    [0.6666, pos3, quad3],
    [1, pos1, quad1]
  ];
}

function changeT(t) {
	T = t;
}

function easeInOutBack(x) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5 ?
    (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
    (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

function keyframe(t) {
  var s = (t % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }

  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);

  a = easeInOutBack(a);

  ball.position.lerpVectors(keys[ii][1], keys[ii + 1][1], a);
  ball.quaternion.slerpQuaternions(keys[ii][2], keys[ii + 1][2], a);
}

function animate() {
  keyframe(clock.getElapsedTime());

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export {init, animate, changeT}
export {ball, camera, scene, renderer}