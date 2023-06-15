attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying vec3 vCoors;
uniform sampler2D uSampler2;

void main() {

	vec3 offset = vec3(0.0, 0.0, 0.0);
	vTextureCoord = aTextureCoord;

	offset = aVertexNormal * texture2D(uSampler2, 1.0 * vec2(0.0, 5.0) + vTextureCoord).r * 0.35;

	vCoors = aVertexPosition + offset;
	gl_Position = uPMatrix * uMVMatrix * vec4(vCoors, 1.0);

}
