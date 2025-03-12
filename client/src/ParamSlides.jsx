import Param from './Param.jsx'



const ParamSlides = (props) => {

    const setPrompts = props.setPrompts

    const prompts = [
        {
            type: "genre",
            question: "Which book genres do you like the most?"
        },
        {
            type: "book",
            question: "What are some books you have enjoyed in the past?"
        },
        {
            type: "author",
            question: "Which authors have do you like to read?"
        },
        {
            type: "experience",
            question: "What kind of experience do you want out of a book?"
        },
    ]
        
    

    return (
        <>
            {prompts.map((prompt, index) => {
                return (
                    <div key={index}>
                        <Param key={index} type={prompt.type} question={prompt.question} setPrompts={setPrompts}/>
                    </div>
                )
            })}
        </>
    )
}

export default ParamSlides;