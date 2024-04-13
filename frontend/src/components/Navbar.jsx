import { Link, useLocation, useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { IoLogInOutline, IoFingerPrintSharp, IoLogOutOutline } from "react-icons/io5";
import { HiPresentationChartBar } from "react-icons/hi";
import ScrollIntoView from 'react-scroll-into-view'
import useDispatchUser from "../hooks/useDispatchUser.jsx";
import { DNA } from "react-loader-spinner";
import useDispatchProfileImage from "../hooks/useDispatchProfileImage.jsx";
import { TbSmartHome } from "react-icons/tb";
import { GrTechnology } from "react-icons/gr";
import { RiCompassDiscoverLine } from "react-icons/ri";

const Navbar = () => {
    const {user} = useDispatchUser()
    const navigate = useNavigate()
    const location = useLocation()
    const {logout} = useLogout()
    const profileImage = useDispatchProfileImage()

    // Logs User Out
    const handleLogout = () => {
       logout() 
    }

    // Take user to home landing page
    const goHome = () => {
        navigate('/')
    }
    
    const navStyle = "flex justify-center items-center group"

    return (
        <div 
        className={`flex justify-between h-16 mx-auto px-4
        items-center z-50 text-white  
            ${location.pathname === "/" ? "": "bg-pri"}`}
        >
            {/* Login Logo */}
            <div onClick={goHome} className="cursor-pointer mr-5 md:mr-0 ml-8 md:ml-0">
                <h1 className="font-bold text-3xl">PLD<sup>+</sup></h1>
            </div>

            {/* Navigation Bar */}
            {location.pathname === '/' && (
            <div className="hidden md:block">
                <nav className="flex list-none gap-4">
                   <ScrollIntoView selector="#home" smooth={true}> 
                        <Link to="/" className={`group ${navStyle}`}>
                            <TbSmartHome className="mr-2 group-hover:text-blue ease-in-out duration-300"/>
                            <li>Home</li>
                        </Link>
                    </ScrollIntoView>
                    
                    <ScrollIntoView selector="#about" smooth={true}>
                        <Link to="/" className={` ease-in-out duration-300 ${navStyle}`} >
                            <RiCompassDiscoverLine className="mr-2 group-hover:text-blue ease-in-out duration-300"/>
                            <li>About</li>
                        </Link>
                    </ScrollIntoView>

                    <ScrollIntoView selector="#features" smooth={true}>
                        <Link to="/" className={`ease-in-out duration-300 ${navStyle}`}>
                            <GrTechnology className="mr-2 group-hover:text-blue ease-in-out duration-300"/>
                            <li>Features</li>
                        </Link>
                    </ScrollIntoView>
                </nav>
            </div>)
            }

            {/* Login Buttons*/}
            { !user ? (
                <div className="flex">
                    <Link to="/login" className="mr-6 group">
                        <button className="flex justify-center items-center">
                            <IoLogInOutline className="mr-2 group-hover:text-green ease-in-out duration-300"/>
                            Login
                        </button>
                    </Link>
                    <Link to="/signup" className="group ease-in-out duration-300">
                        <button className="flex justify-center items-center">
                            <IoFingerPrintSharp className="mr-2 group-hover:text-green ease-in-out duration-300"/>
                            Signup
                        </button>
                    </Link>
                </div>
            ) : (
            
            // Profile Photo 
            <div className="flex items-center">
                    {location.pathname === "/" && (
                        <Link to={"/dashboard"} className="flex justify-center items-center mr-10 group">
                            <HiPresentationChartBar className="mr-1 group-hover:text-blue ease-in-out duration-300"/>
                            Dashboard
                        </Link>)
                    }
                <Link to="/dashboard/profile">
                    <div className="rounded-full w-12 h-12 overflow-hidden mr-10">
                        {!profileImage ? (
                            <DNA 
                                visible={true}
                                height={"25"}
                                width={25}
                                ariaLabel="profile-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                        ) : ( 
                            <img src={profileImage} alt="profile-photo" className="object-cover h-full w-full"/>
                        )}
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
