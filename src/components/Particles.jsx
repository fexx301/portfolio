import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ mouse }) {
  const pointsRef = useRef()
  const count = window.matchMedia('(max-width: 768px)').matches ? 500 : 900

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 25
      positions[i3 + 1] = (Math.random() - 0.5) * 25
      positions[i3 + 2] = (Math.random() - 0.5) * 25

      velocities[i3] = (Math.random() - 0.5) * 0.006
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.006
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.006
    }

    return [positions, velocities]
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const posArray = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      posArray[i3] += velocities[i3] + Math.sin(time * 0.2 + i * 0.1) * 0.002
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.15 + i * 0.1) * 0.002
      posArray[i3 + 2] += velocities[i3 + 2]

      const dx = posArray[i3] - mouse.current.x * 8
      const dy = posArray[i3 + 1] - mouse.current.y * 8
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 0 && dist < 3) {
        const force = (3 - dist) * 0.015
        posArray[i3] += (dx / dist) * force
        posArray[i3 + 1] += (dy / dist) * force
      }

      if (posArray[i3] > 12.5) posArray[i3] = -12.5
      if (posArray[i3] < -12.5) posArray[i3] = 12.5
      if (posArray[i3 + 1] > 12.5) posArray[i3 + 1] = -12.5
      if (posArray[i3 + 1] < -12.5) posArray[i3 + 1] = 12.5
      if (posArray[i3 + 2] > 12.5) posArray[i3 + 2] = -12.5
      if (posArray[i3 + 2] < -12.5) posArray[i3 + 2] = 12.5
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += delta * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#34d399"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
