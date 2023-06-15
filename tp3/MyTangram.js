import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "../tp3/MyDiamond.js";
import { MyTriangle } from "../tp3/MyTriangle.js";
import { MyParallelogram } from "../tp3/MyParallelogram.js";
import { MySquare } from "../tp3/MySquare.js";
import { MyTriangleSmall } from "../tp3/MyTriangleSmall.js";
import { MyTriangleBig } from "../tp3/MyTriangleBig.js";

export class MyTangram extends CGFobject {

	constructor(scene) {
		super(scene);
		this.initBuffers();


		this.diamond = new MyDiamond(scene);

		this.square = new MySquare(scene);

		this.triangle = new MyTriangle(scene, [
			-1, 0, 0, //0
			0, 1, 0, //1
			1, 0, 0 //2
		]);


		this.triangleSmall = new MyTriangleSmall(scene);
		this.triangleBig = new MyTriangleBig(scene);

		this.parallelogram = new MyParallelogram(scene);
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

	createMaterial(r, g, b) {
		let material = new CGFappearance(this.scene)
		material.setAmbient(0.6, 0.6, 0.6, 1);
		material.setDiffuse(0.9, 0.9, 0.9, 1);
		material.setSpecular(0.4, 0.4, 0.4, 1);
		material.setColor(r, g, b, 1);
		material.setShininess(5.0);
		return material;
	}

	applyMaterial(colorHex) {
		this.createMaterial(...this.scene.hexToRgbA(colorHex)).apply();
	}


	display() {



		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 180 * 180, 0, 1, 0);
		this.scene.customMaterial.apply();
		this.square.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.scale(0.72, 0.72, 0.72)
		this.scene.translate(-2.07, 0.70, 0);
		this.scene.rotate(Math.PI / 180 * 315, 0, 0, 1);
		this.applyMaterial("#ff0000");
		this.triangleSmall.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(-1.14, 1.84, 0);
		this.scene.scale(1.2, 1.2, 1.2);
		this.scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		this.applyMaterial("#FF9BD1");
		this.triangleSmall.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(1.4, 2.39, 0);
		this.scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		this.applyMaterial("#FF9C36");
		this.triangleBig.display();
		this.scene.popMatrix();
		

		this.scene.pushMatrix();
		this.scene.scale(1, -1, 1);
		this.scene.translate(1.4, 0.43, 0);
		this.scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		this.applyMaterial("#009EF8");
		this.triangleBig.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(5.8, 0, 0);
		this.scene.scale(-1, 1, 1);
		this.applyMaterial("#FFFF50");
		this.parallelogram.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.applyMaterial("#B44CBE");
		this.scene.translate(2.8, 0, 0);
		this.triangleSmall.display();
		this.scene.popMatrix();


	}

	enableNormalViz() {
		this.diamond.enableNormalViz();
		this.triangle.enableNormalViz();
		this.triangleSmall.enableNormalViz();
		this.triangleBig.enableNormalViz();
		this.parallelogram.enableNormalViz();
		this.square.enableNormalViz();


	}

	disableNormalViz() {
		this.diamond.disableNormalViz();
		this.triangle.disableNormalViz();
		this.triangleSmall.disableNormalViz();
		this.triangleBig.disableNormalViz();
		this.parallelogram.disableNormalViz();
		this.square.disableNormalViz();

	}



	updateBuffers() { }


}
