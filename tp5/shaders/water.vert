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

varying vec4 vertex2;

void main() {

	vec3 offset = vec3(0.0, 0.0, 0.0);
	vTextureCoord = aTextureCoord;

	// if(texture2D(uSampler2, vec2(0.0, 0.1) + vTextureCoord).b > 0.5)
		offset = aVertexNormal * texture2D(uSampler2, sin(timeFactor*0.2) * vec2(.0, 0.1) + vTextureCoord).r * 0.03;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vertex2 = gl_Position.xyzw;
}
