import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import EarthTexture from "../../assets/earth.jpg"; // Adjust the path as necessary
import { TextureLoader } from "three";
import { useRef } from "react";
function AnimatedLight() {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Animate the light in a circle around the globe
    const radius = 5;
    const speed = -0.2; // Adjust for faster/slower orbit
    const x = radius * Math.cos(speed * t);
    const z = radius * Math.sin(speed * t);
    if (lightRef.current) {
      lightRef.current.position.set(x, 0, z);
    }
  });

  return <directionalLight ref={lightRef} intensity={7} />;
}

export default function Globe() {
  const texture = useLoader(TextureLoader, EarthTexture);
  return (
    <Canvas style={{ width: "100vw", height: "100dvh" }}>
      <ambientLight intensity={0.5} />
      <AnimatedLight />
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          wireframe={false}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      <OrbitControls
        enableZoom={true}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.atan2(5, 4)}
        maxPolarAngle={Math.atan2(5, 4)}
      />
      <Stars speed={1} />
    </Canvas>
  );
}
