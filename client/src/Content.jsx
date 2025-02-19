import { useState, useRef } from 'react';
import Params from './Params.jsx';
import Result from './Result.jsx';
import LoadingIcon from './LoadingIcon.jsx'



function Content() {

    const [suggestions, setSuggestions] = useState();
    const [searching, setSearching] = useState(false);
    const [prompts, setPrompts] = useState({
      "genre" : [],
      "book" : []
    })
    const text = useRef();

    async function serverFetch() {

      setSearching(true);

      const resp = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({text: prompts})
      })

      const data = resp.json()

      data.then(resp => {
        setSearching(false)
        setSuggestions(resp)
      })
    }

    async function fetchBookInfo(books) {
      console.log(books)
      const resp = await fetch("http://localhost:5000/booksInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({books: books})
      })
    }


    return (
        <>
        
        <div id="content-container">

            {(!suggestions && !searching) && <>
            <div id="content">
                <Params type={"genre"} question={"which book genres you would like to see?:"} setPrompts={setPrompts}/>
                <Params type={"book"} question={"which books have you enjoyed in the past?:"} setPrompts={setPrompts}/>
            </div>
            <div>
              <button className='prompt-button' id='search-button' type='button' onClick={serverFetch}>Search</button>
            </div>
            </>}

            {searching && <LoadingIcon/>}

            {suggestions && <>
              <Result suggestions={suggestions} />
            </>}
            
        </div>

        </>
    )
}

export default Content