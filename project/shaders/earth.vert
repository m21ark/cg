attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {

	vec3 offset = vec3(0.0, 0.0, 0.0);
	vTextureCoord = aTextureCoord;

	offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).r * 3.5;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}
