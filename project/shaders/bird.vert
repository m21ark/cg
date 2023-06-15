// Vertex Shader
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float uTime;
uniform float uVelocity;
uniform float uAmplitude;


uniform sampler2D uSampler2;
varying vec2 vTextureCoord;
varying vec3 offset;

void main() {

    offset = aVertexNormal * texture2D(uSampler2, vTextureCoord).r;

    vec4 position = vec4(aVertexPosition, 1.0); 
    position = position;

    /*
    Based on the following discussion:
        https://realtimevfx.com/t/butterfly-wings-flap-materials-help/6753/2
    
    which describes the flap of a butterfly wing as of the following:
        y = (cos((abs(x) - t))) - cos(t);
    
    */

    // Calculate the animated y-coordinate
    float x = position.x ;
    float t = uTime * (uVelocity * 0.1 + 0.20) ; // vertical movement ... related to the flap speed
    float tV = uTime * (0.20) ; // vertical movement
    float y;    
    
    if (uAmplitude < 10.0) y = (uAmplitude*cos(0.015 * (abs(x) - t)));
    else y = (uAmplitude*cos(0.015 * (abs(x) - t))) - cos(tV);

    // Apply the animated y-coordinate to the vertex position
    position.y += y;    
    gl_Position = uPMatrix * uMVMatrix * position;
    vTextureCoord = aTextureCoord;
}
