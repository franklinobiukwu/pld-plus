import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx";

const Base = () => {
    return (
        <div>
            <div className="flex flex-col h-screen">
            {/* Header */}
            <div>
                <Navbar/>
            </div>
            {/* Body */}
            <div className="grow">
                <Outlet/>
            </div>
            </div>
        </div>
    )
}

export default Base
