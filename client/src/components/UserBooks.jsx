import { useContext, useEffect, useState } from "react"
import { useBooksHook } from "../hooks/useBooksHook";
import { UserContext } from "../context/userContext";
import UserBook from "./UserBook";

const UserBooks = () => {
    const [userBooks, setUserBooks] = useState();
    const { getUserBooks } = useBooksHook();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchBooks = async (userId) => {
            const books = await getUserBooks(userId);
            setUserBooks(books);
        }


        if (user) {
            fetchBooks(user.id)
        }
    }, [user])

    return (
        <>
            <div id="user-books-container" className="text-white">
                {userBooks && <>
                    <h3>Your Books:</h3>
                        {userBooks.map((book) => {
                            return <UserBook book={book}/>
                        })}
                    <div>
                    </div>
                
                </>}
            </div>
        </>
    )
}

export default UserBooks