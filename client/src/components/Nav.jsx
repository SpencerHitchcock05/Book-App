import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"
import { useAuthHook } from "../hooks/useAuthHook.js";





function Nav() {
    const { user } = useContext(UserContext);
    const { logout } = useAuthHook();

    return (
        <>
            <nav id="nav-bar" className="">
                <div id="nav-logo"><Link to='/'>Book Search</Link></div>
                <div>{user && user.username}</div>
                <button onClick={logout}>Logout</button>
            </nav>
        </>
    )
}



export default Nav