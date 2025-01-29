import Card from './Card.jsx'




function Result(props) {



    return (
        <>
        
        <div id='content'>
            {props.suggestions.map((suggestion, index) => {
                return (<Card key={index} suggestion={suggestion}/>)
            })}
        </div>

        </>
    )

}

export default Result