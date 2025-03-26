import { useEffect, useRef, useState } from 'react'
import Star from './Star.jsx' 



const Background = () => {
    
    const stars = []

    for (let i = 0; i < 100; i++) {
        stars.push(i)
    }


    return (
        <>
            <div  id='background'>

                {stars.map((star, key) => {
                    return (<Star key={key} index={key}/>)
                })}

            </div>
        </>
    )
}


export default Background