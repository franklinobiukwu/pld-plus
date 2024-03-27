import { RiLightbulbFlashLine } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"

const GroupCard = (props) => {

    const groupMembers = parseInt(props.group.member_count)
    let labelColor

    if (groupMembers <= 5){
       labelColor = "bg-green" 
    } else if (groupMembers > 5 && groupMembers <= 9) {
       labelColor = "bg-yellow" 
    } else {
        labelColor = "bg-red mt-2"
    }

    const group_id = "temp stuff"
    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/pld-group/${group_id}/add`

    const handleAddToGroup = () => {

        const addToGroup = async () => {
            const res = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(),
                header: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
        }
    }

    return (
        <div className="shadow-md rounded-md px-4 py-4 mt-2 bg-white2 max-w-sm">
            <div className="flex items-center">
                <FaUsers className="mr-2"/>
                <span className="font-medium text-md">{props.group.group_id}</span>
            </div>
            <div>
                <div className="flex items-center">
                    <RiLightbulbFlashLine className="mr-2"/>
                    <span className="text-lg font-medium text-xh">{props.group.topic}</span>
                </div>
                <div className="ml-6 flex text-lightgrey text-xs">
                    <div className="mr-6">{props.group.datetime}</div>
                    <div>{props.group.datetime}</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className={`${labelColor} ml-6 text-xs rounded-md
                                        px-2 text-white`}>
                        {`${groupMembers}/10`}
                    </span>
                    { groupMembers === 10 ? "":
                    <button className="shadow-md p-2 rounded-full bg-pri" onClick={handleAddToGroup}>
                        <FaPlus className="text-white"/>
                    </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupCard
