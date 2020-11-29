varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying mat4 vProjectionMatrix;
varying mat4 vModelViewMatrix;

uniform vec2 size;
uniform sampler2D tDiffuse;
uniform sampler2D tWaterMap;

void main() {
    vec3 lightPos = vec3( 50.0, 50.0, 50.0 );
    vec3 lightVec = normalize( -lightPos );
    vec3 eyeVec = normalize( -cameraPosition );

    vec3 waveNormal = normalize( vNormal );
    vec3 mirrorNormal = normalize( vec3( 0.0, 0.0, 1.0 ) );
    vec3 flatNormal = waveNormal - dot( waveNormal, mirrorNormal ) * mirrorNormal;
    vec3 eyeNormal = ( vProjectionMatrix * vModelViewMatrix * vec4( flatNormal, 1.0 ) ).xyz;

    vec2 coordOffset = normalize( eyeNormal.xy ) * length( flatNormal ) * 0.01;

    vec2 coord = gl_FragCoord.xy / size;
    vec4 textureColor = texture2D( tDiffuse, coord + coordOffset ) + texture2D( tWaterMap, vUv );

    vec3 ambientColor = vec3( 0.0, 0.4, 0.8 );
    vec3 diffuseColor = vec3( 0.0, 0.4, 0.8 );
    vec3 specularColor = vec3( 0.2, 0.2, 0.2 );

    vec3 surfaceToLight = normalize( lightPos - vPosition );
    vec3 surfaceToCamera = normalize( cameraPosition - vPosition );

    float shininess = 20.0;

    vec3 ambient = ambientColor;
    vec3 diffuse = diffuseColor * max( dot( vNormal, lightVec ), 0.0 );
    vec3 specular = specularColor * pow( max( 0.0, dot( surfaceToCamera, reflect( -surfaceToLight, vNormal ) ) ), shininess );

    vec4 color = textureColor * vec4( ambient + diffuse + specular, 0.3 );

    gl_FragColor = color;
}