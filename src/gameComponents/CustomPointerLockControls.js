import React, { useEffect, useRef } from 'react'
import { extend, useThree } from 'react-three-fiber'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'

extend({ PointerLockControlsImpl })

const CustomPointerLockControls = (props) => {
    const { camera, gl } = useThree()
    // We need to modify the controls so they work with react-three-fiber
    const controls = useRef()

    // So whenever we click on the screen the cursor is locked to allow the user to move the camera about
    useEffect(() => {
        document.addEventListener("click", () => {
            controls.current.lock()
        })
    }, [])

    return (
        <pointerLockControlsImpl 
            ref={controls}
            args={[camera, gl.domElement]}
            {...props}
        />
    )
}

export default CustomPointerLockControls