import { RiLightbulbFlashLine } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"
import useDispatchUser from "../../hooks/useDispatchUser"
import { useState } from "react"
import { FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux"
import { addMember, deleteMember } from "../../features/pldGroupsSlice"

const GroupCard = (props) => {
    const dispatch = useDispatch()

    const {user} = useDispatchUser()

    const groupMembers = parseInt(props.group.member_count)
    const [joined, setJoined] = useState(false)

    let labelColor

    if (groupMembers <= 5){
       labelColor = "bg-green" 
    } else if (groupMembers > 5 && groupMembers <= 9) {
       labelColor = "bg-yellow" 
    } else {
        labelColor = "bg-red mt-2"
    }

    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/pld-group/add`

    const handleAddToGroup = () => {

        const addToGroup = async () => {
            try{
                const response = await fetch(endpoint, {
                    method: "POST",
                    body: JSON.stringify({
                        "current_user_id": user.id,
                        "pld_group_id": props.group.id
                    }),
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                if (!response.ok){
                    const data = await response.json()
                    throw new Error(`Error adding you to group: ${data}`)
                }
                const data = await response.json()
                dispatch(addMember({"user_id": user.id, "pld_group_id": data.added_member.pld_group_id}))
                setJoined(true)
            } catch (error) {
            console.error(error)
            }
        }

        addToGroup()
    }

    const removeEndpoint = `${import.meta.env.VITE_BASE_API}/dashboard/pld-group/delete`
    const handleRemoveFromGroup = () => {
        const removeFromGroup = async () => {
            try{
                const response = await fetch(removeEndpoint, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    },
                    body: JSON.stringify({"current_user_id": user.id, "pld_group_id": props.group.id})
                })

                if (!response.ok){
                    const data = await response.json()
                    throw new Error("Couldn't remove you from group", data)
                }

                const data = await response.json()
                dispatch(deleteMember({"user_id": user.id, "pld_group_id": data.deleted_member.deleted_member.pld_group_id}))
                setJoined(false)
            } catch (error) {
                console.error(error)
            }
        }

        removeFromGroup()
    }

    const utcDateString = props.group.datetime
    const utcDateObject = new Date(utcDateString)
    // Options for formatting date
    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    // Convert to local date and time string
    const datePart = utcDateObject.toLocaleDateString(undefined, options)
    const timePart = utcDateObject.toLocaleTimeString(undefined, { hour12:true, hour: "numeric", minute: "numeric" })



    return (
        <div className="shadow-md rounded-md px-4 py-4 mt-2 bg-white2 max-w-sm">
            <div className="flex items-center">
                <FaUsers className="mr-2"/>
                <span className="font-medium text-md">{props.group.unique_group_id}</span>
            </div>
            <div>
                <div className="flex items-center">
                    <RiLightbulbFlashLine className="mr-2"/>
                    <span className="text-lg font-medium text-xh">{props.group.topic}</span>
                </div>
                <div className="ml-6 flex text-lightgrey text-xs">
                    <div className="mr-6">{datePart}</div>
                    <div>{timePart}</div>
                </div>
                <div className="flex justify-between items-center">
                    <span className={`${labelColor} ml-6 text-xs rounded-md
                                        px-2 text-white mt-2`}>
                        {`${groupMembers}/10`}
                    </span>

                    {/* Buttons */}
                    <div>
        {/*{ groupMembers === 10 || (String(user.id).toLowerCase() === String(props.group.user_id).toLowerCase())*/}
                    { groupMembers === 10 || props.group.members_id.includes(user.id)? ("") : (
                            <button
                                className={`shadow-md p-2 rounded-full bg-pri hover:bg-[#07001b] ease-in-out duration-300 ${joined?"hidden":""}`}
                                onClick={handleAddToGroup}
                            >
                                <FaPlus className="text-white"/>
                            </button>)
                    }
                    { props.group.members_id.includes(user.id) ? ( 

                            <button
                                className={`shadow-md p-2 rounded-full bg-red hover:bg-[#af3737] ease-in-out duration-300`}
                                onClick={handleRemoveFromGroup}
                            >
                                <FaMinus className="text-white"/>
                            </button>
                            ): (" ") 
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupCard
