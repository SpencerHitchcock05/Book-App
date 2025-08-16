import { Link } from "react-router-dom";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Background from "../components/Background";
import UserBooks from "../components/UserBooks";




function Home() {


    return (
        <>
            <Nav/>
            <Background/>
            <div className="home-container flex flex-col justify-around items-center gap-12 mt-12">
                <Link to="/diviner" className="w-1/3 border border-gray-300 flex justify-center">
                    <div className="text-white text-3xl py-6">
                        diviner
                    </div>
                </Link>
                <UserBooks/>
            </div>
            <Cursor/>
        </>
    )
}

export default Home