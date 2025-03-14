import { useState, useRef } from 'react';
import ParamSlides from './ParamSlides.jsx';
import Result from './Result.jsx';
import LoadingIcon from './LoadingIcon.jsx'



function Content() {

    const [suggestions, setSuggestions] = useState();
    const [searching, setSearching] = useState(false);
    const [prompts, setPrompts] = useState({
      "genre" : [],
      "book" : []
    })

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



    return (
        <>
        
        <div id="content-container">

            {(!suggestions && !searching) && <>
            <div id="content">
                <ParamSlides setPrompts={setPrompts}/>
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