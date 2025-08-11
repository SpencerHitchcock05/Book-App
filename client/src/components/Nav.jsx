import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";
import { useAuthHook } from "../hooks/useAuthHook.js";
import { useNavigate, useLocation } from "react-router-dom";





function Nav() {
    const { user } = useContext(UserContext);
    const { logout } = useAuthHook();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout()
        if (location.pathname == '/') {
            navigate(0)
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <nav id="nav-bar" className="">
                <div id="nav-logo"><Link to='/'>Book Search</Link></div>
                <div>{user && user.username}</div>
                {JSON.stringify(user)}
                {user && <button onClick={handleLogout}>Logout</button>}
            </nav>
        </>
    )
}



export default Nav