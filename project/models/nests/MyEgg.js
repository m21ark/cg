import { CGFobject } from '../../../lib/CGF.js'

let birdPrototype = null

export class MyEgg extends CGFobject {

	constructor(scene, slices, stacks, alphaAngle, betaAngle, coords = [0, 0, 0]) {

		super(scene)
		this.slices = slices
		this.stacks = stacks

		this.radius = 1

		if (birdPrototype == null) {
			this.initBuffers()
			birdPrototype = Object.create(this)
		} else {
			// reusing the same buffers to improve performance
			Object.setPrototypeOf(this, birdPrototype)
		}

		this.x = coords[0]
		this.y = coords[1]
		this.z = coords[2]

		this.alphaAngle = alphaAngle
		this.betaAngle = betaAngle
	}

	normalizeVector(vector) {
		let norm = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2])
		return [vector[0] / norm, vector[1] / norm, vector[2] / norm]
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

				// SOURCE --- https://math.stackexchange.com/questions/1490990/equation-of-a-3d-egg
				let x = (1 + 0.2 * stack * alphaAng) * cosTheta * Math.sin(stack * alphaAng)
				let y = 1.65 * Math.cos(stack * alphaAng)
				let z = (1 + 0.2 * stack * alphaAng) * sinTheta * Math.sin(stack * alphaAng)

				let pos = [x, y, z]

				this.vertices.push(...pos.map((p) => p * this.radius))
				this.normals.push(...this.normalizeVector(pos))
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

	superDisplay() {
		super.display()
	}

	display() {
		this.scene.pushMatrix()
		this.scene.translate(this.x, this.y, this.z)
		this.scene.rotate(this.alphaAngle, 1, 0, 0)
		this.scene.rotate(this.betaAngle, 0, 1, 0)
		super.display()
		this.scene.popMatrix()
	}

	updateBuffers() {
		this.initBuffers()
		this.initNormalVizBuffers()
	}

}
