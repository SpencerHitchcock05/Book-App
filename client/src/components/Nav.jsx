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

    const handleLogout = async () => {
        await logout()
        if (location.pathname == '/') {
            navigate(0)
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <nav id="nav-bar" className="flex justify-between">
                <div className="nav-logo-container">
                    <div id="nav-logo"><Link to='/'>Book Search</Link></div>
                </div>
                <div className="nav-content">
                    <div>{user && user.username}</div>
                    {user && <button onClick={handleLogout}>Logout</button>}
                </div>
            </nav>
        </>
    )
}



export default Nav