import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas
        camera={{
          position: [0, 0, 1],
        }}
      >
        {/* <OrbitControls /> */}
        <Scene></Scene>
      </Canvas>
    </main>
  );
}

export default App;
