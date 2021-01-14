import React, { useRef, useEffect } from 'react'
import { useThree } from 'react-three-fiber'

const Camera = (props) => {
    const ref = useRef()
    const { setDefaultCamera } = useThree()

    // Setting the Camera the one time when the component is mounted, so
    // no dependancy, hence es-lint comment below
    useEffect(() => {
        setDefaultCamera(ref.current)
        // eslint-disable-next-line
    }, [])

    return <perspectiveCamera ref={ref} {...props} />
}

export default Camera