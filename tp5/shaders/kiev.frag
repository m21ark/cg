#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec4 vertex2;

void main() {
	if(vertex2.y > 0.5)
		gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
	else

		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);

}