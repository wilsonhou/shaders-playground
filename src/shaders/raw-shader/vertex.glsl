uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;
uniform vec2 uMouse;

attribute vec3 position;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.0 * uTime) * 0.1;
    //     // Calculate distance to mouse pointer
    // float distanceToMouse = length(uMouse - modelPosition.xy);

    // // Increase oscillation where the mouse is
    // float influence = exp(-distanceToMouse * 5.0); // 5.0 controls the "fall-off"
    // modelPosition.z += sin(modelPosition.x * 10.0 + uTime) * 0.5 * influence;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}