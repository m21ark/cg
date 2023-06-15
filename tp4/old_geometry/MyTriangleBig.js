import { CGFobject } from '../../lib/CGF.js';

export class MyTriangleBig extends CGFobject {

	constructor(scene, texCoords = null) {
		super(scene);

		if (texCoords == null)
			this.texCoords = [
				1, 0,
				0.5, 0.5,
				1, 1,
			];

		else
			this.texCoords = texCoords

		this.initBuffers();
	}

	initBuffers() {
		//Counter-clockwise reference of vertices
		this.vertices = [
			-2, 0, 0, //0
			0, 2, 0, //1
			2, 0, 0 //2
		];


		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}