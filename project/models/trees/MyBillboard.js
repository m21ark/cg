import { CGFobject } from '../../../lib/CGF.js'
import { MyQuad } from './../elementars/MyQuad.js'

export class MyBillboard extends CGFobject {

	constructor(scene, coords = [0, 0, 0]) {

		super(scene)

		this.x = coords[0]
		this.y = coords[1]
		this.z = coords[2]

		this.normx = 0
		this.normy = 0
		this.normz = 0

		this.scale = 5

		this.quad = new MyQuad(this.scene)

	}

	display() {
		this.scene.pushMatrix()
		this.scene.translate(this.x, this.y, this.z)

		// para fazer o quad olhar para a camera em x e z
		this.scene.rotate(Math.atan2(this.normx, this.normz), 0, 1, 0)

		this.scene.scale(this.scale, this.scale, this.scale)
		this.quad.display()
		this.scene.popMatrix()

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
