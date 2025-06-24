import { useState, useRef } from 'react';
import Background from "../components/Background.jsx";
import Cursor from "../components/Cursor.jsx";
import Nav from "../components/Nav.jsx";
import ParamSlides from '../components/ParamSlides.jsx';
import Result from '../components/Result.jsx';
import LoadingIcon from '../components/LoadingIcon.jsx'
import axios from 'axios';
import paths from '../paths.js';


const apiUrl = import.meta.env.VITE_API_URL;

function Diviner() {

     const [suggestions, setSuggestions] = useState();
        const [searching, setSearching] = useState(false);
        const [prompts, setPrompts] = useState({
          "genre" : [],
          "book" : []
        })
    
        async function serverFetch() {
          setSearching(true);
          const response = await axios.post(`${apiUrl}${paths.Books.Base}${paths.Books.GetBooks}`, {text: prompts})
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