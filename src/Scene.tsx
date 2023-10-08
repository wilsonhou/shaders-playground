import { useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shaders/raw-shader/fragment.glsl";
import vertexShader from "./shaders/raw-shader/vertex.glsl";
import { useMemo, useRef } from "react";
import { ShaderMaterial, Vector2 } from "three";

export const Scene = () => {
  const { viewport } = useThree();
  const planeWidth = 0.8 * viewport.width;
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: [planeWidth, planeWidth] },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
    }),
    [planeWidth]
  );

  useFrame(({ mouse, clock }) => {
    const material = materialRef.current;
    if (material) {
      //   console.log("sup");
      material.uniforms.uTime.value = clock.getElapsedTime();
      //   between -1 to 1, for both x and y
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <>
      <mesh key={`${viewport.width}_${viewport.height}`}>
        <planeGeometry args={[planeWidth, planeWidth, 32, 32]}></planeGeometry>
        <rawShaderMaterial
          // side={DoubleSide}
          wireframe
          ref={materialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        ></rawShaderMaterial>
      </mesh>
    </>
  );
};
