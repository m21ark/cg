import { CGFobject } from '../lib/CGF.js';

export class MyQuadCube extends CGFobject {

	constructor(scene, textureArray = []) {
		super(scene);
		this.textureArray = textureArray
	}

	initBuffers() {
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	display() {

		let scene = this.scene;

		// Top
		scene.pushMatrix();
		scene.translate(0, 0.5, 0);
		scene.rotate(Math.PI / 2, 1, 0, 0);
		scene.quadMaterial.setTexture(this.textureArray[0]);
		scene.quadMaterial.apply()
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		scene.quad.display();
		scene.popMatrix();

		// Sides
		scene.pushMatrix();
		scene.translate(0, 0, 0.5);
		scene.quadMaterial.setTexture(this.textureArray[1]);
		scene.quadMaterial.apply()
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		scene.quad.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(0, 0, -0.5);
		scene.quadMaterial.setTexture(this.textureArray[1]);
		scene.quadMaterial.apply()
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		scene.quad.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(0.5, 0, 0);
		scene.rotate(Math.PI / 2, 0, 1, 0);
		scene.quadMaterial.setTexture(this.textureArray[1]);
		scene.quadMaterial.apply()
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		scene.quad.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(-0.5, 0, 0);
		scene.rotate(Math.PI / 2, 0, 1, 0);
		scene.quadMaterial.setTexture(this.textureArray[1]);
		scene.quadMaterial.apply()
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		scene.quad.display();
		scene.popMatrix();

		// Bottom
		scene.pushMatrix();
		scene.translate(0, -0.5, 0);
		scene.rotate(Math.PI / 2, 1, 0, 0);
		scene.quadMaterial.setTexture(this.textureArray[2]);
		scene.quadMaterial.apply()
		scene.gl.texParameteri(scene.gl.TEXTURE_2D, scene.gl.TEXTURE_MAG_FILTER, scene.gl.NEAREST);
		scene.quad.display();
		scene.popMatrix();


	}

}