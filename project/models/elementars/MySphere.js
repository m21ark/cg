import { CGFobject } from '../../../lib/CGF.js'

export class MySphere extends CGFobject {

	constructor(scene, slices, stacks, radius = 20) {

		super(scene)
		this.slices = slices
		this.stacks = stacks

		this.radius = radius

		this.initBuffers()

	}

	initBuffers() {
		this.indices = []
		this.normals = []
		this.vertices = []
		this.texCoords = []

		let alphaAng = Math.PI / this.stacks

		for (let stack = 0; stack <= this.stacks; stack++)
			for (let slice = 0; slice <= this.slices; slice++) {
				let theta = slice * (2 * Math.PI / this.slices)
				let sinTheta = Math.sin(theta)
				let cosTheta = Math.cos(theta)

				let x = cosTheta * Math.sin(stack * alphaAng)
				let y = Math.cos(stack * alphaAng)
				let z = sinTheta * Math.sin(stack * alphaAng)

				let pos = [x, y, z]

				this.vertices.push(...pos.map((p) => p * this.radius))
				this.normals.push(...pos)
				this.texCoords.push(1 - slice / this.slices, stack / this.stacks)

				if (stack != this.stacks && slice != this.slices) {

					let a = stack * (this.slices + 1) + slice
					let b = a + this.slices + 1

					this.indices.push(a, b + 1, b)
					this.indices.push(a, a + 1, b + 1)

				}
			}

		this.primitiveType = this.scene.gl.TRIANGLES
		this.initGLBuffers()
	}

	updateBuffers(complexity) {
		this.initBuffers()

		this.initNormalVizBuffers()
	}

}
