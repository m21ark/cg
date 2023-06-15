attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;
varying vec4 coords;
varying vec4 normal;
varying vec4 vertex2;

void main() {
	vec4 vertex = vec4(aVertexPosition + aVertexNormal * normScale * 0.1, 1.0);

	vec3 offset = vec3(0.0, 0.0, 0.0);

	vTextureCoord = aTextureCoord;

	if(texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).b > 0.5)
		offset = aVertexNormal * normScale * 0.1 * sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vertex2 = gl_Position.xyzw;

	normal = vec4(aVertexNormal, 1.0);

	coords = vertex / 10.0;
}
