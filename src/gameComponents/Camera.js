import React, { useRef, useEffect } from 'react'
import { useThree } from 'react-three-fiber'

export default (props) => {
    const ref = useRef()
    const { setDefaultCamera } = useThree()

    useEffect(() => {
        setDefaultCamera(ref.current)
    }, [])

    return <perspectiveCamera ref={ ref } { ...props } />
}