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
    const genStyle = `fixed md:static h-full ease-in-out duration-500
                        md:col-span-2 lg:col-span-2`


    return (
        <div className="h-screen flex flex-col">
            <div className="fixed left-0 right-0 bg-white">
                <Navbar/>
            </div>

            <div className="max-w-[90rem] md:w-full mx-auto md:grid md:grid-cols-8 lg:grid-cols-12 mt-20 flex-grow">
                {/* Dashboard SideNav */}
                <aside className={isOpen ? `${genStyle} ${show}` : `${genStyle} ${hide}`}>
                    <SideNav />
                </aside>
                {/* Dashboard Content */}
                <div className="bg-gray-100 p-4 md:col-span-6 lg:col-span-8">
                    <Outlet/>
                </div>
                {/* Dashboard Aside */}
        {/*<aside className="relative md:hidden lg:block lg:col-span-2">*/}
                <aside className="hidden md:relative h-full lg:block col-span-2">
                    <Aside/>
                </aside>
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
