import { CGFappearance, CGFobject } from '../../../lib/CGF.js'
import { MyBillboard } from './MyBillboard.js'

// Tree material --> texturas retiradas de PNGWING --> https://www.pngwing.com/en/free-png-txqzn/download
export class MyTreeGroupPatch extends CGFobject {

	constructor(scene, coords = [0, 0, 0]) {

		super(scene)

		this.x = coords[0]
		this.y = coords[1]
		this.z = coords[2]

		this.trees = []
		this.textures = []

		this.tree1 = new CGFappearance(scene)
		this.tree1.setAmbient(1, 1, 1, 1)
		this.tree1.setDiffuse(0.6, 0.6, 0.6, 1)
		this.tree1.setSpecular(0.7, 0.7, 0.7, 1)
		this.tree1.setShininess(10.0)
		this.tree1.loadTexture('images/tree1.png')
		this.tree1.setTextureWrap('REPEAT', 'REPEAT')

		this.tree2 = new CGFappearance(scene)
		this.tree2.setAmbient(1, 1, 1, 1)
		this.tree2.setDiffuse(0.6, 0.6, 0.6, 1)
		this.tree2.setSpecular(0.7, 0.7, 0.7, 1)
		this.tree2.setShininess(10.0)
		this.tree2.loadTexture('images/tree2.png')
		this.tree2.setTextureWrap('REPEAT', 'REPEAT')

		this.tree3 = new CGFappearance(scene)
		this.tree3.setAmbient(1, 1, 1, 1)
		this.tree3.setDiffuse(0.6, 0.6, 0.6, 1)
		this.tree3.setSpecular(0.7, 0.7, 0.7, 1)
		this.tree3.setShininess(10.0)
		this.tree3.loadTexture('images/tree3.png')
		this.tree3.setTextureWrap('REPEAT', 'REPEAT')

		let tree_spacing = 12

		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++)
				this.trees.push(new MyBillboard(this.scene, [this.x + (i * tree_spacing), this.y, this.z + (j * tree_spacing)]))


		// randomize tree textures
		for (let i = 0; i < this.trees.length; i++) {

			let rand = Math.random()

			if (rand < 0.3)
				this.textures[i] = this.tree1
			else if (rand < 0.65)
				this.textures[i] = this.tree2
			else
				this.textures[i] = this.tree3

		}

		// randomize tree positions
		for (let i = 0; i < this.trees.length; i++) {

			let rand = Math.random()

			if (rand < 0.5)
				this.trees[i].x += Math.random() * 1.5
			else
				this.trees[i].x -= Math.random() * 1.5

			rand = Math.random()

			if (rand < 0.5)
				this.trees[i].z += Math.random() * 1.5
			else
				this.trees[i].z -= Math.random() * 1.5
		}

		// randomize tree scales
		for (let i = 0; i < this.trees.length; i++) {

			let rand = Math.random()

			if (rand < 0.5)
				this.trees[i].scale = 8 + Math.random() * 2
			else
				this.trees[i].scale = 9.5 + Math.random() * 3

		}

	}

	display() {
		for (let i = 0; i < this.trees.length; i++) {
			this.textures[i].apply()
			this.trees[i].display()
		}

	}

	update() {
		for (let i = 0; i < this.trees.length; i++)
			this.trees[i].update()
	}


}
