import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Stars } from "@react-three/drei";
import { useRef } from "react";

function Scene() {
  const groupRef = useRef();

  useFrame((state) => {
    const { mouse } = state;

    if (groupRef.current) {
      groupRef.current.rotation.x +=
        (mouse.y * 0.04 - groupRef.current.rotation.x) * 0.025;

      groupRef.current.rotation.z +=
        (-mouse.x * 0.04 - groupRef.current.rotation.z) * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Futuristic racing grid */}
      <Grid
        position={[0, -2, 0]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#006b8f"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#00c2ff"
        fadeDistance={35}
        fadeStrength={1.5}
        infiniteGrid
      />

      {/* Background particles */}
      <Stars
        radius={60}
        depth={40}
        count={1800}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Subtle blue light points */}
      <mesh position={[-4, 2, -7]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#00c2ff" />
      </mesh>

      <mesh position={[4, 1, -10]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00c2ff" />
      </mesh>

      <mesh position={[1, 4, -12]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#0088bb" />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(circle at center, #07131a 0%, #05070a 45%, #020305 100%)",
      }}
    >
      <Canvas
        camera={{
          position: [0, 3, 10],
          fov: 60,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <Scene />
      </Canvas>
    </div>
  );
}