import ProfileImg from "../images/girl.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useLogout from "../hooks/useLogout"
import { IoLogInOutline, IoFingerPrintSharp, IoLogOutOutline } from "react-icons/io5";
import { HiPresentationChartBar } from "react-icons/hi";


const Navbar = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const location = useLocation()

    const {logout} = useLogout()

    const handleLogout = () => {
       logout() 
    }

    // Take user to home landing page
    const goHome = () => {
        navigate('/')
    }

    return (
        <div 
        className={`flex justify-between h-16 max-w-[90rem] mx-auto px-4
        items-center z-50 text-white  
            ${location.pathname == "/" ? "": "bg-pri"}`}
        >
            {/* Login Logo */}
            <div onClick={goHome} className="cursor-pointer">
                <h1 className="font-bold text-3xl">PLD<sup>+</sup></h1>
            </div>

            {/* Navigation Bar */}
            <div>
                <nav className="flex list-none gap-4">
                    <Link className="hover:text-blue ease-in-out duration-300"><li>Home</li></Link>
                    <Link className="hover:text-yellow ease-in-out duration-300"><li>About</li></Link>
                    <Link className="hover:text-green ease-in-out duration-300"><li>How it works</li></Link>
                </nav>
            </div>

            {/* Login Buttons*/}
            { !user ? (
                <div className="flex">
                    <Link to="/login" className="mr-6">
                        <button className="flex justify-center items-center">
                            <IoLogInOutline className="mr-1"/>
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="flex justify-center items-center">
                            <IoFingerPrintSharp className="mr-1"/>
                            Signup
                        </button>
                    </Link>
                </div>) : (
            
            // Profile Photo 
            <div className="flex items-center">
                    {location.pathname == "/" ? (
                        <Link to={"/dashboard"} className="flex justify-center items-center mr-10 group">
                            <HiPresentationChartBar className="mr-1 group-hover:text-blue ease-in-out duration-300"/>
                            Dashboard
                        </Link>
                        ) : ""
                    }
                <Link to="/dashboard/profile">
                    <div className="rounded-full max-w-12 max-h-12 overflow-hidden mr-10">
                        <img src={ProfileImg} alt="profile-photo"/>
                    </div>
                </Link>
                {/* Logout Buttons */}
                <button 
                    className="flex justify-center items-center group"
                    onClick={handleLogout}
                >
                    <IoLogOutOutline className="text-white group-hover:text-red text-2xl font-extrabold mr-1 ease-in-out duration-300"/>
                    Logout
                </button>
            </div>)
            }
        </div>
    )
}

export default Navbar
