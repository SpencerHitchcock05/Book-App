import { useEffect, useRef, useState } from "react"


function Card(props) {

    const disappearThreshold = 200
    const [disappearing, setDisappearing] = useState(false)
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
        })

        card.addEventListener("mouseup", (e) => {

            if (mouseDown.current) {
                setTranslation(0)
            }
                        
            mouseDown.current = false
            
        })

        card.addEventListener("mousemove", (e) => {
            if (mouseDown.current) {

                let trans = e.clientX - mouseDownLocation.current

                setTranslation(trans)
                
                if (Math.abs(trans) > disappearThreshold) {
                    setDisappearing(true)
                    mouseDown.current = false
                }
            }
        })
    }, [])

    const suggestion = props.suggestion


  
    return (
    <>
        <div className="card-container">
            <div ref={cardRef} style={{transform: `translate(${translation}px, ${Math.abs(translation) / 5}px) rotate(${translation / 20}deg)`, transition: `${translation == 0? "transform 0.2s ease-in-out" : ""}`}} className={`card ${disappearing? "disappearing" : ""}`}>
                <h2>{suggestion.title}</h2>
                <h4>{suggestion.author}</h4>
                <p>{suggestion.description}</p>
                {Math.abs(translation)}
            </div>
        </div>
    </>
    )
}

export default Card