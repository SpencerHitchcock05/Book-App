import { createContext } from "react";

const UserContext = createContext({
    user,
    setUser,
})

const { Provider } = UserContext;

function UserProvider({children}) {
    const [user, setUser] = useState();

    return <Provider value={{ user, setUser }}>{children}</Provider>
}

export { UserProvider };