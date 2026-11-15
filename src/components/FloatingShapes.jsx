import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingShape({ geometry, position, rotationSpeed, color, scale = 1, wireframe = true }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.rotation.x += rotationSpeed[0] * 0.01
    meshRef.current.rotation.y += rotationSpeed[1] * 0.01
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        wireframe={wireframe}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

export default function FloatingShapes() {
  return (
    <group>
      <FloatingShape
        geometry={<icosahedronGeometry args={[1.5, 0]} />}
        position={[-6, 2, -4]}
        rotationSpeed={[0.5, 0.8, 0.2]}
        color="#8b5cf6"
        scale={1.2}
      />
      <FloatingShape
        geometry={<torusKnotGeometry args={[1, 0.3, 128, 16]} />}
        position={[5, -1, -6]}
        rotationSpeed={[0.3, 0.6, 0.4]}
        color="#a78bfa"
        scale={1}
      />
      <FloatingShape
        geometry={<octahedronGeometry args={[1.2, 0]} />}
        position={[3, 4, -3]}
        rotationSpeed={[0.7, 0.4, 0.3]}
        color="#c4b5fd"
        scale={0.9}
      />
      <FloatingShape
        geometry={<dodecahedronGeometry args={[1, 0]} />}
        position={[-4, -3, -5]}
        rotationSpeed={[0.4, 0.9, 0.5]}
        color="#7c3aed"
        scale={1.1}
      />
      <FloatingShape
        geometry={<sphereGeometry args={[0.8, 32, 32]} />}
        position={[7, 3, -7]}
        rotationSpeed={[0.2, 0.5, 0.1]}
        color="#6d28d9"
        scale={0.8}
        wireframe={false}
      />
    </group>
  )
}
