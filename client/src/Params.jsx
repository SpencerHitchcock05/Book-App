import { useEffect, useRef, useState } from "react"





function Params(props) {

    const [genres, setGenres] = useState(["test"]);
    const [books, setBooks] = useState([]);
    const genreRef = useRef()
    const booksRef = useRef()

    

    const addGenre = (e) => {

        e.preventDefault()

        console.log("button")
        console.log(genres)
        setGenres(prev => {return [...prev, genreRef.current.value]})
        
        //genreRef.current.value = ""
    }

    useEffect(() => {
        genreRef.current.value = ""
    }, [genres])


    const setSuggestions = props.handleSearch;


    return (
        <>
        
        <div id="params">
            <div>
                <div className="user-prompts">
                    {genres.map((genre, index) => {
                        return (
                            <div className="user-prompt" key={index}>{genre}</div>
                        )
                    })}
                </div>
                <form onSubmit={addGenre} className="param-form" method="post">
                    <label htmlFor="genre">which book genres you would like to see?:<br/></label>
                    <div>
                        <input ref={genreRef} type="text" name="genre" className="param-input" />
                        <button className="prompt-button">Add Genre</button>
                    </div>
                </form>
            </div>
            <form className="param-form" action="/" method="post">
                <label htmlFor="books">list books in a style you would like to read more of?:</label>
                <div >
                    <input ref={booksRef} type="text" name="books" className="param-input" />
                    <button  className="prompt-button">Add Book</button>
                </div>
            </form>
        
        </div>
        
        </>
    )
}

export default Params