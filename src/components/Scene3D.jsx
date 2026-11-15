import { useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Particles from './Particles'

function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 12)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
}

function SceneContent({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#34d399" />
      <pointLight position={[-10, -10, -5]} intensity={0.25} color="#10b981" />
      <Particles mouse={mouse} />
      <fog attach="fog" args={['#020408', 12, 30]} />
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>
    </>
  )
}

export default function Scene3D() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#020408', 1)
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          // Wait one frame so the first scene render has painted, then dismiss
          // the preloader — the loader stays up until the 3D is actually visible.
          requestAnimationFrame(() => window.__hidePreloader?.())
        }}
      >
        <CameraController />
        <SceneContent mouse={mouse} />
      </Canvas>
    </div>
  )
}
