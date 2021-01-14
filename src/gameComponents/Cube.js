import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { TextureLoader } from 'three'
import { useBox } from 'use-cannon'
import create from 'zustand'

import dirt from '../images/dirt.jpg'

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) => set((state) => ({
    cubes: [...state.cubes, <Cube key={nanoid()} position={[x, y, z]}/>]
  }))
}))

// The position of the cube is a key property
const Cube = (props) => {
  // What side of the cube are we hovering over with the mouse
  const [ hover, set ] = useState(null)

  const addCube = useCubeStore(state => state.addCube)

  const texture = new TextureLoader().load(dirt)

  // Static because it just sits there and doesn't need any physics involvement
  const [ ref ] = useBox(() => ({
    type: "Static",
    ...props
  }))

  // We need to stop propogation because if we have a line of cubes then each one
  // would register the mouse hovering over it
  return (
    <mesh
      castShadow
      ref = {ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        set(Math.floor(e.faceIndex / 2))
      }}
      onPointerOut={e => {
        set(null)
      }}
      onClick={
        e => {
          e.stopPropagation()

          const faceIndex = Math.floor(e.faceIndex / 2)
          const {x, y, z} = ref.current.position

          switch(faceIndex){
            case 4: {
              addCube(x, y, z + 1)
              return
            }
            case 2: {
              addCube(x, y + 1, z)
              return
            }
            case 1: {
              addCube(x - 1, y, z)
              return
            }
            case 5: {
              addCube(x, y, z - 1)
              return
            }
            case 3: {
              addCube(x, y - 1, z)
              return
            }
            default: {
              addCube(x + 1, y, z)
              return
            }
          }
        }
      }
    >
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          receiveShadow
          attachArray="material"
          map={texture}
          key={index}
          color={hover === index ? "grey" : "white"}
        />
      ))}
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}

export { Cube, useCubeStore }