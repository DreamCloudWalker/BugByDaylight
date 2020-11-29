varying vec3 vOffset;

void main() {
    if (vOffset.y <= 0.0) discard;

    gl_FragColor = vec4(0.8, 1.0, 1.0, 0.3);
}