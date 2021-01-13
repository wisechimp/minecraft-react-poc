import { Sky } from 'drei';
import React from 'react'
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import { Physics } from 'use-cannon';
import Camera from './gameComponents/Camera'
import Ground from './gameComponents/Ground'
import Player from './gameComponents/Player'

function App() {
  return (
    <Canvas shadowMap sRGB gl={{ alpha: false}}>
      <Camera />
      <Sky sunPosition={new Vector3(100, 10, 100)} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
      </Physics>
    </Canvas>
  )
}

export default App;
