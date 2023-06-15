#version 300 es
precision highp float;

in vec4 vFinalColor;
in vec2 vTextureCoord;

out vec4 fragColor;

uniform sampler2D uSampler;

uniform bool uUseTexture;
uniform float time; 

void main() {
	if (uUseTexture){
		vec4 textureColor = texture(uSampler, vTextureCoord);

		if (textureColor.a < 0.8) discard;
		else fragColor = textureColor * vFinalColor;
	} 
	else fragColor = vFinalColor;
}