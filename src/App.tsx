import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

function App() {
  return (
    <main className="w-screen h-screen">
      <Canvas
        camera={{
          position: [0, 0, 1],
        }}
      >
        <Scene></Scene>
      </Canvas>
    </main>
  );
}

export default App;
