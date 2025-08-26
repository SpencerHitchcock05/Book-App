import Chevron from "../assets/down-chevron.svg";
import fiveStar from "../assets/fivestar.png"
import { useState } from "react"


const UserBook = (props) => {
    const [open, setOpen] = useState();
    const book = props.book

    return <>
        <div className="flex flex-col p-3 border-b-1 border-b-white rounded-md" onClick={() => setOpen(!open)}>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="">{book.title}</p>
                    <p className="text-xs text-gray-400">{book.author}</p>
                </div>     
                <button className={`w-5 ${open ? "scale-y-[-1]" : ""}`}><img src={Chevron} alt="" /></button>
            </div>
            { open &&
            <div className="flex m-5 flex-col sm:flex-row">
                <img src={book.image} alt="" />
                <p className="m-5">{book.description}
                    <div className="rating-container my-10">
                        <div className="five-star-container">  
                            <img className="five-star" src={fiveStar} alt="five star rating" />
                            <div className="five-star-blocker" style={{width: `${(1 - book.rating / 5) * 100}%`}}></div> 
                        </div>
                        <h4>{book.rating}</h4>
                    </div>
                </p>
                
            </div>
            }   
        </div>
    </> 
}

export default UserBook