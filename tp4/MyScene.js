import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyTangram } from "../tp4/MyTangram.js";
import { MyQuad } from "./MyQuad.js";
import { MyQuadCube } from "./MyQuadCube.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.7, 0.7, 0.8, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.quad = new MyQuad(this);
        this.tangram = new MyTangram(this);



        let textureCube = []
        textureCube.push(new CGFtexture(this, 'images/mineTop.png'));
        textureCube.push(new CGFtexture(this, 'images/mineSide.png'));
        textureCube.push(new CGFtexture(this, 'images/mineBottom.png'));
        this.quadCube = new MyQuadCube(this, textureCube);

        

        //------ Applied Material
        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.quadMaterial.setDiffuse(0.6, 0.6, 0.6, 1);
        this.quadMaterial.setSpecular(0.3, 0.3, 0.3, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture('images/default.png');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/board.jpg');
        this.texture2 = new CGFtexture(this, 'images/floor.png');
        this.texture3 = new CGFtexture(this, 'images/window.jpg');
        this.texture4 = new CGFtexture(this, 'images/tangram.png');
        this.texture5 = new CGFtexture(this, 'images/mineTop.png');
        this.texture6 = new CGFtexture(this, 'images/mineSide.png');
        this.texture7 = new CGFtexture(this, 'images/mineBottom.png');
        //-------

        //-------Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedObject = 0;
        this.scaleFactor = 5;
        this.selectedTexture = -1;
        this.wrapS = 0;
        this.wrapT = 0;

        this.objects = [this.quad, this.quadCube, this.tangram];
        this.textures = [this.texture1, this.texture2, this.texture3, this.texture4, this.texture5, this.texture6, this.texture7];
        this.texCoords = [
            0.0, 1.0, // s, t
            1.0, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];



        this.objectIDs = { 'Quad': 0, 'QuadCube': 1, 'Tangram': 2 };
        this.textureIds = { 'Board': 0, 'Floor': 1, 'Window': 2, 'Tangram': 3, 'Mine Top': 4, 'Mine Side': 5, 'Mine Bottom': 6 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };

    }

    initLights() {

        this.lights[0].setPosition(5.0, 4.0, 3.0, 1.0);
        this.lights[0].setAmbient(1, 1, 1, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable()
        this.lights[0].setVisible(true);
        this.lights[0].update();

        this.lights[1].setPosition(-6.0, -1, -1.5, 1.0);
        this.lights[1].setAmbient(0.5, 0.5, 0.5, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[1].enable()
        this.lights[1].setVisible(true);
        this.lights[1].update();

        this.lights[2].setPosition(0.0, -3.0, 3.0, 4.0);
        this.lights[2].setAmbient(0.5, 0.5, 0.5, 1.0);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setVisible(true);
        this.lights[2].enable()
        this.lights[2].setVisible(true);
        this.lights[2].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.99, 0.8, 800, vec3.fromValues(-16, 18, 40), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.quadMaterial.setTexture(this.textures[this.selectedTexture]);
    }

    //Function that updates wrapping mode in quadMaterial
    updateTextureWrapping() {
        this.quadMaterial.setTextureWrap(this.wrappingMethods[this.wrapS], this.wrappingMethods[this.wrapT]);
    }

    //Function that updates texture coordinates in MyQuad
    updateTexCoords() {
        this.quad.updateTexCoords(this.texCoords);
    }

    display() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.updateProjectionMatrix();
        this.loadIdentity();
        this.applyViewMatrix();

        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();

        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        //this.quadMaterial.setTexture(this.textures[3]);
        //this.quadMaterial.apply();
        //this.objects[this.selectedObject].display();
        this.quadCube.display();

        // Default texture filtering in WebCGF is LINEAR. 
        // Uncomment next line for NEAREST when magnifying, or 
        // add a checkbox in the GUI to alternate in real time

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

        // this.quad.display();

    }
}