




function Params(props) {

    const setSuggestions = props.handleSearch

    console.log(setSuggestions)

    return (
        <>
        
        <div id="params">
            <form className="param-form" action="/" method="post">
                <label htmlFor="genre">Select which book genres you would like to see?:<br/></label>
                <input type="text" name="genre" className="param-input" />
            </form>
            <form className="param-form" action="/" method="post">
                <label htmlFor="books">What are some books in a style you would like to read more of?:</label>
                <input type="text" name="books" className="param-input" />
            </form>
        
        </div>
        
        </>
    )
}

export default Params