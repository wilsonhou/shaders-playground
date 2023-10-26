uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4((uMouse.x + 1.) / 2., vUv.x - sin(uTime / 10.), vUv.y + sin(uTime / 10. - (uMouse.y + 1.) / 2.), 1.0);
}