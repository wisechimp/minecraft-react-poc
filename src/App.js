import { Sky } from 'drei';
import React from 'react'
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import { Physics } from 'use-cannon';
import { 
  Camera,
  Cube,
  Ground,
  Player,
  useCubeStore
 } from './gameComponents'

function App() {
  const cubes = useCubeStore(state => state.cubes)

  return (
    <Canvas shadowMap sRGB gl={{ alpha: false }}>
      <Camera fov={50} />
      {/* As Maksim says in the tutorial he's chosen these values, in the subsequent lines, "because they look better"! */}
      <Sky sunPosition={new Vector3(100, 10, 100)} />
      <ambientLight intensity={0.3} />
      {/* This allows us to create shadows */}
      <pointLight 
        castShadow
        intensity={0.8}
        position={[100, 100, 100]}
      />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
        <Cube position={[0, 0.5, -10]} />
        {
          cubes.map(cube => cube)
        }
      </Physics>
    </Canvas>
  )
}

export default App;
