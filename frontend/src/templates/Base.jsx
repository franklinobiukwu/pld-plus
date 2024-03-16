import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx";

const Base = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Base
