import { useState, useRef } from 'react';
import Params from './Params.jsx'



function Content() {

    const [suggestions, setSuggestions] = useState();
    const text = useRef();

    async function serverFetch() {

    const resp = await fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({text: text.current.value})
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
            <div id="content">
                <Params handleSearch={setSuggestions}/>
            </div>

        </div>

        </>
    )
}

export default Content