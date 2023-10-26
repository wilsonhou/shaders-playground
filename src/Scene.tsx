import { useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shaders/patterns/fragment.glsl";
import vertexShader from "./shaders/patterns/vertex.glsl";
import { useEffect, useMemo, useRef } from "react";
import { ShaderMaterial, Vector2 } from "three";
import { useTexture } from "@react-three/drei";

export const Scene = () => {
  const { viewport } = useThree();
  const planeWidth = 0.8 * viewport.height;
  const materialRef = useRef<ShaderMaterial>(null);
  const flagTexture = useTexture("/flag.png");

  const randoms = useMemo(() => {
    const count = 32 * 32 * 3; // vertices count for PlaneBufferGeometry with 32x32 segments
    const data = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      data[i] = Math.random();
    }

    return data;
  }, []);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: [planeWidth, planeWidth] },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uFrequency: { value: new Vector2(10, 5) },
      uTexture: {
        value: flagTexture,
      },
    }),
    [flagTexture, planeWidth]
  );

  useFrame(({ mouse, clock }) => {
    const material = materialRef.current;
    if (material) {
      //   console.log("sup");
      material.uniforms.uTime.value = clock.getElapsedTime();
      //   between -1 to 1, for both x and y
      // material.uniforms.uMouse.value.set((mouse.x + 1) / 2, (mouse.y + 1) / 2);

      const originalX = (mouse.x + 1) / 2;
      const originalY = (mouse.y + 1) / 2;

      const xOffset = (1 - (0.8 * viewport.height) / viewport.width) / 2;

      // Adjust for the 80% plane coverage
      let mappedX = (originalX - xOffset) / (1 - 2 * xOffset);
      let mappedY = (originalY - 0.1) / 0.8;

      // Clamp between 0 and 1
      mappedX = Math.min(Math.max(mappedX, 0), 1);
      mappedY = Math.min(Math.max(mappedY, 0), 1);
      console.log("Original Mouse:", originalX, originalY);
      console.log("R3F Mouse:", mouse.x, mouse.y);
      console.log("Mapped Mouse:", mappedX, mappedY);

      material.uniforms.uMouse.value.set(mappedX, mappedY);
      // console.log((mouse.x + 1) / 2, (mouse.y + 1) / 2);
    }
  });

  useEffect(() => {
    console.log(flagTexture);
  }, [flagTexture]);

  return (
    <>
      <mesh key={`${viewport.width}_${viewport.height}`}>
        <planeGeometry args={[planeWidth, planeWidth, 32, 32]}>
          <bufferAttribute
            attach="attributes-aRandom"
            array={randoms}
            count={randoms.length}
            itemSize={1}
          ></bufferAttribute>
        </planeGeometry>
        <shaderMaterial
          ref={materialRef}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        ></shaderMaterial>
      </mesh>
    </>
  );
};
