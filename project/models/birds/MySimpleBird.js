import { CGFappearance } from '../../../lib/CGF.js'
import { MyTriangle } from "../elementars/MyTriangle.js"
import { MyUnitCube } from '../elementars/MyUnitCube.js'
import { MySphere } from './../elementars/MySphere.js'
import { MyBirdMove } from './MyBirdMove.js'

export class MySimpleBird extends MyBirdMove {

	scaleMatrix(popMatrix, scale) {
		for (var i = 0; i < popMatrix.length / 3; i++) {
			let aux = i * 3
			popMatrix[aux] *= scale[0]
			popMatrix[aux + 1] *= scale[1]
			popMatrix[aux + 2] *= scale[2]
		}
		return popMatrix
	}

	translateMatrix(popMatrix, translate) {

		for (var i = 0; i < popMatrix.length / 3; i++) {
			let aux = i * 3
			popMatrix[aux] += translate[0]
			popMatrix[aux + 1] += translate[1]
			popMatrix[aux + 2] += translate[2]
		}
		return popMatrix
	}

	rotateVerticesX(vertices, ang) {
		const cos = Math.cos(ang)
		const sin = Math.sin(ang)

		for (let i = 0; i < vertices.length; i += 3) {
			const y = vertices[i + 1]
			const z = vertices[i + 2]

			vertices[i + 1] = y * cos - z * sin
			vertices[i + 2] = y * sin + z * cos
		}

		return vertices
	}

	rotateVerticesY(vertices, ang) {
		const cos = Math.cos(ang)
		const sin = Math.sin(ang)

		for (let i = 0; i < vertices.length; i += 3) {
			const x = vertices[i]
			const z = vertices[i + 2]

			vertices[i] = x * cos + z * sin
			vertices[i + 2] = -x * sin + z * cos
		}

		return vertices
	}

	rotateVerticesZ(vertices, ang) {
		const cos = Math.cos(ang)
		const sin = Math.sin(ang)

		for (let i = 0; i < vertices.length; i += 3) {
			const x = vertices[i]
			const y = vertices[i + 1]

			vertices[i] = x * cos - y * sin
			vertices[i + 1] = x * sin + y * cos
		}

		return vertices
	}

	constructor(scene) {
		super(scene)
		this.initBuffers()

		// ==================== Right Eye ====================

		this.rightEye = new MyUnitCube(scene)
		let cubeV = this.rightEye.vertices
		cubeV = this.rotateVerticesY(cubeV, Math.PI / 3)
		cubeV = this.translateMatrix(cubeV, [2, 3, 11.7])
		cubeV = this.scaleMatrix(cubeV, [3, 3, 3])
		this.rightEye.vertices = cubeV
		this.rightEye.initBuffers()

		// ==================== Left Eye ====================

		this.leftEye = new MyUnitCube(scene)
		let cubeV2 = this.leftEye.vertices
		cubeV2 = this.rotateVerticesY(cubeV2, -Math.PI / 3)
		cubeV2 = this.translateMatrix(cubeV2, [-2, 3, 11.7])
		cubeV2 = this.scaleMatrix(cubeV2, [3, 3, 3])
		this.leftEye.vertices = cubeV2
		this.leftEye.initBuffers()

		// ==================== Nozzle ====================

		this.nozzle = new MyUnitCube(scene)
		let cubeV3 = this.nozzle.vertices
		cubeV3 = this.rotateVerticesX(cubeV3, Math.PI / 4)
		cubeV3 = this.translateMatrix(cubeV3, [0, 0, 3.6])
		cubeV3 = this.scaleMatrix(cubeV3, [4, 6, 10])
		this.nozzle.vertices = cubeV3
		this.nozzle.initBuffers()

		// ==================== Legs ====================

		this.leg1 = new MyUnitCube(scene)
		let cubeV4 = this.leg1.vertices
		cubeV4 = this.translateMatrix(cubeV4, [2.4, -0.49, -4])
		cubeV4 = this.scaleMatrix(cubeV4, [3, 30, 3])
		this.leg1.vertices = cubeV4
		this.leg1.initBuffers()

		this.leg2 = new MyUnitCube(scene)
		let cubeV5 = this.leg2.vertices
		cubeV5 = this.translateMatrix(cubeV5, [-2.4, -0.49, -4])
		cubeV5 = this.scaleMatrix(cubeV5, [3, 30, 3])
		this.leg2.vertices = cubeV5
		this.leg2.initBuffers()

		// ==================== Paws ====================

		this.paw1 = new MyTriangle(scene, [
			1, -1, 0,	//0
			-1, 1, 0,	//1
			-1, -1, 0,	//2
		])

		let cubeV6 = this.paw1.vertices
		cubeV6 = this.rotateVerticesX(cubeV6, Math.PI / 2)
		cubeV6 = this.rotateVerticesY(cubeV6, -Math.PI / 4 - Math.PI)
		cubeV6 = this.translateMatrix(cubeV6, [1.5, -3, -1.3])
		cubeV6 = this.scaleMatrix(cubeV6, [5, 10, 13])
		this.paw1.vertices = cubeV6
		this.paw1.initBuffers()

		this.paw2 = new MyTriangle(scene, [
			1, -1, 0,	//0
			-1, 1, 0,	//1
			-1, -1, 0,	//2
		])

		let cubeV7 = this.paw2.vertices
		cubeV7 = this.rotateVerticesX(cubeV7, Math.PI / 2)
		cubeV7 = this.rotateVerticesY(cubeV7, -Math.PI / 4 - Math.PI)
		cubeV7 = this.translateMatrix(cubeV7, [-1.5, -3, -1.3])
		cubeV7 = this.scaleMatrix(cubeV7, [5, 10, 13])
		this.paw2.vertices = cubeV7
		this.paw2.initBuffers()

		// ==================== Wings ====================

		let trianglesBase = [
			1, 0, -1, 	//0
			-1, 0, 1, 	//1
			-1, 0, -1,	//2
		]

		let t1 = [...trianglesBase]
		let t2 = [...trianglesBase]

		t2 = this.scaleMatrix(t2, [-1, 1, 1])
		t1 = this.translateMatrix(t1, [1, 0, 0.7])
		t2 = this.translateMatrix(t2, [-1, 0, 0.7])

		t1 = this.scaleMatrix(t1, [50, 0, -33])
		t2 = this.scaleMatrix(t2, [50, 0, -33])

		this.triangle1 = new MyTriangle(scene, t1)
		this.triangle2 = new MyTriangle(scene, t2)

		// ==================== Body ====================

		this.sphere = new MySphere(scene, 20, 25)
		let sphereV = this.sphere.vertices
		sphereV = this.translateMatrix(sphereV, [0, 0, -4])
		sphereV = this.scaleMatrix(sphereV, [0.65, 0.65, 2.4])
		this.sphere.vertices = sphereV
		this.sphere.initGLBuffers()

		// ==================== Head ====================

		this.head = new MySphere(scene, 20, 25)
		let headV = this.head.vertices
		headV = this.translateMatrix(headV, [0, 6, 28.5])
		headV = this.scaleMatrix(headV, [0.75, 0.75, 0.8])
		this.head.vertices = headV
		this.head.initGLBuffers()

		// ==================== Tail ====================

		let t3 = [...trianglesBase]
		t3 = this.scaleMatrix(t3, [50, 0, 50])
		this.tail = new MyTriangle(scene, t3)
		let tailV = this.tail.vertices
		tailV = this.rotateVerticesY(tailV, 3 * Math.PI / 4)
		tailV = this.scaleMatrix(tailV, [0.5, -0.5, 0.5])
		tailV = this.translateMatrix(tailV, [0, 0, -80])
		this.tail.vertices = tailV
		this.tail.initGLBuffers()

		// ==================== Movement Variables ====================

		this.MAX_VEL = 15.0

		this.angY = 0
		this.vel = 0
		this.pos = [0, 0, 0]

		this.movingDown = false
		this.movingUp = false
		this.lastYBeforeDown = 0
		this.pickedEgg = null

		this.PICK_DISTANCE = 4.4
		this.TOLERANCE = 5
		this.NEST_TOLERANCE = 5
	}


