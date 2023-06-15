import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js"

// Birds
import { MySimpleBird } from "./models/birds/MySimpleBird.js"
import { MyBird } from "./models/birds/MyBird.js"

// Trees
import { MyTreeGroupPatch } from "./models/trees/MyTreeGroupPatch.js"
import { MyTreeRowPatch } from "./models/trees/MyTreeRowPatch.js"

// Nests
import { MySimpleNest } from "./models/nests/MySimpleNest.js"
import { MyNest } from "./models/nests/MyNest.js"

// Other Objects
import { MyPanorama } from "./models/elementars/MyPanorama.js"
import { MyPlane } from "./models/elementars/MyPlane.js"
import { MySphere } from "./models/elementars/MySphere.js"
import { MyEgg } from "./models/nests/MyEgg.js"

export class MyScene extends CGFscene {
  constructor() {
    super()

    this.keyPresses = ""
  }

  checkKeys() {
    this.keyPresses = "" // reset keypresses

    if (this.gui.isKeyPressed("KeyW"))
      this.keyPresses += " W "
    if (this.gui.isKeyPressed("KeyS"))
      this.keyPresses += " S "
    if (this.gui.isKeyPressed("KeyA"))
      this.keyPresses += " A "
    if (this.gui.isKeyPressed("KeyD"))
      this.keyPresses += " D "
    if (this.gui.isKeyPressed("KeyR"))
      this.keyPresses += " R "
    if (this.gui.isKeyPressed("KeyP"))
      this.keyPresses += " P "
    if (this.gui.isKeyPressed("KeyO"))
      this.keyPresses += " O "
    if (this.gui.isKeyPressed("ControlLeft"))
      this.keyPresses += " F "
    if (this.gui.isKeyPressed("ShiftLeft"))
      this.keyPresses += " B "
    if (this.gui.isKeyPressed("KeyV"))
      this.birdPerspective = !this.birdPerspective
  }

  generateBirdEggs() {
    let b = []
    for (let i = 0; i < 6; i++) {
      let r = Math.random(), r2 = Math.random()
      let translateModx = r > 0.5 ? 1 : -1
      let translateMody = r2 > 0.5 ? 1 : -1
      let x = Math.random() * 10 * translateModx + 70
      let z = Math.random() * 20 * translateMody + 35
      let alphaAngel = Math.random() * (Math.PI / 2)
      let betaAngel = Math.random() * (Math.PI)
      b[i] = new MyEgg(this, 30, 30, alphaAngel, betaAngel, [x, -26.3, z])
    }
    return b
  }


