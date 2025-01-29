import { useEffect, useRef, useState } from "react"


function Card(props) {

    const [hidden, setHidden] = useState(false)
    const [translation, setTranslation] = useState(0)
    const cardRef = useRef()

    const mouseDown = useRef(false)
    const mouseDownLocation = useRef(0)
    const lastLocation = useRef(0)

    useEffect(() => {
        const card = cardRef.current

        card.addEventListener("mousedown", (e) => {
            mouseDown.current = true;
            mouseDownLocation.current = e.clientX
            console.log(lastLocation.current)
        })

        card.addEventListener("mouseup", (e) => {
            mouseDown.current = false
            setTranslation(0)
        })

        card.addEventListener("mousemove", (e) => {
            if (mouseDown.current) {

                let trans = e.clientX - mouseDownLocation.current

                setTranslation(trans)
                
                if (Math.abs(trans) > 300) {
                    disappear()
                }
            }
        })
    }, [])

    const suggestion = props.suggestion

    const disappear = () => {
        setHidden(true)
    }
  
    return (
    <>
        <div className="card-container">
            <div ref={cardRef} style={{transform: `translateX(${translation}px)`, transition: "transform 0.2s ease-in-out"}} className={`card ${hidden? "d-none" : ""}`}>
                <h2>{suggestion.title}</h2>
                <h4>{suggestion.author}</h4>
                <p>{suggestion.description}</p>
                {translation}
            </div>
        </div>
    </>
    )
}

export default Card