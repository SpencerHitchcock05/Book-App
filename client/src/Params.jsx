




function Params(props) {

    const setSuggestions = props.handleSearch

    console.log(setSuggestions)

    return (
        <>
        
        <div id="params">
            <form className="param-form" action="/" method="post">
                <label htmlFor="genre">which book genres you would like to see?:<br/></label>
                <div>
                    <input type="text" name="genre" className="param-input" />
                    <button className="prompt-button">Add Genre</button>
                </div>
            </form>
            <form className="param-form" action="/" method="post">
                <label htmlFor="books">list books in a style you would like to read more of?:</label>
                <div >
                    <input type="text" name="books" className="param-input" />
                    <button className="prompt-button">Add Book</button>
                </div>
            </form>
        
        </div>
        
        </>
    )
}

export default Params