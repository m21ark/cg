import { MyObject } from './../objects/MyObject.js'

export class MySimpleNest extends MyObject {
  constructor(scene) {
    super(scene, "#nest")

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
        // ISTO ASSUMINDO QUE O OVOS nunca são removidos do array ...
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

  display() {
    this.scene.pushMatrix()
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2])
    super.display()
    this.scene.popMatrix()

    this.displayEggs()
    this.displayFallingEggs()
  }

}
