import { useState, useRef } from 'react';
import Background from "./Background";
import Cursor from "./Cursor";
import Nav from "./Nav";
import ParamSlides from './ParamSlides.jsx';
import Result from './Result.jsx';
import LoadingIcon from './LoadingIcon.jsx'
import axios from 'axios';





function Diviner() {

     const [suggestions, setSuggestions] = useState();
        const [searching, setSearching] = useState(false);
        const [prompts, setPrompts] = useState({
          "genre" : [],
          "book" : []
        })
    
        async function serverFetch() {
    
          setSearching(true);
    
          const response = await axios.post("http://localhost:5000/books/getBooks", {text: prompts})

    
          const data = response.data
    
          
          setSearching(false)
          setSuggestions(data)
         
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