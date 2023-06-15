import { CGFobject } from '../lib/CGF.js';

export class MyTangram extends CGFobject {

	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
			3, 1, 0,    //2
			1, 1, 0     //3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
			1, 2, 3,

			// to draw the other side
			3, 1, 0,
			3, 2, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	draw(scene, withBase = false) {

		if (withBase) {
			scene.pushMatrix();
			scene.rotate(Math.PI / 180 * 270, 1, 0, 0);
			scene.translate(0.5, -1, 1);

			scene.tangram.draw(scene);

			scene.pushMatrix();
			scene.translate(0, 0.5, -0.51);
			scene.cube.display();
			scene.popMatrix();

			scene.popMatrix();

			return;
		}


		scene.pushMatrix();
		scene.translate(-1, 0, 0); // global offset


		scene.pushMatrix();
		scene.translate(-1, 0.3, 0);
		scene.rotate(Math.PI / 180 * 90, 0, 1, 0);
		scene.square.display();
		scene.popMatrix();


		scene.pushMatrix();
		scene.translate(0, 1, 0);
		scene.triangleBig1.display();
		scene.popMatrix();


		scene.pushMatrix();
		scene.translate(0, 1, 0);
		scene.scale(1, -1, 1);
		scene.triangleBig2.display();
		scene.popMatrix();


		scene.pushMatrix();
		scene.translate(2, 0, 0);
		scene.triangleSmall1.display();
		scene.popMatrix();


		scene.pushMatrix();
		scene.scale(0.72, 0.72, 0.72)
		scene.translate(-2.07, 1.12, 0);
		scene.rotate(Math.PI / 180 * 315, 0, 0, 1);
		scene.triangleSmall2.display();
		scene.popMatrix();


		scene.pushMatrix();
		scene.translate(-1.14, 2.14, 0);
		scene.scale(1.2, 1.2, 1.2);
		scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		scene.triangleSmall3.display();
		scene.popMatrix();


		scene.pushMatrix();
		scene.translate(5, 0, 0);
		scene.scale(-1, 1, 1);
		scene.parallelogram.display();
		scene.popMatrix();


		scene.popMatrix(); // global offset
	}


}
