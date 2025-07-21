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
        if (response.status == 200) {
            setUser(response.data.user)
        }
        return response.status
    }

     const register = async (data) => {
        const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Register}`, data)
        if (response.status == 201) {
            setUser(response.data.user)
        }
        return response.status
    }

    return {
        login,
        register,
    }
}