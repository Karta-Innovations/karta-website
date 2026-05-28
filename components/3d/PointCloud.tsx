"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, type Points, type ShaderMaterial } from "three";

interface PointCloudProps {
  /** Number of points. Default 3500. */
  count?: number;
  /** World-space radius the points are scattered within. Default 2.5. */
  radius?: number;
  /** Base point size in pixels. Default 2.2. */
  pointSize?: number;
  /** Point color. Default Karta amber. */
  color?: string;
  /** Auto-rotate the cloud (Y axis). Default true. */
  spin?: boolean;
  /** Spin angular velocity (rad/s). Default 0.18. */
  spinSpeed?: number;
}

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPointSize;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    // Subtle radial pulse so points "breathe" - reads as live sensor sweep.
    float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + aPhase);
    vAlpha = mix(0.35, 1.0, pulse);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uPointSize * aSize * (1.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    // Soft round point with anti-aliased edge.
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    float a = smoothstep(0.5, 0.42, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

/**
 * Instanced point cloud for the SkyAnchor LiDAR visualization. The points are
 * scattered inside a sphere with non-uniform density (concentrated toward the
 * top, sparser at the base) so it reads as a LiDAR sweep over terrain rather
 * than an abstract dot grid.
 */
export function PointCloud({
  count = 3500,
  radius = 2.5,
  pointSize = 2.2,
  color = "#C8962E",
  spin = true,
  spinSpeed = 0.18,
}: PointCloudProps) {
  const ref = useRef<Points>(null);
  const matRef = useRef<ShaderMaterial>(null);

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Sample inside an ellipsoid - wider in xz, flatter in y so it reads as terrain return.
      const theta = Math.random() * Math.PI * 2;
      const r = Math.cbrt(Math.random()) * radius;
      const y = (Math.random() - 0.35) * radius * 0.7;
      positions[i * 3 + 0] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      sizes[i] = 0.6 + Math.random() * 1.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, phases };
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color(color) },
      uPointSize: { value: pointSize },
    }),
    [color, pointSize],
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
    if (spin && ref.current) {
      ref.current.rotation.y += delta * spinSpeed;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
