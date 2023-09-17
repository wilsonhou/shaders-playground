import { useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shaders/first-shader/fragment.glsl";
import vertexShader from "./shaders/first-shader/vertex.glsl";
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
      console.log(mouse);
      //   between -1 to 1, for both x and y
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <>
      <mesh key={`${viewport.width}_${viewport.height}`}>
        <planeGeometry args={[planeWidth, planeWidth]}></planeGeometry>
        <shaderMaterial
          ref={materialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        ></shaderMaterial>
        {/* <meshBasicMaterial color={new Color("#FF0")}></meshBasicMaterial> */}
      </mesh>
    </>
  );
};
