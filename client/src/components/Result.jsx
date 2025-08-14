import { useContext, useEffect, useState } from 'react'
import Card from './Card.jsx'
import fiveStar from "../assets/fivestar.png"
import { useBooksHook } from '../hooks/useBooksHook.js'
import { UserContext } from '../context/userContext.jsx'




function Result(props) {

    const [accepted, setAccepted] = useState([])
    const [cardsLeft, setCardsLeft] = useState(props.suggestions.length)
    const { user } = useContext(UserContext)
    const { addUserBooks } = useBooksHook()

    const send = () => {
        console.log('sending')
        if (cardsLeft === 0 && user) {
            console.log('send')
            addUserBooks(user.id, accepted);
        }
    }

    useEffect(() => {
        if (cardsLeft === 0 && user) {
            addUserBooks(user.id, accepted);
        }
    }, [cardsLeft])

    return (
        <>

        <button className='text-white' onClick={send}> BTTTON</button>
        
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
                                    <img src={suggestion.image} alt="" style={{flexShrink: 0}} />
                                    <div className='accepted-text-container'>
                                        <h3 className='accepted-price'>{suggestion.price}</h3>
                                        <div className="rating-container">
                                            <div className="five-star-container">  
                                                <img className="five-star" src={fiveStar} alt="five star rating" />
                                                <div className="five-star-blocker" style={{width: `${(1 - suggestion.rating / 5) * 100}%`}}></div> 
                                            </div>
                                            <h4>{suggestion.rating}</h4>
                                        </div>
                                        <p className='accepted-text'>{suggestion.longDescription}</p>
                                        <a className='accepted-link' href={suggestion.url} target='_blank'>Link to purchase</a>
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