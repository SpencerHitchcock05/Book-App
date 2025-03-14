import { useState } from 'react'
import Param from './Param.jsx'



const ParamSlides = (props) => {

    const [index, setIndex] = useState(0);
    const setPrompts = props.setPrompts

    const prompts = [
        <Param key={index} type={"genre"} question={"Which book genres do you like the most?"} setPrompts={setPrompts}/>,
        <Param key={index} type={"book"} question={"What are some books you have enjoyed in the past?"} setPrompts={setPrompts}/>,
        <Param key={index} type={"author"} question={"Which authors have do you like to read?"} setPrompts={setPrompts}/>,
        <Param key={index} type={"author"} question={"Which authors have do you like to read?"} setPrompts={setPrompts} final={true}/>
    ]

    const handleNext = () => {
        console.log("bing")
        setIndex(prev => Math.min(prev+1, 3))
        console.log(index)
    }
        
    

    return (
        <>
            <div>
                {prompts[index]}
                <button className='prompt-button' onClick={handleNext}>Next</button>
            </div>

        </>
    )
}

export default ParamSlides;