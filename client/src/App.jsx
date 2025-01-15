import { useState } from 'react'
import './App.css'

function App() {

  async function serverFetch() {

    fetch("https://localhost:5000/books")
    .then(resp => resp.text)
    .then(data => {console.log(data)})

    
  }

  return (
    <>
      <button onClick={serverFetch}></button>
    </>
  )
}

export default App
