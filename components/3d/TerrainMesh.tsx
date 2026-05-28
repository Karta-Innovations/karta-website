"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type ShaderMaterial } from "three";

interface TerrainMeshProps {
  /** World-space size of the terrain plane. Default 60 x 60. */
  size?: number;
  /** Plane subdivision count. Default 220. Higher = smoother ridges, more triangles. */
  segments?: number;
  /** Peak displacement amplitude. Default 4. */
  amplitude?: number;
  /** Contour spacing in world units. Default 0.5. */
  contourSpacing?: number;
  /** Base color for valleys. Default Karta ink. */
  valleyColor?: string;
  /** Tint for ridge peaks. Default Karta surface. */
  ridgeColor?: string;
  /** Topographic contour line color. Default Karta amber. */
  contourColor?: string;
  /** Animate ridges over time (slow drift). Default false. */
  animate?: boolean;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldPos;
  varying float vHeight;

  uniform float uTime;
  uniform float uAmplitude;

  // Domain-warped simplex-style noise (cheap, suitable for a hero background)
  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(
        mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
            dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
        mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
            dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
      mix(
        mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
            dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
        mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
            dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  // Ridged multifractal - sharp ridge lines characteristic of high mountain ranges
  float ridge(vec2 p) {
    float n = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      float v = 1.0 - abs(noise(vec3(p * freq, uTime * 0.04)));
      v *= v;
      n += v * amp;
      freq *= 2.05;
      amp *= 0.5;
    }
    return n;
  }

  void main() {
    vec3 pos = position;
    // The plane is rotated -PI/2 around X to lie flat, so y=0 means flat ground.
    // We displace along the local z (which becomes world y after rotation).
    float h = ridge(pos.xy * 0.045) * uAmplitude;
    pos.z += h;
    vHeight = h;
    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vWorldPos;
  varying float vHeight;

  uniform vec3 uValleyColor;
  uniform vec3 uRidgeColor;
  uniform vec3 uContourColor;
  uniform float uContourSpacing;
  uniform float uAmplitude;

  void main() {
    // Topographic contour lines: anti-aliased bands at every uContourSpacing of height.
    float h = vWorldPos.y;
    float contour = abs(fract(h / uContourSpacing) - 0.5);
    float lineWidth = fwidth(h / uContourSpacing) * 1.4;
    float line = 1.0 - smoothstep(0.0, lineWidth, contour - 0.48);

    // Base gradient: valley to ridge tint by normalized height.
    float t = clamp(vHeight / uAmplitude, 0.0, 1.0);
    vec3 base = mix(uValleyColor, uRidgeColor, smoothstep(0.0, 1.0, t));

    // Distance fade for atmospheric perspective - pulls the back of the scene into the ink.
    float d = clamp(length(vWorldPos.xz) / 40.0, 0.0, 1.0);
    base = mix(base, uValleyColor * 0.6, d * 0.85);

    // Composite contour over base, fading contours into the distance.
    vec3 color = mix(base, uContourColor, line * 0.55 * (1.0 - d * 0.7));

    // Vignette + edge fade to ink so the terrain melts into the section background.
    float edge = smoothstep(0.85, 1.0, d);
    color = mix(color, uValleyColor, edge);

    gl_FragColor = vec4(color, 1.0 - edge * 0.4);
  }
`;

export function TerrainMesh({
  size = 60,
  segments = 220,
  amplitude = 4,
  contourSpacing = 0.5,
  valleyColor = "#0B1020",
  ridgeColor = "#1B244A",
  contourColor = "#C8962E",
  animate = false,
}: TerrainMeshProps) {
  const matRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: amplitude },
      uContourSpacing: { value: contourSpacing },
      uValleyColor: { value: new Color(valleyColor) },
      uRidgeColor: { value: new Color(ridgeColor) },
      uContourColor: { value: new Color(contourColor) },
    }),
    [amplitude, contourSpacing, valleyColor, ridgeColor, contourColor],
  );

  useFrame((_, delta) => {
    if (!animate || !matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[size, size, segments, segments]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
      />
    </mesh>
  );
}
