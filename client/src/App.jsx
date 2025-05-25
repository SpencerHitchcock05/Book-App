import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home.jsx';
import Diviner from './diviner.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/diviner" element={<Diviner/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
