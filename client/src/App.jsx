import { useState } from 'react'
import './App.css'

function App() {

  const [suggestions, setSuggestions] = useState();

  async function serverFetch() {

    const resp = await fetch("http://localhost:5000/books")

    const data = resp.json()

    data.then(resp => {
      setSuggestions(JSON.stringify(resp))
    })

    

    
  }

  return (
    <>
      <button onClick={serverFetch}></button>
      <div>
        {suggestions}
      </div>
    </>
  )
}

export default App
