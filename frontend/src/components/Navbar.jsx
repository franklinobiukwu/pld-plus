import { FaPowerOff } from "react-icons/fa"
import ProfileImg from "../images/girl.png"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between h-16 max-w-[90rem] mx-auto px-4 items-center shadow-sm z-50">
            <div className="">
                <h1 className="font-bold text-3xl">PLD<sup>+</sup></h1>
            </div>

            {/* Login Buttons*/}
            <div className="flex">
                <button>Login</button>
                <button>Sign up</button>
            </div>
            {/* Profile Photo */}
            <div className="flex items-center">
                <Link to="/dashboard/profile">
                    <div className="rounded-full max-w-12 max-h-12 overflow-hidden mr-10">
                        <img src={ProfileImg} alt="profile-photo"/>
                    </div>
                </Link>
                {/* Logout Buttons */}
                <button 
                    className="group flex bg-white2 w-8 h-8 md:w-10 md:h-10 rounded-full text-white2 
                        justify-center items-center shadow-md hover:bg-red
                        hover:text-white2"
                >
                    <FaPowerOff className="text-red group-hover:text-white2"/>
                </button>
            </div>
        </div>
    )
}

export default Navbar
