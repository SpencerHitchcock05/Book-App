import { RouterProvider } from 'react-router-dom'
import './css/App.css';
import { UserProvider } from './context/userContext.jsx';
import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx';
import Diviner from './pages/Diviner.jsx';
import Login from './pages/Login.jsx';
import { useAuthHook } from "./hooks/useAuthHook.js";

function App() {

  const { checkAuth } = useAuthHook();

  return (
    <UserProvider>
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <Home />,
          loader: checkAuth, 
        },
        {
          path: "/diviner",
          element: <Diviner />,
          loader: checkAuth, 
        },
        {
          path: "/login",
          element: <Login />,
        },
      ])} 
      />
    </UserProvider>
  )
}

export default App
