// Fragment Shader
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uSampler2;


varying vec2 vTextureCoord;
varying vec3 offset;


void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);

    color.x = color.x + offset.x * 0.03;
    color.y = color.y + offset.y * 0.03;
    color.z = color.z + offset.z * 0.03;

    gl_FragColor = color;
}
