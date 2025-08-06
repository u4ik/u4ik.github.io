import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import EarthTexture from "../../assets/earth.jpg"; // Adjust the path as necessary
import { TextureLoader } from "three";
import { useEffect, useRef, useState } from "react";
// Animated ping mesh for the pinpoint
function Ping({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + 0.2 * Math.abs(Math.sin(t * 2)); // Pulsing scale
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
      if (meshRef.current && meshRef.current.material && 'opacity' in meshRef.current.material) {
        (meshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.5 + 0.1 * Math.abs(Math.cos(t * 2)); // Fade in/out
      }
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial color="teal" transparent opacity={0.3} />
    </mesh>
  );
}
import type { LocationType } from "../../types/LocationType";
interface GlobeProps {
  location: { lat: number; lon: number } | null | LocationType;
}
export default function Globe({ location }: GlobeProps) {
  const [pinPosition, setPinPosition] = useState([0, 0, 0]);

  const texture = useLoader(TextureLoader, EarthTexture);
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

    return <directionalLight ref={lightRef} intensity={5} />;
  }
  function latLonToCartesian(lat: number , lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = -lon * (Math.PI / 180);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z] as [number, number, number];
  }
  useEffect(() => {
    if (
      location
    ) {
      // new york, new york
        // let lat = 40.73061;
        // let lon = -73.935242;

      // california, la
      // let lat = 34.052235
      // let lon = -118.243683
      // birmingham, uk
      // let lat = 52.489471;
      // let lon = -1.898575;
      const { lat, lon } = location;
      const [x, y, z] = latLonToCartesian(lat, lon, 1);
      //   console.log(`Pin position: x=${x}, y=${y}, z=${z}`);

      setPinPosition(latLonToCartesian(lat, lon, 1));
    }
  }, [location]);
  return (
    <Canvas
      style={{ width: "100vw", height: "100dvh" }}
      camera={{ position: [0, 2, 1.5], fov: 50 }} // <--- move camera closer (z=2.5 or even 2)
    >
      <ambientLight intensity={0.2} />
      <AnimatedLight />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          wireframe={false}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Static pinpoint */}
      <mesh position={[pinPosition[0], pinPosition[1], pinPosition[2]]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Animated ping effect */}
      <Ping position={[pinPosition[0], pinPosition[1], pinPosition[2]]} />
      {/* 3D Text under the pinpoint */}
      <Text
        position={[pinPosition[0], pinPosition[1] + 0.13, pinPosition[2]]}
        fontSize={0.03}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineColor="black"
        outlineWidth={0.012}
        renderOrder={999}
      >
        Your Location
      </Text>
      <OrbitControls
        enableZoom={false}
        // minDistance={4.5}
        // maxDistance={5}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.atan2(5, 4)}
        maxPolarAngle={Math.atan2(5, 4)}
      />
      <Stars speed={1} />
    </Canvas>
  );
}
