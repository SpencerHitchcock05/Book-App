import { useEffect, useState } from 'react'
import Card from './Card.jsx'




function Result(props) {

    const [accepted, setAccepted] = useState([])
    const [cardsLeft, setCardsLeft] = useState(props.suggestions.length)



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
                <div className='results-accepted'>
                    <h1>These are the books that peaked your interest</h1>
                    {accepted.map((suggestion, index) => {
                        return (
                            <div className='accepted' style={{animationDelay: `${index / 2}s`}} key={index}>
                                <h1>{suggestion.title}</h1>
                                <div className='accepted-content'>
                                    <img src={suggestion.image} alt="" />
                                    <div className='accepted-text-container'>
                                        <h3 className='accepted-price'>{suggestion.price}</h3>
                                        <p className='accepted-text'>{suggestion.longDescription}</p>
                                        <a className='accepted-link' href={suggestion.url}>Link to purchase</a>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </>}
        </div>

        </>
    )

}

export default Result