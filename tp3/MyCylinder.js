import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {

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
				let ca = Math.cos(ang);

				// add 2 vertices each iteration
				this.vertices.push(ca, sa, k * this.stack_size);
				this.vertices.push(ca, sa, (k + 1) * this.stack_size);

				// the normal for these 2 new vertices is the angle itself
				let normal = [
					Math.cos(ang),
					Math.sin(ang),
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

				// add the 2 normalized normal vectors for the 2 new vertices
				for (let j = 0; j < 2; j++)
					this.normals.push(...normal);

				// in the start we dont have 2 previous vertices to connect so we skip
				if (i === 0) {
					ang += alphaAng;
					continue
				}


				// take last 2 vertices and connect with the 2 new vertices
				let v0, v1, v2, v3
				v0 = (2 * i - 2) + (2 * this.slices * k)
				v1 = (2 * i - 1) + (2 * this.slices * k)
				v2 = (2 * i) + (2 * this.slices * k)
				v3 = (2 * i + 1) + (2 * this.slices * k)

				this.indices.push(
					v0, v1, v2,
					v1, v3, v2,
					v2, v3, v0,
					v3, v1, v0);

				ang += alphaAng;
			}

			// stitch last 2 new vertices back to the start
			let v0, v1, v2, v3
			v0 = (2 * this.slices - 2) + (2 * this.slices * k)
			v1 = (2 * this.slices - 1) + (2 * this.slices * k)
			v2 = (2 * this.slices * k)
			v3 = (2 * this.slices * k) + 1

			this.indices.push(
				v0, v1, v2,
				v1, v3, v2,
				v2, v3, v0,
				v3, v1, v0);
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers(complexity) {
		this.slices = 3 + Math.round(9 * complexity); //complexity leties 0-1, so slices leties 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}

}