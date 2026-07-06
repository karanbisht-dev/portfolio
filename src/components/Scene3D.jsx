import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import './Scene3D.css'

// Camera gently follows the pointer and pushes back as you scroll.
function Rig() {
  useFrame((state) => {
    const scroll = window.scrollY / window.innerHeight
    const targetX = state.pointer.x * 0.9
    const targetY = state.pointer.y * 0.6 - scroll * 0.4
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04
    state.camera.position.z += (6 + scroll * 0.7 - state.camera.position.z) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

// A glowing, morphing core with a rotating wireframe shell around it.
function Core() {
  const solid = useRef()
  const wire = useRef()
  useFrame((_, delta) => {
    if (solid.current) {
      solid.current.rotation.x += delta * 0.08
      solid.current.rotation.y += delta * 0.12
      solid.current.rotation.z = window.scrollY * 0.0009
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.06
      wire.current.rotation.x += delta * 0.03
    }
  })
  return (
    <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.4}>
      <group position={[3.1, 0.9, -1.4]}>
        <mesh ref={solid} scale={2.2}>
          <icosahedronGeometry args={[1, 20]} />
          <MeshDistortMaterial
            color="#ff5436"
            emissive="#ff3b24"
            emissiveIntensity={0.75}
            roughness={0.15}
            metalness={0.5}
            distort={0.45}
            speed={1.6}
          />
        </mesh>
        <mesh ref={wire} scale={3.0}>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial color="#ff8a5c" wireframe transparent opacity={0.18} />
        </mesh>
      </group>
    </Float>
  )
}

// Bright, slowly rotating starfield.
function StarField() {
  const group = useRef()
  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.02
    group.current.rotation.x += delta * 0.008
  })
  return (
    <group ref={group}>
      <Stars radius={50} depth={50} count={4500} factor={6} saturation={0} fade speed={1.2} />
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="scene3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <pointLight position={[-6, -3, -4]} intensity={3} color="#7a4dff" />
        <pointLight position={[6, 4, 2]} intensity={2} color="#ff8a5c" />
        <Suspense fallback={null}>
          <Core />
          <StarField />
        </Suspense>
        <Rig />
      </Canvas>
    </div>
  )
}
