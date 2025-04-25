import { useEffect, useState } from "react"
import FallingStar from "./FallingStar.jsx"


function Cursor() {

    const [coordinates, setCoordinate] = useState([0,0])

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            setCoordinate([e.x,e.y])

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
