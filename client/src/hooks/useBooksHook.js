import axios from "axios";
import paths from "../paths";



const apiUrl = import.meta.env.VITE_API_URL;

export const useBooksHook = () => {

    const addUserBooks = async (userId, books) => {
        try {
            await axios.post(`${apiUrl}${paths.Books.Base}${paths.Books.AddUserBooks}`, {userId, books}, {withCredentials: true}) 
        } catch (error) {
            console.error("failed to update users books")
        }
    }

    const getUserBooks = async (userId) => {
        try {
            const books = await axios.get(`${apiUrl}${paths.Books.Base}${paths.Books.GetUserBooks}?userId=${userId}`, {withCredentials: true})
            return books.data;
        } catch (error) {
            console.error("failed to get users books")
        }
    }

    return {
        addUserBooks,
        getUserBooks
    }
}