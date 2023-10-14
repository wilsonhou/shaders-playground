precision mediump float;

void main() {
    // pick the texture color based on the current coords of this fragment

    vec4 randomColor = vec4(0., 0., 1., 1.0);
    gl_FragColor = randomColor;
}