"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SolidSolarPanel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth tilt on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -Math.PI / 3 - (state.mouse.y * 0.05),
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.mouse.x * 0.1),
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]}>
      <mesh>
        <planeGeometry args={[30, 30, 30, 30]} />
        <meshPhysicalMaterial color="#020617" metalness={0.9} roughness={0.1} clearcoat={1} />
      </mesh>
      
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[30, 30, 30, 30]} />
        <meshBasicMaterial color="#fbbf24" wireframe={true} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 5, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, 10, 5]} intensity={1.5} color="#0ea5e9" />
        <SolidSolarPanel />
        {/* 
          The 'city' preset generates an invisible HDRI map of a cityscape around the scene.
          It doesn't render the buildings in the background, but it allows the extremely
          shiny solar panel to REFLECT the buildings and sky, creating that incredible realism!
        */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
