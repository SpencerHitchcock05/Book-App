import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/userContext.jsx"





function Nav() {
    const { user } = useContext(UserContext);

    return (
        <>
            <nav id="nav-bar" className="">
                <div id="nav-logo"><Link to='/'>Book Search</Link></div>
                <div>{JSON.stringify(user)}</div>
            </nav>
        </>
    )
}



export default Nav