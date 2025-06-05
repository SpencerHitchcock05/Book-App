import { Link } from "react-router-dom";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Background from "./Background";




function Home() {


    return (
        <>
            <Nav/>
            <Background/>
            <Link to="/diviner">diviner</Link>
            <Cursor/>
        </>
    )
}

export default Home