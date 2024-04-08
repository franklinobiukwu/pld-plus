import { HiMiniRocketLaunch } from "react-icons/hi2"
import { RiMenuSearchLine } from "react-icons/ri"
import { FaCalendarAlt } from "react-icons/fa"
import { GiSpellBook, GiBookmarklet } from "react-icons/gi"
import { Link } from "react-router-dom"

const QuickActions = () => {
    return (
        <div>
            <div>
                <h3 className="text-xs font-medium border-b border-b-cream2">QUICK ACTIONS</h3>
                <div className="shadow-md rounded-md px-6 py-6 flex mt-2 justify-between bg-white2">
                    {/* Host PLD Component*/}
                    <Link to="/dashboard/my-groups">
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-green
                            h-10 w-10 items-center justify-center text-white">
                            <HiMiniRocketLaunch />
                        </div>
                        <p className="mt-1 text-sm">Host PLD</p>
                    </div>
                    </Link>
                    {/* Discover Groups Component*/}
                    <Link to="/dashboard/discover-groups">
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-yellow
                            h-10 w-10 items-center justify-center text-white">
                             <RiMenuSearchLine />
                        </div>
                        <p className="mt-1 text-sm">Discover Groups</p>
                    </div>
                    </Link>
                    {/* Schedule Component*/}
                    <Link to="/dashboard/schedule">
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-blue
                            h-10 w-10 items-center justify-center text-white">
                            <FaCalendarAlt />
                        </div>
                        <p className="mt-1 text-sm">Schedule</p>
                    </div>
                    </Link>
                    {/* Resources Component*/}
                    <Link to="/dashboard/resources">
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-grey
                            h-10 w-10 items-center justify-center text-white">
                            <GiBookmarklet />
                        </div>
                        <p className="mt-1 text-sm">Resources</p>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default QuickActions
