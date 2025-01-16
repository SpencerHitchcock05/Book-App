import { useState } from 'react'
import './App.css'

function App() {

  async function serverFetch() {

    const resp = await fetch("http://localhost:5000/books")

    console.log(resp.json())
    
  }

  return (
    <>
      <button onClick={serverFetch}></button>
    </>
  )
}

export default App
