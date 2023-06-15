import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyParallelogram } from "./old_geometry/MyParallelogram.js";
import { MySquare } from "./old_geometry/MySquare.js";
import { MyTriangleSmall } from "./old_geometry/MyTriangleSmall.js";
import { MyTriangleBig } from "./old_geometry/MyTriangleBig.js";

export class MyTangram extends CGFobject {

	constructor(scene) {
		super(scene);
		this.initBuffers();

		this.square = new MySquare(scene);
		this.parallelogram = new MyParallelogram(scene);

		this.triangleSmall1 = new MyTriangleSmall(scene);
		this.triangleSmall3 = new MyTriangleSmall(scene, [
			0, 0,
			0.25, 0.25,
			0, 0.5
		]);
		this.triangleSmall2 = new MyTriangleSmall(scene, [
			0, 0.5,
			0, 1,
			0.5, 1
		]);

		this.triangleBig1 = new MyTriangleBig(scene);
		this.triangleBig2 = new MyTriangleBig(scene, [
			0, 0,
			1, 0,
			0.5, 0.5
		]);


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

	hexToRgbA(hex) {
		var ret;
		//either we receive a html/css color or a RGB vector
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			ret = [
				parseInt(hex.substring(1, 3), 16).toPrecision() / 255.0,
				parseInt(hex.substring(3, 5), 16).toPrecision() / 255.0,
				parseInt(hex.substring(5, 7), 16).toPrecision() / 255.0,
				1.0
			];
		}
		else
			ret = [
				hex[0].toPrecision() / 255.0,
				hex[1].toPrecision() / 255.0,
				hex[2].toPrecision() / 255.0,
				1.0
			];
		return ret;
	}


	applyMaterial(colorHex) {
		this.createMaterial(...this.hexToRgbA(colorHex)).apply();
	}


	display() {



		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 180 * 180, 0, 1, 0);
		this.square.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.scale(0.72, 0.72, 0.72)
		this.scene.translate(-2.07, 0.70, 0);
		this.scene.rotate(Math.PI / 180 * 315, 0, 0, 1);
		//this.applyMaterial("#ff0000");
		this.triangleSmall1.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(-1.14, 1.84, 0);
		this.scene.scale(1.2, 1.2, 1.2);
		this.scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		//this.applyMaterial("#FF9BD1");
		this.triangleSmall2.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(1.4, 2.39, 0);
		this.scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		//this.applyMaterial("#FF9C36");
		this.triangleBig1.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.scale(1, -1, 1);
		this.scene.translate(1.4, 0.43, 0);
		this.scene.rotate(Math.PI / 180 * 135, 0, 0, 1);
		//this.applyMaterial("#009EF8");
		this.triangleBig2.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		this.scene.translate(5.8, 0, 0);
		this.scene.scale(-1, 1, 1);
		//this.applyMaterial("#FFFF50");
		this.parallelogram.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();
		//this.applyMaterial("#B44CBE");
		this.scene.translate(2.8, 0, 0);
		this.triangleSmall3.display();
		this.scene.popMatrix();


	}


	updateBuffers() { }


}
