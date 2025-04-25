import { useRef, useState } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Content from "./Content.jsx"
import Cursor from "./Cursor.jsx"

function App() {

  return (
    <>
      <Cursor/>
      <Nav/>
      <Content/>
    </>
  )
}

export default App