  init(application) {
    super.init(application)

    this.initCameras()
    this.initLights()

    //Background color
    this.gl.clearColor(0.5, 0.5, 0.5, 1.0)

    this.gl.clearDepth(100.0)
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.enable(this.gl.CULL_FACE)
    this.gl.depthFunc(this.gl.LEQUAL)

    // ==================== Loading Objects  ====================

    // Birds
    this.bird = new MyBird(this)
    this.birdSimple = new MySimpleBird(this)
    this.eggs = this.generateBirdEggs()

    // Nests
    this.nestSimple = new MySimpleNest(this)
    this.nest = new MyNest(this)

    // Trees
    this.treeGroup = new MyTreeGroupPatch(this, [65, -22, 35])
    this.treeRow = new MyTreeRowPatch(this, [55, -22, 35])

    // Other Objects
    this.axis = new CGFaxis(this)
    this.plane = new MyPlane(this, 30)
    this.sphere = new MySphere(this, 50, 50)
    this.panorama = new MyPanorama(this, 30, 30)

    // ==================== Control Visibilities  ====================

    this.displayObj = []
    this.displayAxis = true
    this.displaySphere = false
    this.displayTerrain = true
    this.displayPanorama = true
    this.displayBird = true
    this.displayNest = true
    this.displayObj["#bird"] = false
    this.displayObj["#nest"] = false
    this.displayTreeGroup = true
    this.displayTreeRow = false
    this.displayWater = true
    this.displayNormals = false
    this.selectedBird = 0
    this.selectedNest = 0

    this.birdPerspective = false

    // Object interface variables
    this.objectList = {
      'Simple Bird': 0,
      'Eagle': 1
    }

    // nests
    this.nestList = {
      'Simple Nest': 0,
      'Realistic Nest': 1
    }


    // ==================== Load Materials  ====================

    // World material
    this.worldMaterial = new CGFappearance(this)
    this.worldMaterial.setAmbient(1, 1, 1, 1)
    this.worldMaterial.setDiffuse(0.6, 0.6, 0.6, 1)
    this.worldMaterial.setSpecular(0.7, 0.7, 0.7, 1)
    this.worldMaterial.setShininess(100.0)
    this.worldMaterial.loadTexture('images/earth.jpg')
    this.worldMaterial.setTextureWrap('REPEAT', 'REPEAT')

    // Bird material
    this.birdMaterial = new CGFappearance(this)
    this.birdMaterial.setAmbient(0.6, 0.3, 0.3, 1)
    this.birdMaterial.setDiffuse(0.6, 0.6, 0.6, 1)
    this.birdMaterial.setSpecular(0.3, 0.3, 0.3, 1)
    this.birdMaterial.setShininess(10.0)
    this.birdMaterial.loadTexture('images/bird.jpg')
    this.birdMaterial.setTextureWrap('REPEAT', 'REPEAT')

    // Panorama material
    this.panoramaMaterial = new CGFappearance(this)
    this.panoramaMaterial.setAmbient(10.0, 10.0, 10.0, 1) // de propósito
    this.panoramaMaterial.setDiffuse(0.6, 0.6, 0.6, 1)
    this.panoramaMaterial.setSpecular(0.7, 0.7, 0.7, 1)
    this.panoramaMaterial.setShininess(10.0)
    this.panoramaMaterial.loadTexture('images/panorama.jpg')
    this.panoramaMaterial.setTextureWrap('REPEAT', 'REPEAT')

    // EGG material
    this.eggMaterial = new CGFappearance(this)
    this.eggMaterial.setAmbient(0.9, 0.6, 0.3, 1)
    this.eggMaterial.setDiffuse(1.0, 1.0, 1.0, 1)
    this.eggMaterial.setSpecular(0.5, 0.5, 0.5, 1)
    this.eggMaterial.setShininess(10.0)
    this.eggMaterial.loadTexture('images/egg.jpg') // egg texture
    this.eggMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE')

    // Nest material
    this.nestMaterial = new CGFappearance(this)
    this.nestMaterial.setAmbient(1, 0.8, 0.6, 1)
    this.nestMaterial.setDiffuse(1.0, 1.0, 1.0, 1)
    this.nestMaterial.setSpecular(0.5, 0.5, 0.5, 1)
    this.nestMaterial.setShininess(10.0)
    this.nestMaterial.loadTexture('images/nest.jpg')
    this.nestMaterial.setTextureWrap('REPEAT', 'REPEAT')

    // Water 
    this.watermap = new CGFtexture(this, "images/waterMap.jpg")
    this.watertex = new CGFtexture(this, "images/waterTex.jpg")

    this.waterMaterial = new CGFappearance(this)
    this.waterMaterial.setAmbient(0.3, 0.3, 0.3, 1)
    this.waterMaterial.setDiffuse(0.7, 0.7, 0.7, 1)
    this.waterMaterial.setSpecular(0.0, 0.0, 0.0, 1)
    this.waterMaterial.setShininess(120)
    this.waterMaterial.setTexture(this.watertex)
    this.waterMaterial.setTextureWrap('REPEAT', 'REPEAT')

    this.waterShader = new CGFshader(this.gl, "shaders/water.vert", "shaders/water.frag")
    this.waterShader.setUniformsValues({ uSampler: 2 })
    this.waterShader.setUniformsValues({ uSampler2: 3 })
    this.waterShader.setUniformsValues({ timeFactor: 0 })

    // MySimpleBird bird textures
    this.featherTex = new CGFtexture(this, "images/feathers.jpg")
    this.orangeTex = new CGFtexture(this, "images/orange.jpg")
    this.whiteTex = new CGFtexture(this, "images/white.jpg")
    this.blueTex = new CGFtexture(this, "images/blue.jpg")

    // Other textures
    this.birdBump = new CGFtexture(this, "images/birdBumpMap.jpg")
    this.worldBump = new CGFtexture(this, "images/earth_bump.jpg")
    this.worldMap = new CGFtexture(this, "images/earth.jpg")

    // Terrain shader
    this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag")
    this.terrainShader.setUniformsValues({ uSampler: 0 })
    this.terrainShader.setUniformsValues({ uSampler2: 2 })
    this.terrainShader.setUniformsValues({ uSampler3: 3 })

    this.terrainTexture = new CGFtexture(this, "images/terrain.jpg")
    this.appearance = new CGFappearance(this)
    this.appearance.setTexture(this.terrainTexture)
    this.appearance.setTextureWrap('REPEAT', 'REPEAT')

    this.terrainTextureAltimetry = new CGFtexture(this, "images/altimetry.png")
    this.terrainTextureMap = new CGFtexture(this, "images/heightmap.jpg")

    // Bird
    this.birdShader = new CGFshader(this.gl, "shaders/bird.vert", "shaders/bird.frag")
    this.birdShader.setUniformsValues({ uSampler: 0, uSampler2: 2, uAmplitude: 40.0 })

    // billboard shader
    this.billboardShader = new CGFshader(this.gl, "shaders/billboard.vert", "shaders/billboard.frag")

    // World
    this.worldShader = new CGFshader(this.gl, "shaders/earth.vert", "shaders/earth.frag")
    this.worldShader.setUniformsValues({ uSampler: 0 })
    this.worldShader.setUniformsValues({ uSampler2: 2 })

    //Objects connected to MyInterface
    this.scaleFactor = 1
    this.speedFactor = 1

    this.enableTextures(true)

    this.setUpdatePeriod(20) // called every 50ms
  }

