import { useState, useRef } from 'react';
import ParamSlides from './ParamSlides.jsx';
import Result from './Result.jsx';
import LoadingIcon from './LoadingIcon.jsx'
import Background from './Background.jsx'
import UserBooks from './UserBooks.jsx'



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

            <Background/>

            {(!suggestions && !searching) && <>
            <div id="content">
                <ParamSlides setPrompts={setPrompts} serverFetch={serverFetch}/>
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