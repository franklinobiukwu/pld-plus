import { RiLightbulbFlashLine } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"

const GroupCard = (props) => {

    const groupMembers = parseInt(props.members)
    let labelColor

    if (groupMembers <= 5){
       labelColor = "bg-green" 
    } else if (groupMembers > 5 && groupMembers <= 9) {
       labelColor = "bg-yellow" 
    } else {
        labelColor = "bg-red mt-2"
    }

    return (
        <div className="shadow-md rounded-md px-4 py-4 mt-2 border-t border-cream2">
            <div className="flex items-center">
                <FaUsers className="mr-2"/>
                <span className="font-medium text-md">KKOEGR</span>
            </div>
            <div>
                <div className="flex items-center">
                    <RiLightbulbFlashLine className="mr-2"/>
                    <span className="text-lg font-medium text-xh">Introduction to Javascript</span>
                </div>
                <div className="ml-6 flex text-lightgrey text-xs">
                    <div className="mr-6">Jun 4, 2024</div>
                    <div>10:30 am</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className={`${labelColor} ml-6 text-xs rounded-md
                                        px-2 text-white`}>
                        {`${groupMembers}/10`}
                    </span>
                    { groupMembers === 10 ? "":
                    <button className="shadow-md p-2 rounded-full bg-pri">
                        <FaPlus className="text-white"/>
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupCard
