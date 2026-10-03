"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/store"; // We'll just hook this to window scroll

function AluminumFrame({ yOffset }: { yOffset: number }) {
  return (
    <group position={[0, yOffset, 0]}>
      <mesh position={[0, 0, 4.1]}><boxGeometry args={[6.2, 0.2, 0.2]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[0, 0, -4.1]}><boxGeometry args={[6.2, 0.2, 0.2]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[3.1, 0, 0]}><boxGeometry args={[0.2, 0.2, 8.4]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[-3.1, 0, 0]}><boxGeometry args={[0.2, 0.2, 8.4]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} /></mesh>
    </group>
  );
}

function SolarCells({ yOffset }: { yOffset: number }) {
  const cells = [];
  for (let x = -2; x <= 2; x += 1.3) {
    for (let z = -3; z <= 3; z += 1.3) {
      cells.push(
        <mesh key={`${x}-${z}`} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial color="#0a1128" metalness={0.8} roughness={0.2} />
          
          {/* Faked Cut Corners to simulate monocrystalline wafer shape on white backsheet */}
          <mesh position={[-0.6, 0.6, 0.005]} rotation={[0, 0, Math.PI / 4]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color="#f8fafc" /></mesh>
          <mesh position={[0.6, 0.6, 0.005]} rotation={[0, 0, Math.PI / 4]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color="#f8fafc" /></mesh>
          <mesh position={[-0.6, -0.6, 0.005]} rotation={[0, 0, Math.PI / 4]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color="#f8fafc" /></mesh>
          <mesh position={[0.6, -0.6, 0.005]} rotation={[0, 0, Math.PI / 4]}><planeGeometry args={[0.15, 0.15]} /><meshBasicMaterial color="#f8fafc" /></mesh>

          {/* Main Busbars (5BB modern configuration) */}
          {[-0.4, -0.2, 0, 0.2, 0.4].map((bx, i) => (
            <mesh key={i} position={[bx, 0, 0.01]}><planeGeometry args={[0.015, 1.2]} /><meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.1} /></mesh>
          ))}
          
          {/* Tiny cross grid (fingers) */}
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[1.2, 1.2, 1, 20]} />
            <meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.2} />
          </mesh>
        </mesh>
      );
    }
  }
  return <group position={[0, yOffset, 0]}>{cells}</group>;
}

function ExplodedView() {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Group>(null);
  const evaTopRef = useRef<THREE.Group>(null);
  const cellsRef = useRef<THREE.Group>(null);
  const evaBotRef = useRef<THREE.Group>(null);
  const backsheetRef = useRef<THREE.Group>(null);

  // We read the global scroll store. 
  // In the DOM, this component is halfway down the page, so we explode it based on its visibility window.
  // Actually, to make it simple without prop drilling, we'll just read window.scrollY.
  
  useFrame((state) => {
    if (groupRef.current) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Assume the component is roughly 150vh down the page.
      // We'll just make it explode as you scroll past a certain point.
      const explosionStart = windowHeight * 0.8;
      const explosionProgress = Math.max(0, Math.min(1, (scrollY - explosionStart) / (windowHeight)));
      
      const factor = explosionProgress * 1.0; // Moderate explosion so text labels clear each other

      if(glassRef.current) glassRef.current.position.y = THREE.MathUtils.lerp(glassRef.current.position.y, factor * 2, 0.1);
      if(evaTopRef.current) evaTopRef.current.position.y = THREE.MathUtils.lerp(evaTopRef.current.position.y, factor * 1, 0.1);
      if(cellsRef.current) cellsRef.current.position.y = THREE.MathUtils.lerp(cellsRef.current.position.y, 0, 0.1); 
      if(evaBotRef.current) evaBotRef.current.position.y = THREE.MathUtils.lerp(evaBotRef.current.position.y, -factor * 1, 0.1);
      if(backsheetRef.current) backsheetRef.current.position.y = THREE.MathUtils.lerp(backsheetRef.current.position.y, -factor * 2, 0.1);

      // Gentle breathing oscillation so it feels alive but never exposes the back
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* This inner group tilts the flat panel so it looks slanted and cinematic! */}
      <group rotation={[Math.PI / 2.3, 0, Math.PI / 12]}>
        <group ref={glassRef}>
          <AluminumFrame yOffset={0} />
          <mesh><boxGeometry args={[6, 0.05, 8]} /><meshPhysicalMaterial color="#e0f2fe" transmission={0.9} opacity={1} roughness={0.05} metalness={0.1} clearcoat={1} depthWrite={false} /></mesh>
          <Text position={[4, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">Tempered Glass</Text>
          <mesh position={[3.4, 0, 0]}><boxGeometry args={[0.8, 0.01, 0.01]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.5} /></mesh>
        </group>
        <group ref={evaTopRef}>
          <mesh><boxGeometry args={[5.9, 0.02, 7.9]} /><meshPhysicalMaterial color="#ffffff" transmission={0.7} opacity={0.4} transparent roughness={0.3} depthWrite={false} /></mesh>
          <Text position={[4.5, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.2} color="#bae6fd" anchorX="center" anchorY="middle">EVA Encapsulant (Top)</Text>
          <mesh position={[3.65, 0, 0]}><boxGeometry args={[1.3, 0.01, 0.01]} /><meshBasicMaterial color="#bae6fd" transparent opacity={0.5} /></mesh>
        </group>
        <group ref={cellsRef}>
          <SolarCells yOffset={0} />
          <Text position={[5, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.3} color="#fbbf24" anchorX="center" anchorY="middle">Monocrystalline Cells</Text>
          <mesh position={[3.9, 0, 0]}><boxGeometry args={[1.8, 0.01, 0.01]} /><meshBasicMaterial color="#fbbf24" transparent opacity={0.5} /></mesh>
        </group>
        <group ref={evaBotRef}>
          <mesh><boxGeometry args={[5.9, 0.02, 7.9]} /><meshPhysicalMaterial color="#ffffff" transmission={0.7} opacity={0.4} transparent roughness={0.3} depthWrite={false} /></mesh>
          <Text position={[5.5, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.2} color="#bae6fd" anchorX="center" anchorY="middle">EVA Encapsulant (Bottom)</Text>
          <mesh position={[4.15, 0, 0]}><boxGeometry args={[2.3, 0.01, 0.01]} /><meshBasicMaterial color="#bae6fd" transparent opacity={0.5} /></mesh>
        </group>
        <group ref={backsheetRef}>
          <mesh><boxGeometry args={[6, 0.05, 8]} /><meshStandardMaterial color="#f8fafc" roughness={0.9} metalness={0.1} /></mesh>
          <Text position={[6, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.3} color="#94a3b8" anchorX="center" anchorY="middle">Polymer Backsheet</Text>
          <mesh position={[4.4, 0, 0]}><boxGeometry args={[2.8, 0.01, 0.01]} /><meshBasicMaterial color="#94a3b8" transparent opacity={0.5} /></mesh>
        </group>
      </group>
    </group>
  );
}

export default function ExplodedPanel() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 0, 22], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        <ExplodedView />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
