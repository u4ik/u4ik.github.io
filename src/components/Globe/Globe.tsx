// Smoothly zooms the camera to a target position on mount
import { useFrame } from "@react-three/fiber";
function ZoomCamera({ cameraRef, setZooming }: { cameraRef: React.RefObject<THREE.Camera | null>, setZooming: (v: boolean) => void }) {
  useFrame(() => {
    if (!cameraRef.current) return;
    const targetZ = 5.5;
    const speed = 0.08;
    if (cameraRef.current.position.z > targetZ) {
      cameraRef.current.position.z -= speed;
      if (cameraRef.current.position.z <= targetZ) {
        cameraRef.current.position.z = targetZ;
        setZooming(false);
      }
    }
  });
  return null;
}
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import EarthTexture from "../../assets/earth2.jpg"; // Adjust the path as necessary
import CloudTexture from "../../assets/cloud3.png"; // Add your transparent cloud texture here
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
  const cameraRef = useRef<THREE.Camera | null>(null);
  const [zooming, setZooming] = useState(true);
  const [pinPosition, setPinPosition] = useState([0, 0, 0]);

  const texture = useLoader(TextureLoader, EarthTexture);
  const cloudTexture = useLoader(TextureLoader, CloudTexture);
  // Cloud sphere animation
  function Clouds() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.03; // Slow rotation
      }
    });
    return (
      <mesh ref={meshRef} position={[0, 1.9, 0]}>
        <sphereGeometry args={[1.019, 64, 64]} />
        <meshStandardMaterial
          map={cloudTexture}
          color={"white"}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>
    );
  }
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
  function latLonToCartesian(lat:number | undefined , lon:number | undefined, radius: number) {
    if (lat === undefined || lon === undefined) {
      return [0, 0, 0]; // Default position if lat/lon are not defined
    }
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = -lon * (Math.PI / 180);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z] as [number, number, number];
  }

  const isMobile = window.innerWidth < 768;

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

function ZoomCamera({ cameraRef, setZooming }: { cameraRef: React.RefObject<THREE.PerspectiveCamera>, setZooming: (v: boolean) => void }) {
  useFrame(() => {
    if (!cameraRef.current) return;
    const targetZ = 3.7;
    const targetY = 3.7;
    const speed = 0.02;


    if (cameraRef.current.position.z > targetZ) {
      cameraRef.current.position.z -= speed;
      if (cameraRef.current.position.z <= targetZ) {
        cameraRef.current.position.z = targetZ;
        setZooming(false);
      }
    }

  });
  return null;
}
  

  return (
    <Canvas
      style={{ width: "100vw", minHeight: "100dvh", position: "absolute", top: 0, left: 0 }}
      camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 1000 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera;
      }}
    >
      {/* Camera zoom-in effect */}
      {zooming && <ZoomCamera cameraRef={cameraRef} setZooming={setZooming} />}


      <ambientLight intensity={0.2} />

      <AnimatedLight />
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          wireframe={false}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Cloud sphere */}
      <Clouds />
      {/* Static pinpoint */}
      <mesh position={[pinPosition[0], pinPosition[1]+1.9, pinPosition[2]]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Animated ping effect */}
      <Ping position={[pinPosition[0], pinPosition[1]+1.9, pinPosition[2]]} />
      {/* 3D Text under the pinpoint */}
      <Text
        position={[pinPosition[0], pinPosition[1] +1.9 + 0.13, pinPosition[2]]}
        fontSize={0.07}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineColor="black"
        outlineWidth={0.012}
        renderOrder={999}
      >
        Your Location
      </Text>
      <OrbitControls enableZoom={false}
        // minDistance={4.5}
        // maxDistance={5}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.atan2(5, 4)} maxPolarAngle={Math.atan2(5, 4)}
      />
      <Stars speed={1} />
    </Canvas>
  );
}
