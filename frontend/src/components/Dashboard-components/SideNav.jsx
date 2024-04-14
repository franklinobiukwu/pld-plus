import { NavLink } from "react-router-dom"
import { FaUsers, FaUserFriends, FaUserCircle, FaCalendarAlt } from "react-icons/fa"
import { GiBookmarklet } from "react-icons/gi";
import { RiMenuSearchLine } from "react-icons/ri";
import {HiPresentationChartBar} from "react-icons/hi"
import { useState } from "react";

const SideNav = () => {
    const [drop, setDrop] = useState(false)

    const handleDrop = () => {
        setDrop(!drop)
    }

    const liStyle = `flex items-center py-1 px-4 text-nowrap`
    const riStyle = `mr-2 text-pri`
    const trans = `ease-in-out duration-500`

    return(
       <div className="h-full bg-gradient-to-b from-cream2 via-white to-white2 text-pri  w-full z-50 border-r-cream2 border-r">
            <nav className="bg-teal-500 h-full pt-10">
                <ul>
                    <li>
                        <NavLink exact to={`/dashboard`} className={liStyle}>
                            <HiPresentationChartBar className={riStyle}/>Dashboard
                        </NavLink>
                    </li>
                    <li onClick={handleDrop}>
                        <span className={`${liStyle} hover:cursor-pointer`}><FaUsers className={riStyle}/>PLD Groups</span>
                        <div className={drop ? `h-auto ${trans}`:`h-0 overflow-hidden ${trans}`} >
                            <div>
                                <NavLink to={`/dashboard/my-groups`} className={liStyle}>
                                    <FaUserFriends className={`${riStyle} ml-4`}/>My Groups
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to={`/dashboard/discover-groups`} className={liStyle}>
                                    <RiMenuSearchLine className={`${riStyle} ml-4`}/>Discover Groups
                                </NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to={`/dashboard/schedule`} className={liStyle}>
                            <FaCalendarAlt className={riStyle}/>Schedule
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/dashboard/resources`} className={liStyle}>
                            <GiBookmarklet className={riStyle} />Resources
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/dashboard/profile`} className={liStyle}>
                            <FaUserCircle className={riStyle}/>Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideNav
