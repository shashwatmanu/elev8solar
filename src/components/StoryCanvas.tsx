"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Sky, Stars, Grid, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

function SolarFarmDirector() {
  const frameRef = useRef<THREE.InstancedMesh>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const thickGridRef = useRef<THREE.InstancedMesh>(null);
  const thinGridRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const groundRef = useRef<THREE.Mesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyGrid = useMemo(() => new THREE.Object3D(), []);
  const { camera, clock } = useThree();

  // High-res photographic texture for true realism
  const groundMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/terrain/grasslight-big.jpg');
  
  useMemo(() => {
    if (groundMap) {
      groundMap.wrapS = groundMap.wrapT = THREE.RepeatWrapping;
      groundMap.repeat.set(4000, 4000); // Tile densely so grass blades look appropriately small
      groundMap.colorSpace = THREE.SRGBColorSpace;
    }
  }, [groundMap]);
  
  const rows = 20;
  const cols = 50; 
  const count = rows * cols; // 1000 panels
  
  useEffect(() => {
    if (meshRef.current && frameRef.current && thickGridRef.current && thinGridRef.current) {
      let i = 0;
      for (let r = -rows/2; r < rows/2; r++) {
        for (let c = -cols/2; c < cols/2; c++) {
          const x = c * 6.7; 
          const z = r * 15;
          
          dummy.position.set(x, 0, z);
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
          thinGridRef.current.setMatrixAt(i, dummyGrid.matrix);
          
          i++;
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
      frameRef.current.instanceMatrix.needsUpdate = true;
      thickGridRef.current.instanceMatrix.needsUpdate = true;
      thinGridRef.current.instanceMatrix.needsUpdate = true;
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
        
        // Keep the immediate solar farm area perfectly flat
        if (dist > 150) {
          // Generate massive rolling hills using stacked low-frequency sine waves
          const hill1 = Math.sin(x * 0.002) * Math.cos(y * 0.002) * 40;
          const hill2 = Math.sin(x * 0.005) * Math.cos(y * 0.005) * 15;
          
          // Gradually introduce the hills to avoid abrupt clipping with the flat area
          const blend = Math.min(1, (dist - 150) / 200);
          
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
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 1.5)));

    // --- MATRIX-STYLE FLY-IN INTRO ---
    // The loading screen takes ~2.5s. We wait for it to finish before starting the camera fly-in!
    const introTime = Math.max(0, clock.elapsedTime - 2.5); 
    const introT = Math.min(1, introTime / 2.5); // 0 to 1 over 2.5 seconds
    const introEase = 1 - Math.pow(1 - introT, 3); // Cubic ease-out (smooth glide)
    
    // Camera starts at x = -40 (crosses fewer panels for a tighter cinematic intro)
    const currentHeroX = THREE.MathUtils.lerp(-40, 0, introEase);

    // --- CAMERA POSITIONS ---
    const heroX = currentHeroX;
    const heroY = 3.0; 
    const heroZ = 8.0; 

    const farmX = 20;
    const farmY = 30;
    const farmZ = 80;

    const targetX = THREE.MathUtils.lerp(heroX, farmX, progress);
    const targetY = THREE.MathUtils.lerp(heroY, farmY, progress);
    const targetZ = THREE.MathUtils.lerp(heroZ, farmZ, progress);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // --- CINEMATIC LOOK TARGET ---
    const mouseInfluence = Math.max(0, 1 - progress * 4); 
    
    // Track the camera's ACTUAL position (which lags slightly due to lerping) 
    // to ensure it NEVER turns its head left/right while flying down the lane!
    const heroLookX = camera.position.x + (state.mouse.x * 1.5 * mouseInfluence);
    const heroLookY = 0 + (state.mouse.y * 1.5 * mouseInfluence);
    const heroLookZ = 0;

    const farmLookX = 0;
    const farmLookY = -10;
    const farmLookZ = -100;

    const targetLookX = THREE.MathUtils.lerp(heroLookX, farmLookX, progress);
    const targetLookY = THREE.MathUtils.lerp(heroLookY, farmLookY, progress);
    const targetLookZ = THREE.MathUtils.lerp(heroLookZ, farmLookZ, progress);

    camera.lookAt(targetLookX, targetLookY, targetLookZ);

    // --- MOUSE TILT (No rising animation, keep planted) ---
    if (groupRef.current) {
      // Plant the panels directly onto the ground so they don't appear to float without stands
      groupRef.current.position.y = -1.9;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (state.mouse.y * 0.05 * mouseInfluence),
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.mouse.x * 0.05 * mouseInfluence),
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Physical Earth Ground (receives shadows, highly segmented for physical hills) */}
      <mesh ref={groundRef} position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20000, 20000, 150, 150]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={1} 
          metalness={0} 
          map={groundMap}
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
      
      {/* 3. Clean Primary Busbars */}
      <instancedMesh ref={thickGridRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
        <planeGeometry args={[5.8, 7.8, 6, 8]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#cbd5e1" 
          emissiveIntensity={2} 
          wireframe 
          transparent 
          opacity={0.6} 
          depthWrite={false}
        />
      </instancedMesh>

      {/* 4. Internal Micro-wires (Fingers) */}
      <instancedMesh ref={thinGridRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
        <planeGeometry args={[5.8, 7.8, 24, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#64748b" 
          emissiveIntensity={1} 
          wireframe 
          transparent 
          opacity={0.2} 
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}

export default function StoryCanvas({ active = true }: { active?: boolean }) {
  return (
    <div className="sticky top-0 h-screen w-full pointer-events-none z-0 overflow-hidden">
      <Canvas frameloop={active ? "always" : "never"} shadows camera={{ position: [0, 3.0, 8.0], fov: 50 }} dpr={[1, 1.5]}>
        
        <EffectComposer>
          <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.0} />
        </EffectComposer>

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
        
        <ambientLight intensity={0.1} />

        
        {/* Massive shadow-casting sun */}
        <directionalLight 
          position={[-50, 20, -50]} 
          intensity={4} 
          color="#f97316" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        >
          <orthographicCamera attach="shadow-camera" args={[-150, 150, 150, -150, 0.1, 500]} />
        </directionalLight>
        
        <directionalLight position={[10, 20, 10]} intensity={0.5} color="#0ea5e9" />
        
        <SolarFarmDirector />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
