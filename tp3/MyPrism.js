import { CGFobject } from '../lib/CGF.js';

export class MyPrism extends CGFobject {

	constructor(scene, slices, stacks, stack_size) {
		super(scene);

		this.slices = slices
		this.stacks = stacks
		this.stack_size = stack_size

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		for (let k = 0; k < this.stacks; k++) {
			let ang = 0;
			let alphaAng = 2 * Math.PI / this.slices;
			for (let i = 0; i < this.slices; i++) {

				let sa = Math.sin(ang);
				let saa = Math.sin(ang + alphaAng);
				let ca = Math.cos(ang);
				let caa = Math.cos(ang + alphaAng);

				this.vertices.push(ca, sa, k * this.stack_size);
				this.vertices.push(caa, saa, k * this.stack_size);
				this.vertices.push(ca, sa, (k + 1) * this.stack_size);
				this.vertices.push(caa, saa, (k + 1) * this.stack_size);


				let saa2 = Math.sin(alphaAng / 2 + ang);
				let caa2 = Math.cos(alphaAng / 2 + ang);

				let normal = [
					caa2,
					saa2,
					0
				]

				// normalization
				let nsize = Math.sqrt(
					normal[0] * normal[0] +
					normal[1] * normal[1] +
					normal[2] * normal[2]
				);
				normal[0] /= nsize;
				normal[1] /= nsize;
				normal[2] /= nsize;

				for (let j = 0; j < 4; j++)
					this.normals.push(...normal);


				let v0 = (4 * i) + (4 * this.slices * k)
				let v1 = (4 * i + 1) + (4 * this.slices * k)
				let v2 = (4 * i + 2) + (4 * this.slices * k)
				let v3 = (4 * i + 3) + (4 * this.slices * k)

			
				this.indices.push(
					v0, v1, v2,
					v1, v3, v2,
					v2, v3, v0,
					v3, v1, v0);

				ang += alphaAng;
			}

			this.primitiveType = this.scene.gl.TRIANGLES;
			this.initGLBuffers();
		}
	}

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity leties 0-1, so slices leties 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}

}