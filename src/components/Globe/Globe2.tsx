import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import EarthTexture from "../../assets/earth.jpg"; // Adjust the path as necessary
import { TextureLoader } from "three";
import { useEffect, useRef, useState } from "react";
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
function latLonToCartesian(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = -lon * (Math.PI / 180);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z] as [number, number, number];
}
export default function Globe({ location }) {
  const [pinPosition, setPinPosition] = useState([0, 0, 0]);

  const texture = useLoader(TextureLoader, EarthTexture);

  useEffect(() => {
    if (location) {
      // new york, new york
      //   let lat = 40.73061;
      //   let lon = -73.935242;

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
      <mesh position={[pinPosition[0], pinPosition[1] + 2, pinPosition[2]]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.atan2(5, 4)}
        maxPolarAngle={Math.atan2(5, 4)}
      />
      <Stars speed={1} />
    </Canvas>
  );
}
