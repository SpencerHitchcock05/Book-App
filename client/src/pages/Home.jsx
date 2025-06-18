import { Link } from "react-router-dom";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Background from "../components/Background";




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
                <Link to="/login" className="w-1/3 bg-light-color rounded-sm flex justify-center">
                    <div className="text-white text-5xl px-24 py-8">
                        login
                    </div>
                </Link>
            </div>
            <Cursor/>
        </>
    )
}

export default Home