import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '../lib/scrollState'

const BG = '#091D3B'
const ACCENT = '#69B8FF'
const GRID_CYAN = '#1d4a6e'

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

/** Drives the camera from top-down CAD view (p=0) to eye-level (p=1). */
function CameraRig() {
  const camera = useThree((s) => s.camera)
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const p = smoothstep(scrollState.progress)
    const parallax = 0.25 + p * 0.15
    camera.position.set(
      scrollState.mouseX * parallax,
      16 - p * 13.8 + scrollState.mouseY * 0.12,
      0.02 + p * 7.5,
    )
    target.set(0, p * 1.2, -1)
    camera.lookAt(target)
  })
  return null
}

/** Re-render only when scroll/mouse actually change (frameloop="demand"). */
function InvalidateOnScroll() {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    const listener = () => invalidate()
    scrollState.listeners.add(listener)
    return () => {
      scrollState.listeners.delete(listener)
    }
  }, [invalidate])
  return null
}

/** Wireframe volumes that extrude out of the blueprint as you scroll — "UI rising from the paper". */
function RisingWireframes() {
  const group = useRef<THREE.Group>(null)
  const boxes = useMemo(
    () => [
      { x: -3.4, z: -2.2, w: 1.6, h: 2.2, d: 1.2 },
      { x: 2.8, z: -3.2, w: 2.0, h: 1.5, d: 1.4 },
      { x: -1.2, z: -4.6, w: 1.2, h: 2.8, d: 1.2 },
      { x: 3.6, z: -0.8, w: 1.1, h: 1.1, d: 1.1 },
      { x: 0.8, z: -6.2, w: 2.4, h: 1.9, d: 1.6 },
    ],
    [],
  )

  useFrame(() => {
    const p = smoothstep(scrollState.progress)
    group.current?.children.forEach((child, i) => {
      const h = boxes[i].h
      const grow = Math.min(1, Math.max(0, p * 1.6 - i * 0.12))
      child.scale.y = 0.02 + grow * h
      child.position.y = child.scale.y / 2
    })
  })

  return (
    <group ref={group}>
      {boxes.map((b, i) => (
        <mesh key={i} position={[b.x, 0.01, b.z]}>
          <boxGeometry args={[b.w, 1, b.d]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.28} />
        </mesh>
      ))}
    </group>
  )
}

function Particles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = Math.random() * 6 + 0.2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 24 - 4
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={ACCENT} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export default function BlueprintScene() {
  useEffect(() => {
    let raf = 0
    function onMouseMove(e: MouseEvent) {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1
        scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1
        scrollState.notify()
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 16, 0.02], fov: 45, near: 0.1, far: 60 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[BG]} />
        <fog attach="fog" args={[BG, 14, 42]} />
        <ambientLight intensity={0.6} />
        <CameraRig />
        <InvalidateOnScroll />
        <Grid
          position={[0, 0, 0]}
          args={[60, 60]}
          cellSize={0.6}
          cellThickness={0.6}
          cellColor={GRID_CYAN}
          sectionSize={3}
          sectionThickness={1}
          sectionColor={ACCENT}
          fadeDistance={34}
          fadeStrength={1.5}
          infiniteGrid
        />
        <RisingWireframes />
        <Particles />
      </Canvas>
    </div>
  )
}
