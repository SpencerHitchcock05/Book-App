import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css';
import Home from './pages/Home.jsx';
import Diviner from './pages/Diviner.jsx';

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
