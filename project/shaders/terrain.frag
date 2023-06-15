#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler3;

varying vec3 vCoors;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler3, vec2(0.0, -vCoors.z));

	color = color*0.7 + filter * 0.3;
	color.a = 1.0;

	gl_FragColor = color;
}
