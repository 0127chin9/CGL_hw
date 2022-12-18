import { SpriteText2D, MeshText2D, textAlign } from '@kinyoklion/three-text2d/dist/three-text2d.js';
import * as THREE from 'three';

import {scene} from './main-3';

var t = 0;

var fireworks = [
	new SpriteText2D("TextFirework", { align: textAlign.center, font: '10px Arial',
    fillStyle: '#000000', antialias: true }),
	new SpriteText2D("TextFirework", { align: textAlign.center, font: '10px Arial',
    fillStyle: '#000000', antialias: true }),
	new SpriteText2D("TextFirework", { align: textAlign.center, font: '10px Arial',
    fillStyle: '#000000', antialias: true })
];

function buildScene() {
	let box = new THREE.Mesh (new THREE.BoxGeometry(20,20,10), new THREE.MeshNormalMaterial());
	scene.add (box);

	let textRight = new MeshText2D("RIGHT", { align: textAlign.right, font: '20px Arial',
	fillStyle: '#000000', antialias: true });
	textRight.position.set(-30, 0, 0);
	
	let textLeft = new MeshText2D("LEFT", { align: textAlign.left, font: '20px Arial',
    fillStyle: '#000000', antialias: true });	
	textLeft.position.set(30, 0, 0);
	
	scene.add(textLeft, textRight);
	
	let sprite = new SpriteText2D("CGL HW", {
		align: textAlign.center,
		font: '10px Arial',
		fillStyle: '#000000',
		antialias: true
	});
	sprite.position.set(0, 0, 100);
	scene.add(sprite);
	scene.add(fireworks[0], fireworks[1], fireworks[2]);
}

function shootFirework(){
	if(t==1){
		t=0;
	}
	t+=0.2;
	fireworks[0].position.set(30+(60*t), t*50, 30);
	fireworks[1].position.set(-5-(70*t), t*90, 20);
	fireworks[2].position.set(-35-(20*t), t*70, -15);
}

export { buildScene, shootFirework };

