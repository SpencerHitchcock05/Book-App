import { useState } from 'react'
import Param from './Param.jsx'



const ParamSlides = (props) => {

    const [index, setIndex] = useState(0);
    const [usePreferences, setUsePreferences] = useState(false);
    const [hideHelp, setHideHelp] = useState(true);
    const setPrompts = props.setPrompts
    const serverFetch = props.serverFetch

    const handleNext = () => {
        setIndex(prev => prev+1)
    }

    const firstParam = (
        <>
            <div className=''>
                <label className="param-text w-full flex justify-center">would you like recommendations based on your past preferences?</label>
                <div className="flex justify-center gap-12 m-12 ">
                    <button className='prompt-button flex-1 text-2xl text-center py-2 px-6 border-b-1 border-gray-400 rounded-md' value={true} onClick={() => {handleNext(); setUsePreferences(true)}}>Yes, use past preferences!</button>
                    <button className='prompt-button flex-1 text-2xl text-center py-2 px-6 border-b-1 border-gray-400 rounded-md' value={true} onClick={handleNext}>No, start me fresh!</button>
                </div>
                <div className='w-full flex flex-col items-center justify-center'>
                    <button onClick={() => setHideHelp(!hideHelp)} className='prompt-button text-2xl text-center py-2 px-6 border-b-1 border-gray-400 rounded-md'>?</button>
                    <p className={`${hideHelp? 'invisible' : ''} text-center pt-6 pb-2 px-6 border-b-1 border-gray-400 rounded-md`}>Using your past preferences will base new suggestions off books you have already added to your bookshelf</p>
                </div>
            </div>
        </>
    )

    const prompts = [
        <div className='param-text'>ready to begin?</div>,
        firstParam,
        <Param type={"genre"} question={"Which book genres do you like most?"} setPrompts={setPrompts}/>,
        <Param type={"book"} question={"What are some books you have enjoyed in the past?"} setPrompts={setPrompts}/>,
        <Param type={"author"} question={"Which authors have do you like to read?"} setPrompts={setPrompts}/>,
        <Param type={"author"} question={"Which authors have do you like to read?"} setPrompts={setPrompts}/>
    ]

 
        
    

    return (
        <>
            <div className='param-slides-container'>
                <div key={index}>
                    {prompts[index]}
                </div>
                {(() => { 
                        if (index == 1) {
                            return
                        } else if (index < prompts.length - 1) {
                            return <button className='prompt-button text-white text-2xl text-center py-2 px-6 border-b-1 border-gray-400 rounded-md' onClick={handleNext}>Next</button>
                        } else {
                            return <button className='prompt-button text-white text-2xl text-center py-2 px-6 border-b-1 border-gray-400 rounded-md' id='search-button' type='button' onClick={() => serverFetch(usePreferences)}>Search</button>
                        }
                    })()
                }
                
            </div>

        </>
    )
}

export default ParamSlides;