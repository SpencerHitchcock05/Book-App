import { Link } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { useContext } from "react"





function Nav() {
    const { user } = useContext(UserContext);

    return (
        <>
            <nav id="nav-bar">
                <div id="nav-logo"><Link to='/'>Book Search</Link></div>
                <div>{user && user.username}</div>
            </nav>
        </>
    )
}



export default Nav