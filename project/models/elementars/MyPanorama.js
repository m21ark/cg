import { CGFobject } from '../../../lib/CGF.js'

export class MyPanorama extends CGFobject {

	constructor(scene, slices, stacks) {

		super(scene)
		this.slices = slices
		this.stacks = stacks

		this.radius = 600

		this.normx = 0
		this.normy = 0
		this.normz = 0

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

					// outer sphere
					this.indices.push(a, b + 1, b)
					this.indices.push(a, a + 1, b + 1)

					// inner sphere
					this.indices.push(b, b + 1, a)
					this.indices.push(b + 1, a + 1, a)

				}
			}

		this.primitiveType = this.scene.gl.TRIANGLES
		this.initGLBuffers()
	}


	update() {
		let camx = this.scene.camera.position[0]
		let camy = this.scene.camera.position[1]
		let camz = this.scene.camera.position[2]

		let dx = camx - this.x
		let dy = camy - this.y
		let dz = camz - this.z

		let norm = Math.sqrt(dx * dx + dy * dy + dz * dz)

		this.normx = dx / norm
		this.normy = dy / norm
		this.normz = dz / norm

	}

}
