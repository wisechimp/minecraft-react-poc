import React, {useEffect, useRef} from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { Vector3 } from 'three';
import { useSphere } from 'use-cannon'

import usePlayerControls from '../gameHooks/usePlayerControls'
import CustomPointerLockControls from './CustomPointerLockControls'

const SPEED = 5

const Player = (props) => {
    const { camera } = useThree()

    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump
    } = usePlayerControls()

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 10, 0],
        ...props
    }))

    // We can store any sort of value here, like a class's property field
    const velocity = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe(v => velocity.current = v)
    }, [])

    // This is where we update the physics for the Player
    useFrame(() => {
        camera.position.copy(ref.current.position)

        // We align the direction of the Player with the Camera direction
        const direction = new Vector3()

        // This allows simultaneous button pressing
        const frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward))
        const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)
        
        api.velocity.set(direction.x, velocity.current[1], direction.z)

        // Velocity will satisfy this when the Player's on the ground
        // and when they're at the crest of a jump allowing a double jump! 
        if(jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
            api.velocity.set(velocity.current[0], 10, velocity.current[2])
        }
    })

    return (
        <>
            <CustomPointerLockControls />
            <mesh ref={ref} />
        </>
    )
}

export default Player