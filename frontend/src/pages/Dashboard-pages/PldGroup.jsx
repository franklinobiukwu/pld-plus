import GroupMembers from "../../components/Dashboard-components/GroupMembers"
import OtherGroups from "../../components/Dashboard-components/OtherGroups"
import { HiMiniRocketLaunch } from "react-icons/hi2"

const PldGroup = () => {
    return (
        <div>
            <p>Pld Group Page</p>
            {/* Host PLD */}
        <div className="flex">
            <div className="flex flex-col shadow-md rounded-md p-4 justify-center items-center bg-white2">
                <div 
                    className="flex rounded-md p-2 bg-green
                        h-10 w-10 items-center justify-center text-white">
                    <HiMiniRocketLaunch />
                </div>
                    <p className="mt-1 text-sm">Host PLD</p>
             </div>
        </div>


            {/* Groups */}
            <div className="md:flex gap-4 mt-10">
                <div className="flex-grow max-w-md">
                    <GroupMembers/>
                </div>

                <div className="mt-10 md:mt-0 max-w-md">
                    <OtherGroups/>
                </div>
            </div>
        </div>
    )
}

export default PldGroup
