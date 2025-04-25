import { useEffect, useRef, useState } from 'react'
import Star from './Star.jsx' 



const Background = () => {

    const [stars, setStars] = useState([])
    

    useEffect(() => {

        document.addEventListener('mousemove', (e) => {
            console.log(e)
        })

        const tempStars = []

        for (let i = 0; i < 100; i++) {
            tempStars.push({x: ((Math.random() * 10 - 5) + i * 10) % 100, y: ((Math.random() * 10 - 5) + Math.floor(i / 10) * 10), starType: Math.random()})
        }

        setStars(tempStars)
    }, [])
    


    return (
        <>


            <div id='background'>

                {stars.map((star, key) => {
                    return (<Star key={key} index={star} x={star.x} y={star.y} starType={star.starType}/>)
                })}

            </div>
        </>
    )
}


export default Background