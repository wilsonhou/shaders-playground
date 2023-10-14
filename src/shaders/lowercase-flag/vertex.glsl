uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uFrequency;

attribute float aRandom;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 10.0 * uTime) * 0.1;
    // modelPosition.z += aRandom * 0.1 * abs(sin(uTime));
    // float distanceToMouse = length(uMouse - modelPosition.xy);
    float elevation = sin(modelPosition.x * uFrequency.x - uTime * 2.0) * 0.05;
    elevation += sin(modelPosition.y * uFrequency.y - uTime * 2.0) * 0.05;
    // elevation += distanceToMouse / 2.0;

    modelPosition.z += elevation;
    // //     // Calculate distance to mouse pointer

    // // // Increase oscillation where the mouse is
    // float influence = exp(-distanceToMouse * 5.0); // 5.0 controls the "fall-off"
    // modelPosition.z += sin(modelPosition.x * 10.0 + uTime) * 0.5 * influence * aRandom;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}