import { useRef, useState } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Content from "./Content.jsx"

function App() {

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
      <Nav/>
      <Content/>
      <input ref={text} type="text" name="" id="" />
      <button onClick={serverFetch}></button>
      <div>
        {JSON.stringify(suggestions)}

        {/* {suggestions && suggestions.map((suggestion) => {
          return (
            <div key={suggestion.title}>
              {JSON.stringify(suggestion)}
            </div>  
          )
        })
        } */}
        
      </div>
    </>
  )
}

export default App
