import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parall');
        this.gui.add(this.scene, 'displaySquare').name('Display Square');
        this.gui.add(this.scene, 'displayCube').name('Display Cube');
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Small Triangle');
        this.gui.add(this.scene, 'displayTriangleBig').name('Display Big Triangle');
        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');
        this.gui.add(this.scene, 'displayQuad').name('Display Quad');
        this.gui.add(this.scene, 'displayQuadCube').name('Display QuadCube');

        this.gui.add(this.scene, 'deltaX', -5, 5).name('Delta X');
        this.gui.add(this.scene, 'deltaY', -5, 5).name('Delta Y');
        this.gui.add(this.scene, 'deltaZ', -5, 5).name('Delta Z');

        this.gui.add(this.scene, 'angleX', 0, 360).name('Angle X');
        this.gui.add(this.scene, 'angleY', 0, 360).name('Angle Y');
        this.gui.add(this.scene, 'angleZ', 0, 360).name('Angle Z');

        this.gui.add(this.scene, 'reflectX').name('Reflect X')
        this.gui.add(this.scene, 'reflectY').name('Reflect Y')
        this.gui.add(this.scene, 'reflectZ').name('Reflect Z')


        //
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}
