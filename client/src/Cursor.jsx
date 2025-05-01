import { useEffect, useRef, useState } from "react"
import FallingStar from "./FallingStar.jsx"


function Cursor() {

    const [coordinates, setCoordinate] = useState([0,0])
    const [stars, setStars] = useState([])

    useEffect(() => {

        let count = 0;

        document.addEventListener('mousemove', (e) => {
            setCoordinate([e.x,e.y])

            if (count % 10 == 0) {
                setStars(prev => {

                    const arr = [...prev];

                    if (Math.random() > 0.5) {
                        arr.push(<FallingStar x={e.x + Math.random() * 20 - 10} y={e.y + Math.random() * 20 - 10}/>)
                    }

                    if (Math.random() > 0.5) {
                        arr.push(<FallingStar x={e.x + Math.random() * 20 - 10} y={e.y + Math.random() * 20 - 10}/>)
                    }


                    

                    return (arr)
                });
            }

            count++;

            console.log(stars)

        })
    }, [])
    

    return (
        <>
            <div id='cursor' style={{top: coordinates[1], left: coordinates[0]}}></div>
            {stars}
        </>

    )
}

export default Cursor
