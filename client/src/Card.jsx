



function Card(props) {


    const suggestion = props.suggestion

    return (
    <>
        <div className="card-container">
            <div onClick={} className="card">
                <h2>{suggestion.title}</h2>
                <h4>{suggestion.author}</h4>
                <p>{suggestion.description}</p>
            </div>
        </div>
    </>
    )
}

export default Card