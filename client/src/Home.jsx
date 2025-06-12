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
                <Link to="/diviner" className="w-1/3 bg-light-color rounded-sm flex justify-center">
                    <div className="text-white text-5xl px-24 py-8">
                        diviner
                    </div>
                </Link>
            </div>
            <Cursor/>
        </>
    )
}

export default Home