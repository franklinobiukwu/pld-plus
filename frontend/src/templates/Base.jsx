import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import useDispatchUser from "../hooks/useDispatchUser.jsx";

const Base = () => {
    const {user, dispatchUser} = useDispatchUser()

    // Dispatch user to state if in localStorage
    dispatchUser()

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