	createMaterial(r, g, b) {
		let material = new CGFappearance(this.scene)
		material.setAmbient(0.6, 0.6, 0.6, 1)
		material.setDiffuse(0.9, 0.9, 0.9, 1)
		material.setSpecular(0.4, 0.4, 0.4, 1)
		material.setColor(r, g, b, 1)
		material.setShininess(5.0)
		return material
	}

	applyMaterial(colorHex) {
		this.createMaterial(...this.scene.hexToRgbA(colorHex)).apply()
	}


	display() {

		this.scene.pushMatrix()

		// movement
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2])
		this.scene.rotate(this.angY, 0, 1, 0)
		this.scene.scale(-0.1, 0.1, -0.1)

		// body
		this.scene.pushMatrix()
		this.scene.whiteTex.bind(0)
		this.scene.birdShader.setUniformsValues({ uAmplitude: 40.0 })
		this.sphere.display()
		this.scene.popMatrix()

		// head
		this.scene.pushMatrix()
		this.scene.whiteTex.bind(0)
		this.head.display()
		this.scene.popMatrix()

		// legs
		this.scene.pushMatrix()
		this.leg1.display()
		this.leg2.display()
		this.scene.popMatrix()

		// wings
		this.scene.pushMatrix()
		this.scene.featherTex.bind(0)
		this.triangle1.display()
		this.triangle2.display()
		this.scene.popMatrix()

		// tail
		this.scene.pushMatrix()
		this.tail.display()
		this.scene.popMatrix()

		// eyes
		this.scene.pushMatrix()
		this.scene.blueTex.bind(0)
		this.rightEye.display()
		this.leftEye.display()
		this.scene.popMatrix()

		// bick
		this.scene.pushMatrix()
		this.scene.orangeTex.bind(0)
		this.nozzle.display()
		this.scene.popMatrix()

		// paws
		this.scene.pushMatrix()
		this.paw1.display()
		this.paw2.display()
		this.scene.popMatrix()

		this.scene.popMatrix()

		if (this.pickedEgg != null) {
			this.scene.pushMatrix()
			this.scene.eggMaterial.apply()
			this.scene.birdShader.setUniformsValues({ uAmplitude: 4.0 });
			this.scene.translate(this.pos[0], this.pos[1] - this.PICK_DISTANCE, this.pos[2] + 0.3)
			this.pickedEgg.superDisplay()
			this.scene.popMatrix()
		}

	}

}
