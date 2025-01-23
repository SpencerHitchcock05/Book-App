import { useEffect, useRef, useState } from "react"





function Params(props) {

    const [types, setTypes] = useState([]);
    const genreRef = useRef()

    const type = props.type
    

    const addType = (e) => {
        e.preventDefault()

        setTypes(prev => {return [...prev, genreRef.current.value]}) 
        props.setPrompts(prev => {
            const next = {...prev};

            next[type] = types
            return next
        }) 
    }

    useEffect(() => {
        genreRef.current.value = ""
    }, [types])


    const setSuggestions = props.handleSearch;


    return (
        <>
        
        <div id="params">
            <div className="user-input">
                <div className="user-prompts">
                    {types.map((type, index) => {
                        return (
                            <div className="user-prompt" key={index}>{type}</div>
                        )
                    })}
                </div>
                <form onSubmit={addType} className="param-form" method="post">
                    <label htmlFor="genre">{props.question}<br/></label>
                    <div>
                        <input ref={genreRef} type="text" name="genre" className="param-input" />
                        <button className="prompt-button">Add {props.type}</button>
                    </div>
                </form>
            </div>
        
        </div>
        
        </>
    )
}

export default Params