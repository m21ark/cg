import { CGFinterface, dat } from '../lib/CGF.js'

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super()
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this

        // disable the processKeyboard function
        this.processKeyboard = function () { }

        // create a named array to store which keys are being pressed
        this.activeKeys = {}
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false
    }


    init(application) {
        // call CGFinterface init
        super.init(application)

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI()

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis')
        this.gui.add(this.scene, 'displayNormals').name('Display Normals')
        this.gui.add(this.scene, 'displayTerrain').name('Display Terrain')
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere')
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama')
        this.gui.add(this.scene, 'displayBird').name('Display Bird')
        this.gui.add(this.scene, 'displayNest').name('Display Nest')
        this.gui.add(this.scene, 'displayWater').name('Display Water')
        this.gui.add(this.scene, 'displayTreeGroup').name('Display Tree G')
        this.gui.add(this.scene, 'displayTreeRow').name('Display Tree R')

        this.gui.add(this.scene, 'selectedBird', this.scene.objectList).onChange(this.scene.onselectedBirdChanged.bind(this.scene)).name('Bird Type')
        this.gui.add(this.scene, 'selectedNest', this.scene.nestList).onChange(this.scene.onselectedNestChanged.bind(this.scene)).name('Nest Type')

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor')
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor')

        this.initKeys()
        return true
    }
}
