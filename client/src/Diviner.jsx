import { useState, useRef } from 'react';
import Background from "./Background";
import Cursor from "./Cursor";
import Nav from "./Nav";
import ParamSlides from './ParamSlides.jsx';
import Result from './Result.jsx';
import LoadingIcon from './LoadingIcon.jsx'
import UserBooks from './UserBooks.jsx'





function Diviner() {

     const [suggestions, setSuggestions] = useState();
        const [searching, setSearching] = useState(false);
        const [prompts, setPrompts] = useState({
          "genre" : [],
          "book" : []
        })
    
        async function serverFetch() {
    
          setSearching(true);
    
          const resp = await fetch("http://localhost:5000/books/getBooks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({text: prompts})
          })

          console.log(resp)
    
          const data = resp.json()
    
          data.then(resp => {
            setSearching(false)
            setSuggestions(resp)
          })
        }
    

    return (
        <>
            <Nav/>
            <Background/>
            <div id="content-container">

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
            <Cursor/>
        </>
    )
}

export default Diviner