import { MyObject } from "./../objects/MyObject.js"

export class MyBirdMove extends MyObject {
    accelerate(keyPresses) {
        if (keyPresses.includes('A')) {
            if (this.vel == 0)
                this.angY += 0.2 * this.scene.speedFactor
            else
                this.angY += 0.2 * Math.min(Math.abs(this.vel), 1) * this.scene.speedFactor
        }
        if (keyPresses.includes('D')) {
            if (this.vel == 0)
                this.angY -= 0.2 * this.scene.speedFactor
            else
                this.angY -= 0.2 * Math.min(Math.abs(this.vel), 1) * this.scene.speedFactor
        }
    }

    turn(keyPresses) {
        if (keyPresses.includes('W')) {
            this.vel -= 0.2 * this.scene.speedFactor
            this.vel = Math.max(this.vel, -this.MAX_VEL)
        }
        if (keyPresses.includes('S')) {
            this.vel += 0.2 * this.scene.speedFactor;
            this.vel = Math.min(this.vel, this.MAX_VEL)
            this.vel = Math.min(this.vel, 0)
        }
    }

    flight(keyPresses) {
        if (keyPresses.includes('B')) {
            this.pos[1] += 2
        }
        if (keyPresses.includes('F')) {
            this.pos[1] -= 2
        }
        if (keyPresses.includes('P') && !this.movingDown && !this.movingUp) {
            this.movingDown = true
            this.lastYBeforeDown = this.pos[1]
        }
    }

    pickEgg() {
        if (this.pickedEgg == null) {
            let tol = this.TOLERANCE
            let nearestEgg = null
            for (let egg in this.scene.eggs) {
                let eggObj = this.scene.eggs[egg]
                let dx = eggObj.x - this.pos[0]
                let dz = eggObj.z - this.pos[2]
                let dis = Math.sqrt(dx * dx + dz * dz)
                if (dis <= tol) {
                    // circular collision
                    if (nearestEgg == null || dis <
                        Math.sqrt((nearestEgg.x - this.pos[0]) * (nearestEgg.x - this.pos[0]) + (nearestEgg.z - this.pos[2]) * (nearestEgg.z - this.pos[2]))) {
                        nearestEgg = egg
                    }
                }
            }
            if (nearestEgg != null) {
                this.pickedEgg = this.scene.eggs[nearestEgg]
                delete this.scene.eggs[nearestEgg]
            }
        }
    }

    updatePos() {
        this.pos[0] += this.vel * Math.sin(this.angY)
        this.pos[2] += this.vel * Math.cos(this.angY)

        if (this.movingDown) {
            this.pos[1] -= 2
            if (this.pos[1] <= -26.3) {
                this.movingDown = false
                this.movingUp = true
                this.pickEgg()
            }
        }
        if (this.movingUp) {
            this.pos[1] += 2
            if (this.pos[1] >= this.lastYBeforeDown) {
                this.movingUp = false
            }
        }

        return this.pos
    }

    dropEgg(keyPresses) {
        if (keyPresses.includes('O') && this.pickedEgg != null) {
            let nest = this.scene.selectedNest == 0 ? this.scene.nest : this.scene.nestSimple

            if (Math.abs((nest.pos[0] + nest.OFFSET_OF_NEST) - this.pos[0]) < this.NEST_TOLERANCE
                && Math.abs(nest.pos[2] - this.pos[2]) < this.NEST_TOLERANCE) {
                this.pickedEgg.y = this.pos[1]
                this.pickedEgg.x = this.pos[0]
                this.pickedEgg.z = this.pos[2]
                nest.fallingEggs.push(this.pickedEgg)

                this.pickedEgg = null
            }
        }
    }


    update(keyPresses) {

        if (keyPresses.includes('R')) {
            this.pos = [0, 0, 0]
            this.vel = 0
            this.angY = 0
        }

        this.accelerate(keyPresses)
        this.turn(keyPresses)
        this.flight(keyPresses)
        this.dropEgg(keyPresses)
        return [this.updatePos(), this.angY]
    }

}