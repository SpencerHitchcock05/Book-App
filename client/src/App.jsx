import { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Home.jsx';
import Nav from './Nav';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/nav" element={<Nav/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
