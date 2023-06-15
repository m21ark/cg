import { CGFobject } from '../../../lib/CGF.js'

export class MyObject extends CGFobject {
    constructor(scene, filename) {
        super(scene)

        this.vertices = []
        this.indices = []

        if (filename == null) {
            this.initBuffers()
            return
        }

        this.filename = filename

        // open file and create a vertice array and index array, if the line starts with a v, add the vertice to the vertice array, if the line starts with a f, add the index to the index array
        let obj = document.querySelector(filename)

        let dataURL = obj.data

        // fetch dataURL and output the file text
        fetch(dataURL)
            .then(response => response.text())
            .then(text => {

                this.parseObjFile(text)

                this.initBuffers()
                scene.displayObj[filename] = true
            })
            .catch(error => console.log(error))
    }
    initBuffers() {
        this.primitiveType = this.scene.gl.TRIANGLES
        this.initGLBuffers()
    }

    parseObjFile(objText) {
        var obj = this
        var lines = objText.split('\n')
        let texCoo = []
        let vti = []; 24

        this.texCoords = []
        let inde_vert = []
        this.normals = []

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim()
            var parts = line.split(' ')
            switch (parts[0]) {
                case 'v':
                    this.vertices.push(parseFloat(parts[1]))
                    this.vertices.push(parseFloat(parts[2]))
                    this.vertices.push(parseFloat(parts[3].split('\r')[0]))
                    break
                case 'vn':
                    this.normals.push(parseFloat(parts[1]))
                    this.normals.push(parseFloat(parts[2]))
                    this.normals.push(parseFloat(parts[3].split('\r')[0]))
                    break
                case 'vt':
                    texCoo.push(parseFloat(parts[1]))
                    texCoo.push(parseFloat(parts[2].split('\r')[0]))
                    break
                case 'f':
                    let inde = [0, 0, 0]
                    let ver = [0, 0, 0]
                    for (var j = 1; j < parts.length; j++) {

                        var ind = parts[j].split('/')
                        this.indices.push(
                            parseInt(ind[0]) - 1, // vertexIndex
                        )
                        vti.push(parseInt(ind[1]) - 1)

                        inde[j - 1] = parseInt(ind[0]) - 1
                        ver[j - 1] = parseInt(ind[1]) - 1

                    }
                    inde_vert.push((inde, ver))

                    break
            }
        }

        if (this.filename.includes("nest")) {

            let o = [0, 0.5, 1]
            let p = 0
            for (let i = 0; i < this.vertices.length; i += 3) {
                this.texCoords.push(o[p])
                this.texCoords.push(o[p] + 0.3)
                p = (p + 1) % 3
            }
            return obj
        }

        let arV = [...this.vertices]
        let arI = [...this.indices]
        let arN = [...this.normals]

        this.vertices = []
        this.indices = []
        this.normals = []
        this.texCoords = []
        for (let i = 0; i < arI.length; i++) {
            let vi = arI[i]
            this.vertices.push(arV[vi * 3])
            this.vertices.push(arV[vi * 3 + 1])
            this.vertices.push(arV[vi * 3 + 2])

            this.normals.push(arN[vi * 3])
            this.normals.push(arN[vi * 3 + 1])
            this.normals.push(arN[vi * 3 + 2])

            let texi = vti[i]

            this.texCoords.push(texCoo[texi * 2 + 1])
            this.texCoords.push(texCoo[texi * 2])

            this.indices.push(i)
        }


        return obj
    }

}
