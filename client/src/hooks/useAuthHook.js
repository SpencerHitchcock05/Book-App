import paths from "../paths";
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"



const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthHook = () => {
    const { setUser } = useContext(UserContext);
    
    const login = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Login}`, data, { withCredentials: true });
            if (response.status == 200) {
                console.log("Login response:", response.data.user);
                setUser(response.data.user)
            }
            return response.status
        } catch (error) {
            console.error("Login error:", error);
            return error.status;
        }
    }

     const register = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Register}`, data, { withCredentials: true })
            if (response.status == 200 || response.status == 201) {
                console.log("Register response:", response.data);
                setUser(response.data.user)
            }
            console.log("Register response status:", response.status);
            return response.status
        } catch (error) {
            console.error("Login error:", error);
            return error.status;
        }
    }

    const checkAuth = async () => {
        try {
            console.log("Checking authentication...");
            const response = await axios.get(`${apiUrl}${paths.Users.Base}${paths.Users.CheckAuth}`, { withCredentials: true });
            console.log("CheckAuth response:", response.data);
            return response.data.user;
        } catch (error) {
            console.error("Login error:", error);
            return error.status;
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get(`${apiUrl}${paths.Users.Base}${paths.Users.Logout}`)
        }
    }

    return {
        login,
        register,
        checkAuth,
    }
}