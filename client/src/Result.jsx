import { useEffect, useState } from 'react'
import Card from './Card.jsx'




function Result(props) {

    const [accepted, setAccepted] = useState([])
    const [cardsLeft, setCardsLeft] = useState(props.suggestions.length)

    // useEffect(() => {

    //     if (cardsLeft <= 0) {

    //     }
    // }, [cardsLeft])
    

    return (
        <>
        
        <div id='content'>
            {(cardsLeft > 0) && <>
                {props.suggestions.map((suggestion, index) => {
                    return (<Card key={index} suggestion={suggestion} setAccepted={setAccepted} setCardsLeft={setCardsLeft}/>)
                })}
                </>
            }

            {cardsLeft <= 0 && <>
                <h1>These are the books that peaked your interest</h1>
                {accepted.map((suggestion, index) => {
                    return (
                        <div className='accepted' key={index}>
                            <h2>{suggestion.title}</h2>
                            <p>{suggestion.description}</p>
                        </div>)
                })}
            
            </>}
        </div>

        </>
    )

}

export default Result