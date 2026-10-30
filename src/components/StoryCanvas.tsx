"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sky, Stars, Grid } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function SolarFarmDirector() {
  const frameRef = useRef<THREE.InstancedMesh>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const thickGridRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const groundRef = useRef<THREE.Mesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyGrid = useMemo(() => new THREE.Object3D(), []);
  const { camera, clock } = useThree();
  
  const rows = 12;
  const cols = 20; 
  const count = rows * cols; // 240 panels: 75% reduction in GPU draw calls & memory
  
  useEffect(() => {
    if (meshRef.current && frameRef.current && thickGridRef.current) {
      let i = 0;
      for (let r = -rows/2; r < rows/2; r++) {
        for (let c = -cols/2; c < cols/2; c++) {
          const x = c * 7.0; 
          const z = r * 16.0;
          
          dummy.position.set(x, 2.0, z);
          dummy.rotation.set(0, 0, 0); 
          dummy.rotation.x = Math.PI / 6; 
          dummy.updateMatrix();
          
          meshRef.current.setMatrixAt(i, dummy.matrix);
          frameRef.current.setMatrixAt(i, dummy.matrix);
          
          dummyGrid.position.copy(dummy.position);
          dummyGrid.rotation.copy(dummy.rotation);
          dummyGrid.translateY(0.13); // Slightly above glass
          dummyGrid.rotateX(-Math.PI / 2);
          dummyGrid.updateMatrix();
          
          thickGridRef.current.setMatrixAt(i, dummyGrid.matrix);
          
          i++;
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      frameRef.current.instanceMatrix.needsUpdate = true;
      thickGridRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, dummyGrid]);

  // Procedural mathematical displacement for rolling hills & horizon curvature
  useEffect(() => {
    if (groundRef.current) {
      const positions = groundRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i); // y is Z-axis in world space due to rotation
        
        const dist = Math.sqrt(x * x + y * y);
        
        // Keep the solar farm array area (which spans 400m+ in x and z) completely flat
        if (dist > 350) {
          // Generate massive rolling hills using stacked low-frequency sine waves
          const hill1 = Math.sin(x * 0.002) * Math.cos(y * 0.002) * 40;
          const hill2 = Math.sin(x * 0.005) * Math.cos(y * 0.005) * 15;
          
          // Gradually introduce the hills to avoid abrupt clipping with the flat area
          const blend = Math.min(1, (dist - 350) / 250);
          
          // Horizon drop-off (simulating planetary curvature at extreme distances)
          const curvature = -Math.pow(dist * 0.0005, 2) * 100; 
          
          positions.setZ(i, (hill1 + hill2 + curvature) * blend);
        }
      }
      positions.needsUpdate = true;
      groundRef.current.geometry.computeVertexNormals();
    }
  }, []);

  useFrame((state) => {
    const time = clock.elapsedTime;
    
    // Cinematic slow pan across the solar farm
    const orbitRadius = 40;
    const speed = 0.05;
    
    // The camera constantly glides in a wide, sweeping arc
    const targetX = Math.sin(time * speed) * orbitRadius;
    const targetY = 12.0 + Math.sin(time * speed * 0.5) * 4.0; // Gentle vertical drone movement
    const targetZ = 45 + Math.cos(time * speed) * orbitRadius;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.01);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.01);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.01);

    // Cinematic fixed center focus without mouse tracking
    camera.lookAt(0, 2, 0);

    if (groupRef.current) {
      groupRef.current.position.y = 0;
      // Gentle cinematic breathing motion instead of cursor tilt
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.003;
      groupRef.current.rotation.y = Math.cos(time * 0.15) * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Physical Earth Ground */}
      <mesh ref={groundRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20000, 20000, 60, 60]} />
        <meshStandardMaterial 
          color="#152018" 
          roughness={0.9} 
          metalness={0.1} 
        />
      </mesh>

      {/* 1. The Aluminum Frame Edge */}
      <instancedMesh ref={frameRef} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.2, 8.2]} />
        <meshStandardMaterial 
          color="#cbd5e1" 
          metalness={0.9} 
          roughness={0.3} 
        />
      </instancedMesh>

      {/* 2. The Dark Glass Panel */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[6.0, 0.22, 8.0]} />
        <meshPhysicalMaterial 
          color="#0f2040" 
          metalness={1} 
          roughness={0.1} 
          clearcoat={1} 
        />
      </instancedMesh>
      
      {/* 3. Clean Modern Busbars */}
      <instancedMesh ref={thickGridRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
        <planeGeometry args={[5.8, 7.8, 12, 16]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#cbd5e1" 
          emissiveIntensity={1.5} 
          wireframe 
          transparent 
          opacity={0.4} 
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

export default function StoryCanvas({ active = true, className = "absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" }: { active?: boolean, className?: string }) {
  return (
    <div className={className}>
      <Canvas 
        frameloop={active ? "always" : "never"} 
        camera={{ position: [0, 3.0, 8.0], fov: 50 }} 
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", alpha: true }}
      >
        {/* The Beautiful Procedural Sky */}
        <Sky 
          distance={450000} 
          sunPosition={[-50, 4, -100]} 
          inclination={0.49} 
          azimuth={0.25} 
          rayleigh={2} 
          turbidity={6} 
          mieCoefficient={0.005} 
        />
        
        <ambientLight intensity={0.5} />

        {/* Sunlight */}
        <directionalLight 
          position={[-50, 20, -50]} 
          intensity={3} 
          color="#f97316" 
        />
        
        <directionalLight position={[10, 20, 10]} intensity={0.8} color="#0ea5e9" />
        
        <SolarFarmDirector />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
