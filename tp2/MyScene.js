import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MySquare } from "./MySquare.js";
import { MyCube } from "./MyUnitCube.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import { MyQuad } from "./MyUnitQuad.js";
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
    this.gl.clearColor(0.9, 0.9, 0.9, 1);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.square = new MySquare(this);
    this.cube = new MyCube(this);
    this.triangleSmall1 = new MyTriangleSmall(this);
    this.triangleSmall2 = new MyTriangleSmall(this);
    this.triangleSmall3 = new MyTriangleSmall(this);
    this.triangleBig1 = new MyTriangleBig(this);
    this.triangleBig2 = new MyTriangleBig(this);
    this.parallelogram = new MyParallelogram(this, this);
    this.triangle = new MyTriangle(this);
    this.tangram = new MyTangram(this)

    this.quad = new MyQuad(this);
    this.quadCube = new MyQuadCube(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayTriangle = false;
    this.displayDiamond = false;
    this.displayParallelogram = false;
    this.displaySquare = false;
    this.displayCube = false;
    this.displayTriangleSmall = false;
    this.displayTriangleBig = false;
    this.displayTangram = false;
    this.displayQuad = false;
    this.displayQuadCube = true;
    
    // transformations
    this.scaleFactor = 1;

    this.deltaX = 0
    this.deltaY = 0
    this.deltaZ = 0

    this.angleX = 0
    this.angleY = 0
    this.angleZ = 0

    this.reflectX = false
    this.reflectY = false
    this.reflectZ = false

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1);
    this.lights[0].setAmbient(0.5, 0.5, 0.5, 1.0);

    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor, 0.0, 0.0, 0.0,
      0.0, this.scaleFactor, 0.0, 0.0,
      0.0, 0.0, this.scaleFactor, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];

    var trans = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      this.deltaX, this.deltaY, this.deltaZ, 1.0,
    ];

    var rotZ = [
      Math.cos(Math.PI / 180 * this.angleZ), Math.sin(Math.PI / 180 * this.angleZ), 0.0, 0.0,
      -Math.sin(Math.PI / 180 * this.angleZ), Math.cos(Math.PI / 180 * this.angleZ), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];

    var rotY = [
      Math.cos(Math.PI / 180 * this.angleY), 0.0, -Math.sin(Math.PI / 180 * this.angleY), 0.0,
      0.0, 1.0, 0.0, 0.0,
      Math.sin(Math.PI / 180 * this.angleY), 0.0, Math.cos(Math.PI / 180 * this.angleY), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];

    var rotX = [
      1.0, 0.0, 0.0, 0.0,
      0.0, Math.cos(Math.PI / 180 * this.angleX), Math.sin(Math.PI / 180 * this.angleX), 0.0,
      0.0, -Math.sin(Math.PI / 180 * this.angleX), Math.cos(Math.PI / 180 * this.angleX), 0.0,
      0.0, 0.0, 0.0, 1.0,
    ];


    // ========================== TANGRAM ==========================

    this.multMatrix(sca);
    this.multMatrix(trans);
    this.multMatrix(rotX);
    this.multMatrix(rotY);
    this.multMatrix(rotZ);




    this.pushMatrix();
    this.rotate(Math.PI / 180 * 270, 1, 0, 0);
    this.translate(0.5, -1,1);


    this.pushMatrix()
  
    this.color = new CGFappearance(this)
    this.color.setColor(0.3,0.8,0.3,1)
    this.color.apply()
    this.scale(0.7,0.7,0.7)
    this,this.translate(2.5,-3,-1.25)
    if (this.displayTangram) this.tangram.draw(this);

    this.setDefaultAppearance()
    this.popMatrix()





    this.pushMatrix();
    this.translate(2, -1.5, -3.5);
    this.scale(5,5,5)
    if (this.displayCube) this.quadCube.draw(this);
    this.popMatrix();




    this.popMatrix();






    //this.popMatrix();

    // this.translate(this.deltaX, this.deltaY, this.deltaZ);
    // this.rotate(Math.PI/180*this.angleX, 1, 0, 0);
    // this.rotate(Math.PI/180*this.angleY, 0, 1, 0);
    // this.rotate(Math.PI/180*this.angleZ, 0, 0, 1);
    // this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

    if (this.reflectX)
      this.scale(-1, 1, 1);

    if (this.reflectY)
      this.scale(1, -1, 1);

    if (this.reflectZ)
      this.scale(1, 1, -1);




    if (this.displayDiamond) this.diamond.display();
    if (this.displayTriangleSmall) this.triangleSmall2.display();
    if (this.displayTriangleBig) this.triangleBig2.display();
    if (this.displayTriangle) this.triangle.display();

    if (this.displayParallelogram) this.parallelogram.display();





  }
}
