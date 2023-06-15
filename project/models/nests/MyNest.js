import { CGFobject } from '../../../lib/CGF.js'

export class MyNest extends CGFobject {
  constructor(scene) {
    super(scene)

    this.initBuffers()


    this.Y_PLANE = -29
    this.OFFSET_OF_NEST = 15.5

    this.pos = [-115, -29, -10]

    this.angsEggs = [[Math.PI / 4, 0],
    [0, 0],
    [-Math.PI / 6, 0],
    [0, 0],
    [0, 0],
    [-Math.PI / 6, 2 * Math.PI]]

    this.posEggs = [[13, 2.6, 0.7],
    [15.5, 2.6, 0],
    [18, 2.6, 0],
    [13.5, 2.6, -2.5],
    [16, 2.6, -2.5],
    [15.5, 2.6, 2.5]]


    this.fallingEggs = []
    this.eggs = []
  }

  displayEggs() {
    this.scene.eggMaterial.apply()
    for (let egg in this.eggs) {
      if (this.eggs[egg] == null)
        continue
      this.eggs[egg].display()
    }
  }

  displayFallingEggs() {
    this.scene.eggMaterial.apply()
    for (let egg in this.fallingEggs) {
      if (this.fallingEggs[egg] == null)
        continue


      this.fallingEggs[egg].y -= 2.0;
      this.fallingEggs[egg].y = Math.max(this.fallingEggs[egg].y, this.Y_PLANE)

      this.fallingEggs[egg].display()

      if (this.fallingEggs[egg].y <= this.Y_PLANE) {
        this.fallingEggs[egg].alphaAngle = this.angsEggs[this.eggs.length][0]
        this.fallingEggs[egg].betaAngle = this.angsEggs[this.eggs.length][1]
        this.fallingEggs[egg].x = this.posEggs[this.eggs.length][0] + this.pos[0]
        this.fallingEggs[egg].y = this.posEggs[this.eggs.length][1] + this.pos[1]
        this.fallingEggs[egg].z = this.posEggs[this.eggs.length][2] + this.pos[2]
        this.eggs.push(this.fallingEggs[egg])
        delete this.fallingEggs[egg]
      }
    }
  }

  normalizeVector(vector) {
    let norm = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2])
    return [vector[0] / norm, vector[1] / norm, vector[2] / norm]
  }

  display() {
    this.scene.pushMatrix()
    this.scene.translate(this.pos[0] + this.OFFSET_OF_NEST, this.pos[1] + 4.0, this.pos[2])
    this.scene.rotate(Math.PI / 2, 1, 0, 0)
    super.display()
    this.scene.popMatrix()

    this.displayEggs()
    this.displayFallingEggs()
  }

  initBuffers() {

    // https://en.wikipedia.org/wiki/Torus
    this.indices = []
    this.normals = []
    this.vertices = []
    this.texCoords = []

    this.slices = 30
    this.stacks = 30

    this.radius = 3
    this.R = 3

    let alphaAng = Math.PI / this.stacks

    for (let stack = 0; stack <= this.stacks; stack++)
      for (let slice = 0; slice <= this.slices; slice++) {
        let theta = slice * (Math.PI / this.slices)
        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)

        let x = (this.R + this.radius * cosTheta) * Math.sin(stack * 2 * alphaAng)
        let y = (this.R + this.radius * cosTheta) * Math.cos(stack * 2 * alphaAng)
        let z = this.radius * sinTheta

        let pos = [x, y, z]

        // parte de fora do ninho
        this.vertices.push(...pos.map((p) => p))
        this.normals.push(...this.normalizeVector(pos))
        this.texCoords.push(1 - slice / this.slices, stack / this.stacks)




        if (stack != this.stacks && slice != this.slices) {

          let a = (stack * (this.slices + 1) + slice)
          let b = a + this.slices + 1
          this.indices.push(a, b + 1, b)
          this.indices.push(a, a + 1, b + 1)
        }
      }


    let lastIndex = this.vertices.length / 3

    for (let stack = 0; stack <= this.stacks; stack++)
      for (let slice = 0; slice <= this.slices; slice++) {
        let theta = slice * (Math.PI / this.slices)
        let sinTheta = Math.sin(theta)
        let cosTheta = Math.cos(theta)

        let x = (this.R + this.radius * cosTheta) * Math.sin(stack * 2 * alphaAng)
        let y = (this.R + this.radius * cosTheta) * Math.cos(stack * 2 * alphaAng)
        let z = this.radius * sinTheta

        //parte de dentro
        let pos = [y, x, z]

        this.vertices.push(...pos.map((p) => p))
        this.normals.push(...this.normalizeVector(pos))
        this.texCoords.push(1 - slice / this.slices, stack / this.stacks)


        if (stack != this.stacks && slice != this.slices) {

          let a = lastIndex + (stack * (this.slices + 1) + slice)
          let b = a + this.slices + 1

          this.indices.push(a, b + 1, b)
          this.indices.push(a, a + 1, b + 1)
        }
      }

    this.primitiveType = this.scene.gl.TRIANGLES
    this.initGLBuffers()
  }
}
