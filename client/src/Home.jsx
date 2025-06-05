import { Link } from "react-router-dom";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Background from "./Background";




function Home() {


    return (
        <>
            <Nav/>
            <Background/>
            <div className="home-container flex justify-center items-center">
                <Link to="/diviner">diviner</Link>
            </div>
            <Cursor/>
        </>
    )
}

export default Home