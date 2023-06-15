import { CGFobject } from '../lib/CGF.js';

export class MyCube extends CGFobject {

	constructor(scene, vertices = null) {
		super(scene);
		if (vertices == null)
			this.vertices = [
				0, 0, 0,	//0
				0, 0, 1,	//1
				0, 1, 0,	//2
				0, 1, 1,    //3
				1, 0, 0,	//4
				1, 0, 1,	//5
				1, 1, 0,	//6
				1, 1, 1,    //7
			];
		else
			this.vertices = vertices;
		this.initBuffers();
	}

	initBuffers() {
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0,
			2, 1, 3,
			3, 1, 2,
			4, 5, 6,
			6, 5, 4,
			6, 5, 7,
			7, 5, 6,
			0, 4, 2,
			2, 4, 0,
			2, 4, 6,
			6, 4, 2,
			1, 5, 3,
			3, 5, 1,
			3, 5, 7,
			7, 5, 3,
			0, 1, 4,
			4, 1, 0,
			4, 1, 5,
			5, 1, 4,
			2, 3, 6,
			6, 3, 2,
			6, 3, 7,
			7, 3, 6
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}