import { useEffect, useState } from "react"



function Cursor() {

    const [coordinates, setCoordinate] = useState([0,0])

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            setCoordinate([e.x,e.y])
        })
    }, [])
    

    return (
        <>
            <div id='cursor'  style={{top: coordinates[1], left: coordinates[0]}} ></div>
        </>
    )
}

export default Cursor
