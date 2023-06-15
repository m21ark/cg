#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorGrey = color;
	colorGrey.r = dot(color.rgb, vec3(0.299, 0.587, 0.114));
	colorGrey.g = dot(color.rgb, vec3(0.299, 0.587, 0.114));
	colorGrey.b = dot(color.rgb, vec3(0.299, 0.587, 0.114));

	gl_FragColor = colorGrey;
}