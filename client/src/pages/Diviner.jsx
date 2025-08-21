import { useState, useRef, useContext } from 'react';
import Background from "../components/Background.jsx";
import Cursor from "../components/Cursor.jsx";
import Nav from "../components/Nav.jsx";
import ParamSlides from '../components/ParamSlides.jsx';
import Result from '../components/Result.jsx';
import LoadingIcon from '../components/LoadingIcon.jsx'
import { useBooksHook } from '../hooks/useBooksHook.js';
import { UserContext } from '../context/userContext.jsx';

function Diviner() {

    const { user } = useContext(UserContext);
    const { getBooks } = useBooksHook();
    const [suggestions, setSuggestions] = useState();
    const [searching, setSearching] = useState(false);
    const [prompts, setPrompts] = useState({
      "genre" : [],
      "book" : []
    })

    async function serverFetch(usePreferences) {
        setSearching(true);
        let books;
        if (usePreferences && user) {
            books = await getBooks(prompts, user.id)
        } else {
            books = await getBooks(prompts)
        }
        setSearching(false)
        setSuggestions(books)
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