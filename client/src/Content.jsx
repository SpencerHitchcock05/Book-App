import { useState, useRef } from 'react';
import Params from './Params.jsx'
import Result from './Result.jsx';



function Content() {

    const [suggestions, setSuggestions] = useState();
    const [prompts, setPrompts] = useState({
      "genre" : [],
      "book" : []
    })
    const text = useRef();

    async function serverFetch() {

    const resp = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({text: prompts})
    })

    const data = resp.json()

    data.then(resp => {
      setSuggestions(resp)
      console.log(resp)
    })

    

    
  }


    return (
        <>
        
        <div id="content-container">

            {!suggestions && <>
            <div id="content">
                <Params type={"genre"} question={"which book genres you would like to see?:"} setPrompts={setPrompts}/>
                <Params type={"book"} question={"which books have you enjoyed in the past?:"} setPrompts={setPrompts}/>

            </div>
            <div>
              <button className='prompt-button' id='search-button' type='button' onClick={serverFetch}>Search</button>
            </div>
            </>}

            {suggestions && <>
              <Result suggestions={suggestions} />
            </>}
            
        </div>

        </>
    )
}

export default Content