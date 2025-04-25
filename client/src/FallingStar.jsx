import { useEffect, useRef, useState } from "react";





function FallingStar(props) {

    const [drop, setDrop] = useState(0)
    const star = useRef()

    const x = props.x;
    const y = props.y;

    useEffect(() => {

        let localDrop = 0

        const starInterval = setInterval(() => {
            localDrop += 1;
            setDrop(localDrop)
            
            if (localDrop > 50) {
                clearInterval(starInterval)
            }

        }, 7)

        return () => clearInterval(starInterval);
    }, [])

    return (
        <>
            {drop < 49 && <div ref={star} className="star-lg" style={{left: `${x}px`, top: `${y + drop}px`}}></div>}
        </>
    )
}

export default FallingStar