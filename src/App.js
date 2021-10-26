/*import React from 'react'
import ReactDOM from 'react-dom'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer' 
import {Box1} from './box.js'
import * as THREE from 'three';
extend({ CSS3DObject })

function Cstest(){
  const { gl } = useThree()
  const scene = new THREE.Scene();
  const element = document.createElement('div');
    element.className = 'element';
    element.id="hello"
    element.textContent = "Hello"
  const cstest1 = new CSS3DObject(element);
  scene.add(cstest1);
  return <primitive object={cstest1} position={[0,0,0]} />
}

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas >
        <ambientLight intensity={0.9} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[2, 100, 2]} />
          <meshStandardMaterial color="green" />
        </mesh>
        <Box1 />
        <Cstest />
      </Canvas>
     
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))*/

import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, extend,  useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} enableZoom={false}
  maxAzimuthAngle={Math.PI / 4}
  maxPolarAngle={Math.PI}
  minAzimuthAngle={-Math.PI / 4}
  minPolarAngle={0} />;
};

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas id="my">
      <CameraControls />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-3.2, 0, 0]} />
        <Box position={[3.2, 0, 0]} />
      </Canvas>,

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
/*ReactDOM.render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
  document.getElementById('root'),
)*/