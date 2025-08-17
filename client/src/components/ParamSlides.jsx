import { useState } from 'react'
import Param from './Param.jsx'



const ParamSlides = (props) => {

    const [index, setIndex] = useState(0);
    const setPrompts = props.setPrompts
    const serverFetch = props.serverFetch

    const prompts = [
        <div className='param-text'>ready to begin?</div>,
        <Param type={"genre"} question={"Which book genres do you like most?"} setPrompts={setPrompts}/>,
        <Param type={"book"} question={"What are some books you have enjoyed in the past?"} setPrompts={setPrompts}/>,
        <Param type={"author"} question={"Which authors have do you like to read?"} setPrompts={setPrompts}/>,
        <Param type={"author"} question={"Which authors have do you like to read?"} setPrompts={setPrompts} final={true}/>
    ]

    const handleNext = () => {
        console.log("bing")
        setIndex(prev => Math.min(prev+1, 3))
        console.log(index)
    }
        
    

    return (
        <>
            <div className='param-slides-container'>
                <div key={index}>
                    {prompts[index]}
                </div>
                {index < 3? <button className='prompt-button text-white text-2xl text-center py-2 px-6 border-b-1 border-gray-400' onClick={handleNext}>Next</button> : <button className='prompt-button' id='search-button' type='button' onClick={serverFetch}>Search</button>}
                
            </div>

        </>
    )
}

export default ParamSlides;