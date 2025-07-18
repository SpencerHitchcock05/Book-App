import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css';
import Home from './pages/Home.jsx';
import Diviner from './pages/Diviner.jsx';
import Login from './pages/Login.jsx';
import { UserProvider } from './context/userContext.jsx';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/diviner" element={<Diviner/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
