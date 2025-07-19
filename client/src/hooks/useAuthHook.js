import paths from "../paths";
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"



const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthHook = () => {
    const { setUser } = useContext(UserContext);
    

    const login = async (data) => {
        console.log("Logging in with", data);
        const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Login}`, data)
        console.log(response.data)
        setUser(response.data.user)
    }

     const register = async (data) => {
        const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Register}`, data)
        setUser(response.data.user)
    }

    return {
        login,
        register,
    }
}