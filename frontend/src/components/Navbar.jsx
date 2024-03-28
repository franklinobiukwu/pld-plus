import { FaPowerOff } from "react-icons/fa"
import ProfileImg from "../images/girl.png"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import useLogout from "../hooks/useLogout"

const Navbar = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    const {logout} = useLogout()

    const handleLogout = () => {
       logout() 
    }

    // Take user to home landing page
    const goHome = () => {
        navigate('/')
    }

    return (
        <div className="flex justify-between h-16 max-w-[90rem] mx-auto px-4 items-center shadow-sm z-50">
            <div onClick={goHome} className="cursor-pointer">
                <h1 className="font-bold text-3xl">PLD<sup>+</sup></h1>
            </div>

            {/* Login Buttons*/}
            { !user ? (
                <div className="flex">
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/signup"><button>Sign up</button></Link>
                </div>) : (
            
            // Profile Photo 
            <div className="flex items-center">
                <Link to={"/dashboard"}>Dashboard</Link>
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
                    onClick={handleLogout}
                >
                    <FaPowerOff className="text-red group-hover:text-white2"/>
                </button>
            </div>)
            }
        </div>
    )
}

export default Navbar
