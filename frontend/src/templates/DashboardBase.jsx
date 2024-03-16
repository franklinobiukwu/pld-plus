import { Outlet } from "react-router-dom"
import SideNav from "../components/Dashboard-components/SideNav"
import { useState } from "react"
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import Navbar from "../components/Navbar"

const DashboardBase = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const show = 'left-0'
    const hide = `left-[-100%]`
    const genStyle = `fixed md:static h-full ease-in-out duration-500`


    return (
        <div className="h-screen flex flex-col">
            <div>
                <Navbar/>
            </div>

            <div className="flex flex-1">
                <aside className={isOpen ? `${genStyle} ${show}` : `${genStyle} ${hide}`}>
                    <SideNav/>
                </aside>
                <div className="flex-grow bg-gray-100 p-4">
                    <Outlet/>
                </div>
            </div>

            {/* Hamburger Button (for smaller screens)*/}
            <button
                className="fixed top-4 left-4 md:hidden focus:outline-none"
                onClick={toggleSidebar}
            >
                {isOpen ? (
                    <AiOutlineClose size={20}/>
                ) : (
                    <AiOutlineMenu size={20}/>
                )}
            </button>
        </div>
    )
}

export default DashboardBase
