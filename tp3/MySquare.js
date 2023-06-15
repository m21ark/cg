import { CGFobject } from '../lib/CGF.js';

export class MySquare extends CGFobject {

	constructor(scene, vertices = null) {
		super(scene);
		if (vertices == null)
			this.vertices = [
				0,0,0,
				1,0,0,
				0,1,0,
				1,1,0
			];
		else
			this.vertices = vertices;
		this.initBuffers();
	}

	initBuffers() {
		//Counter-clockwise reference of vertices
		this.indices = [

			0, 1, 2,
			3, 2, 1,

			2,1,0,
			1,2,3
				
			
		];

		this.normals = [
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
		];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}