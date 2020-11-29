attribute float inputTime;
attribute vec3 translate;
attribute vec3 vector;

uniform float time;

varying vec3 vOffset;

const float g = 9.8 * 4.0;

void main() {
    float t = time - inputTime;

    vec3 offset = vec3( 0.0 );
    offset.xz = vector.xz * ( t + 0.4 );
    offset.y = vector.y * t - 0.5 * g * t * t;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position + translate + offset, 1.0 );

    vOffset = offset;
}