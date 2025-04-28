import { useEffect, useRef, useState } from "react"
import FallingStar from "./FallingStar.jsx"


function Cursor() {

    const [coordinates, setCoordinate] = useState([0,0])
    const [stars, setStars] = useState([])

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            setCoordinate([e.x,e.y])

            setStars(prev => ([...prev, <FallingStar/>]));
            console.log(stars)

        })
    }, [])
    

    return (
        <>
            <div id='cursor' style={{top: coordinates[1], left: coordinates[0]}}></div>
            <FallingStar x={coordinates[0]} y={coordinates[1]}/>
        </>

    )
}

export default Cursor
