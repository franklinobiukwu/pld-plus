import { HiMiniRocketLaunch } from "react-icons/hi2"
import { RiMenuSearchLine } from "react-icons/ri"
import { FaCalendarAlt } from "react-icons/fa"
import { GiSpellBook, GiBookmarklet } from "react-icons/gi"

const QuickActions = () => {
    return (
        <div className="mt-5">
            <div>
                <h3 className="text-xs font-medium border-b border-b-cream2">QUICK ACTIONS</h3>
                <div className="shadow-md rounded-md px-6 py-6 flex mt-2 justify-between">
                    {/* Host PLD Component*/}
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-green
                            h-10 w-10 items-center justify-center text-white">
                            <HiMiniRocketLaunch />
                        </div>
                        <p className="mt-1 text-sm">Host PLD</p>
                    </div>
                    {/* Discover Groups Component*/}
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-yellow
                            h-10 w-10 items-center justify-center text-white">
                             <RiMenuSearchLine />
                        </div>
                        <p className="mt-1 text-sm">Discover Groups</p>
                    </div>
                    {/* Schedule Component*/}
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-blue
                            h-10 w-10 items-center justify-center text-white">
                            <FaCalendarAlt />
                        </div>
                        <p className="mt-1 text-sm">Schedule</p>
                    </div>
                    {/* Resources Component*/}
                    <div className="flex flex-col justify-center items-center">
                        <div 
                            className="flex rounded-md p-2 bg-grey
                            h-10 w-10 items-center justify-center text-white">
                            <GiBookmarklet />
                        </div>
                        <p className="mt-1 text-sm">Resources</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickActions
