import { Outlet } from "react-router-dom"
import SideNav from "../components/Dashboard-components/SideNav"
import { useState } from "react"
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import Navbar from "../components/Navbar"
import Aside from "../components/Dashboard-components/Aside"

const DashboardBase = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const show = 'left-0'
    const hide = `left-[-100%]`
    const genStyle = `fixed md:static h-full ease-in-out duration-500 md:col-span-2 lg:col-span-1`


    return (
        <div className="h-screen flex flex-col">
            <div>
                <Navbar/>
            </div>

            <div className="max-w-6xl mx-auto md:grid md:grid-cols-8 lg:grid-cols-6">
                {/* Dashboard SideNav */}
                <aside className={isOpen ? `${genStyle} ${show}` : `${genStyle} ${hide}`}>
                    <SideNav/>
                </aside>
                {/* Dashboard Content */}
                <div className="bg-gray-100 p-4 md:col-span-6 lg:col-span-4">
                    <Outlet/>
                </div>
                {/* Dashboard Aside */}
                <div className="md:hidden lg:block lg:col-span-1">
                    <Aside/>
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
