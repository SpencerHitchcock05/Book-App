import { useState } from 'react'
import './App.css'

function App() {

  const [suggestions, setSuggestions] = useState();

  async function serverFetch() {

    const resp = await fetch("http://localhost:5000/books?text=fantasy")

    const data = resp.json()

    data.then(resp => {
      setSuggestions(resp)
      console.log(resp)
    })

    

    
  }

  return (
    <>
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
