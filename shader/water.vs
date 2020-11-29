varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying mat4 vProjectionMatrix;
varying mat4 vModelViewMatrix;

uniform float time;

const int maxCircleWaveNum = <maxCircleWaveNum>;

uniform int circleWaveNum;
uniform float circleWaveTriggerTimes[ maxCircleWaveNum ];
uniform vec2 circleWaveCenters[ maxCircleWaveNum ];

const int maxDirectionWaveNum = <maxDirectionWaveNum>;

uniform int directionWaveNum;
uniform vec2 directionWaveVectors[ maxDirectionWaveNum ];

uniform sampler2D tWaterNormalMap;

const float circleWaveLength = 0.05;
const float circleWaveAmplitude = 0.05;
const float circleWaveK = 2.0;
const float circleWaveSpeed = 0.4;

const float directionWaveLength = 0.1;
const float directionWaveAmplitude = 0.1;
const float directionWaveK = 1.0;
const float directionWaveSpeed = 0.3;

vec2 getPosition() {

    return uv * 2.0 - 1.0;

}

float getTheta( vec2 direction ) {

    return dot( direction, getPosition() );

}

float wave(
    vec2 direction,
    float waveLength,
    float amplitude,
    float k,
    float speed,
    float t
) {

    float frequency = 2.0 / waveLength;
    float phi = speed * frequency;

    float theta = getTheta( direction );

    return 2.0 * amplitude * pow( ( sin( theta * frequency + t * phi ) + 1.0 ) / 2.0, k );

}

vec2 vwave(
    vec2 direction,
    float waveLength,
    float amplitude,
    float k,
    float speed,
    float t
) {

    float frequency = 2.0 / waveLength;
    float phi = speed * frequency;

    float theta = getTheta( direction );

    return k * frequency * amplitude * pow( ( sin( theta * frequency + time * phi ) + 1.0 ) / 2.0, k - 1.0 ) * cos( theta * frequency + t * phi ) * direction;

}

float getPastTime( float triggerTime ) {

    return time - triggerTime;

}

vec2 getCircleDirection( vec2 center ) {

    return -normalize( getPosition() - center );

}

float getCircleDistance( vec2 center ) {

    return length( getPosition() - center );

}

bool checkIfCircleWave( vec2 center, float triggerTime ) {

    //return true;

    float distance = getCircleDistance( center );
    float pastTime = getPastTime( triggerTime );

    if ( ( distance > ( pastTime + circleWaveLength * 10.0 ) * circleWaveSpeed ) ||
            ( distance < ( pastTime - circleWaveLength * 10.0 ) * circleWaveSpeed ) ) return false;

    return true;

}

float getAttenuation( float triggerTime ) {

    float pastTime = getPastTime( triggerTime );

    return max( pastTime * 4.0, 1.0 );

}

float circleWave( vec2 center, float triggerTime ) {

    if ( ! checkIfCircleWave( center, triggerTime ) ) return 0.0;

    return wave(
        getCircleDirection( center ),
        circleWaveLength,
        circleWaveAmplitude,
        circleWaveK,
        circleWaveSpeed,
        getPastTime( triggerTime )
    ) / getAttenuation( triggerTime );

}

vec2 vCircleWave( vec2 center, float triggerTime ) {

    if ( ! checkIfCircleWave( center, triggerTime ) ) return vec2( 0.0 );

    return vwave(
        getCircleDirection( center ),
        circleWaveLength,
        circleWaveAmplitude,
        circleWaveK,
        circleWaveSpeed,
        getPastTime( triggerTime )
    ) / getAttenuation( triggerTime );

}

float directionWave( vec2 direction ) {

    return wave(
        direction,
        directionWaveLength,
        directionWaveAmplitude,
        directionWaveK,
        directionWaveSpeed,
        time
    );

}

vec2 vDirectionWave( vec2 direction ) {

    return vwave(
        direction,
        directionWaveLength,
        directionWaveAmplitude,
        directionWaveK,
        directionWaveSpeed,
        time
    );

}

void main() {

    float offset = 0.0;
    vec2 vative = vec2( 0.0 );

    for ( int i = 0; i < maxCircleWaveNum; i ++ ) {

        if ( i >= circleWaveNum ) break;

        vec2 trigger = vec2( circleWaveCenters[ i ] );

        offset += circleWave( circleWaveCenters[ i ], circleWaveTriggerTimes[ i ] );
        vative += vCircleWave( circleWaveCenters[ i ], circleWaveTriggerTimes[ i ] );

    }

    for ( int i = 0; i < maxDirectionWaveNum; i ++ ) {

        if ( i >= directionWaveNum ) break;

        offset += directionWave( directionWaveVectors[ i ] );
        vative += vDirectionWave( directionWaveVectors[ i ] );

    }

    vec3 newPosition = vec3( position.xy, position.z + offset );

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

    vec3 newNormal = normalize(
                        ( normal + vec3( -vative.x, -vative.y, 1.0 ) * 0.1 ) *
                        texture2D( tWaterNormalMap, uv ).xyz
                        );

    vUv = uv;
    vNormal = normalize( normalMatrix * newNormal );
    vPosition = newPosition;
    vProjectionMatrix = projectionMatrix;
    vModelViewMatrix = modelViewMatrix;
}