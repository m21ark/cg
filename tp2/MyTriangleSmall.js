import { CGFobject } from '../lib/CGF.js';

export class MyTriangleSmall extends CGFobject {

	constructor(scene, vertices = null) {
		super(scene);
		if (vertices == null)
			this.vertices = [
				-1, 0, 0, //0
				0, 1, 0, //1
				1, 0, 0 //2
			];
		else
			this.vertices = vertices;
		this.initBuffers();
	}

	initBuffers() {
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}