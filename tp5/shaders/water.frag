#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec4 vertex2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord + vec2(timeFactor * .01, 0.0));
	vec4 filter = texture2D(uSampler2, vec2(0.02 * timeFactor, 0.0) + vTextureCoord);

	color += filter * 0.2;
	color.a = 1.0;

	gl_FragColor = color;
}
