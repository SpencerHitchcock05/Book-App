import { useState } from 'react'
import Card from './Card.jsx'




function Result(props) {

    const [accepted, setAccepted] = useState([])
    

    return (
        <>
        
        <div id='content'>
            {JSON.stringify(accepted)}
            {props.suggestions.map((suggestion, index) => {
                return (<Card key={index} suggestion={suggestion} setAccepted={setAccepted}/>)
            })}
        </div>

        </>
    )

}

export default Result