  hexToRgbA(hex) {
    var ret
    //either we receive a html/css color or a RGB vector
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      ret = [
        parseInt(hex.substring(1, 3), 16).toPrecision() / 255.0,
        parseInt(hex.substring(3, 5), 16).toPrecision() / 255.0,
        parseInt(hex.substring(5, 7), 16).toPrecision() / 255.0,
        1.0
      ]
    }
    else
      ret = [
        hex[0].toPrecision() / 255.0,
        hex[1].toPrecision() / 255.0,
        hex[2].toPrecision() / 255.0,
        1.0
      ]
    return ret
  }

  onselectedBirdChanged(object) {
    object == 0 ? this.selectedBird = 0 : this.selectedBird = 1
  }

  onselectedNestChanged(object) {
    object == 0 ? this.selectedNest = 0 : this.selectedNest = 1
  }


  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1)
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0)
    this.lights[0].enable()
    this.lights[0].update()
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.4,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    )
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0)
    this.setDiffuse(0.2, 0.4, 0.8, 1.0)
    this.setSpecular(0.2, 0.4, 0.8, 1.0)
    this.setShininess(10.0)
  }

  update(t) {

    this.checkKeys()

    // Bird
    if (this.displayBird) {
      let flappingScaller = (Math.abs(this.bird.vel) + 5 * this.speedFactor) / (this.bird.MAX_VEL + 5)
      this.birdShader.setUniformsValues({ uTime: t % (50000), uVelocity: flappingScaller })

      if (this.selectedBird == 0) this.birdpos = this.birdSimple.update(this.keyPresses)
      else this.birdpos = this.bird.update(this.keyPresses)
    }

    // Water
    if (this.displayWater) this.waterShader.setUniformsValues({ timeFactor: t / 300 % 100 })

    // Trees
    if (this.displayTreeGroup) this.treeGroup.update()
    if (this.displayTreeRow) this.treeRow.update()

    this.billboardShader.setUniformsValues({ time: t % (50000) })

    // Panorama
    if (this.displayPanorama) this.panorama.update()

    // Apply bird perspective to camera
    if (this.displayBird && this.birdPerspective) {

      let birdx = this.birdpos[0][0]
      let birdy = this.birdpos[0][1]
      let birdz = this.birdpos[0][2]
      let birdang = this.birdpos[1]

      // make the camera follow the bird in 3rd person
      // the porportions need to be +10 in x , z for +5 in y
      let camx = birdx + 40 * Math.sin(birdang);
      let camy = birdy + 20;
      let camz = birdz + 40 * Math.cos(birdang);

      this.camera.setPosition(vec3.fromValues(camx, camy, camz))
      this.camera.setTarget(vec3.fromValues(birdx, birdy, birdz))
    }
  }

  display() {

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

    this.updateProjectionMatrix()
    this.loadIdentity()
    this.applyViewMatrix()

    // ========== Display Trees ==========

    if (this.displayTreeGroup || this.displayTreeRow)
      this.setActiveShader(this.billboardShader)
    if (this.displayTreeGroup) {
      this.treeGroup.display()
    }
    if (this.displayTreeRow) {
      this.treeRow.display()
    }
    if (this.displayTreeGroup || this.displayTreeRow)
      this.setActiveShader(this.defaultShader)



    if (this.displayBird && this.displayObj["#bird"]) {
      if (this.selectedBird == 1) {
        this.birdMaterial.apply()
        this.setActiveShader(this.birdShader)
        this.birdBump.bind(2)
        this.pushMatrix()
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor)
        this.bird.display()
        this.popMatrix()
        this.setActiveShader(this.defaultShader)
      } else {

        this.setActiveShader(this.birdShader)
        this.birdBump.bind(2)
        this.pushMatrix()
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor)
        this.birdSimple.display()
        this.popMatrix()
        this.setActiveShader(this.defaultShader)
      }
    }


    if (this.displayAxis)
      this.axis.display()

    // ========== Display eggs ==========

    if (this.displayNest) {
      this.eggMaterial.apply()
      for (let egg in this.eggs) {
        if (this.eggs[egg] == null)
          continue
        this.eggs[egg].display()
      }
    }

    // ========== Display Nest ==========

    if (this.displayNest && this.displayObj["#nest"]) {
      this.nestMaterial.apply()
      if (this.selectedNest == 0)
        this.nest.display()
      else this.nestSimple.display()

    }

    // ========== Display Sphere ==========

    if (this.displaySphere) {
      this.setActiveShader(this.worldShader)
      this.worldMaterial.apply()
      this.worldBump.bind(2)
      this.sphere.display()
      this.setActiveShader(this.defaultShader)
    }

    // ========== Display Panorama ==========

    if (this.displayPanorama) {
      this.panoramaMaterial.apply()
      this.pushMatrix()
      this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2])
      this.panorama.display()
      this.popMatrix()
    }

    // ========== Display terrain ==========

    if (this.displayTerrain) {
      this.setActiveShader(this.terrainShader)

      this.terrainTextureMap.bind(2)
      this.terrainTextureAltimetry.bind(3)

      this.pushMatrix()
      this.appearance.apply()
      this.translate(0, -100, 0)
      this.scale(400, 400, 400)
      this.rotate(-Math.PI / 2.0, 1, 0, 0)
      this.plane.display()
      this.popMatrix()
    }

    // ========== Display water ==========

    if (this.displayWater) {
      this.watermap.bind(3)
      this.setActiveShader(this.waterShader)
      this.waterMaterial.apply()
      this.pushMatrix()
      this.translate(0, -68, 0)
      this.scale(230, 230, 230)
      this.rotate(-Math.PI / 2.0, 1, 0, 0)
      this.plane.display()
      this.popMatrix()
    }

    // ========== Display Sphere Normals ==========

    if (this.displayNormals) {
      this.sphere.enableNormalViz()
      for (let i = 0; i < this.eggs.length; i++) {
        if (this.eggs[i] == null)
          continue
        this.eggs[i].enableNormalViz()
      }
    }
    else {
      this.sphere.disableNormalViz()
      for (let i = 0; i < this.eggs.length; i++) {
        if (this.eggs[i] == null)
          continue
        this.eggs[i].disableNormalViz()
      }
    }

    this.setActiveShader(this.defaultShader)
  }
}
