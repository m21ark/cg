import { MyBirdMove } from './MyBirdMove.js'

export class MyBird extends MyBirdMove {
    constructor(scene) {
        super(scene, "#bird")

        // movement variables
        this.MAX_VEL = 15.0

        this.angY = 0
        this.vel = 0
        this.pos = [0, 0, 0]

        this.movingDown = false
        this.movingUp = false
        this.lastYBeforeDown = 0
        this.pickedEgg = null

        this.PICK_DISTANCE = 1.5;
        this.TOLERANCE = 2.0;
        this.NEST_TOLERANCE = 5.0;
    }


    display() {

        this.scene.pushMatrix()
        this.scene.birdShader.setUniformsValues({ uAmplitude: 40.0 })
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2])
        this.scene.rotate(this.angY, 0, 1, 0)
        this.scene.scale(0.1, 0.1, 0.1)
        this.scene.rotate(Math.PI, 0, 1, 0)
        super.display()
        this.scene.popMatrix()

        if (this.pickedEgg != null) {
            this.scene.pushMatrix()
            this.scene.eggMaterial.apply()
            this.scene.birdShader.setUniformsValues({ uAmplitude: 4.0 });
            this.scene.translate(this.pos[0], this.pos[1] - this.PICK_DISTANCE, this.pos[2])
            this.pickedEgg.superDisplay()
            this.scene.popMatrix()
        }
    }

}
