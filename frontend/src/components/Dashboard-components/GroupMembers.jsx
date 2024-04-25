import GroupMemberList from "./GroupMemberList"
import { TbPlugConnected } from "react-icons/tb"
import { IoExit } from "react-icons/io5"
import { RiLightbulbFlashLine } from "react-icons/ri"
import {FaCalendarAlt } from "react-icons/fa"
import { BsFillClockFill } from "react-icons/bs"
import bannerImg from "../../images/groupImg.png"
import { useEffect, useState } from "react"
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import { useDispatch } from "react-redux"
import { deleteMember } from "../../features/pldGroupsSlice.jsx";
import Skeleton from "react-loading-skeleton"


const GroupMembers = (props) => {

    const [loading, setLoading] = useState(true)
    const {user} = useDispatchUser()
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.group){
            setLoading(false)
        }
    }, [props.group])

    if (loading || !props.group){
        return (
        <div>
            <h3 className="text-xs font-medium border-b border-b-cream2">YOUR GROUP MEMBERS</h3>
            <div className="shadow-md border-t-8 rounded-md border-pri mt-2 bg-white2">
                <hr className="text-cream2 mt-4"/>
                <Skeleton count={3}/>
            </div>
         </div>
        )
    }

    // Convert datetime string to datetime object
    const dateObject = new Date(props.group.datetime)
    const options = {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric"
    }

    const datePart = dateObject.toLocaleDateString(undefined, options)
    const timePart = dateObject.toLocaleTimeString(undefined, {hour12:true, hour: "numeric", minute: "numeric"})

    const backgroundStyle = {
        backgroundImage: `url(${bannerImg})`
    }

    let meetingUrl = props.group.meeting_link
    if (!meetingUrl.startsWith("http://") && !meetingUrl.startsWith("https://")){
        meetingUrl = `http://${meetingUrl}`
    }

    // Remove Member From Group
    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/pld-group/delete`

    const handleRemoveFromGroup = () =>{
        const removeFromGroup = async () => {
            try{
            const response = await fetch (endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({"current_user_id": user.id, "pld_group_id": props.group.id})
            })

            if (!response.ok){
                const data = await response.json()
                throw new Error(`Couldn't remove you you from group: ${data}`)
            }
            const data = await response.json()
            dispatch(deleteMember({"user_id": user.id, "pld_group_id": data.deleted_member.deleted_member.pld_group_id}))
            // Close Group Members Display if open
            if (props.close){
                props.close()
            }
        } catch (error) {
            console.error(error)
        }
        }
        removeFromGroup()
    }

    // Sort Members List
    const sortGroup = (group, userEmail) => {
        const sortedMembers = [...group.members_details]
        sortedMembers.sort((a, b) => {
            if (a.role === "Host") return -1;
           if (a.email === userEmail) return 1;
           return a.role.localeCompare(b.role);
       }) 
        group.members_details = sortedMembers
    }

    const group = props.group
    sortGroup(group, user.email)

    return (
        <div>
            <h3 className="text-xs font-medium border-b border-b-cream2">YOUR GROUP MEMBERS</h3>
        <div className="shadow-md border-t-8 rounded-md border-pri mt-2 bg-white2">
            <hr className="text-cream2 mt-4"/>

        <div className="px-4 pb-8">
            {/* Title Card */}
            <div
                className={`shadow-sm rounded-md py-4 px-4 mt-2 bg-cover`}
                style={backgroundStyle}
            >
                <div className="flex items-center text-xl font-medium">
                    <RiLightbulbFlashLine />
                    <p>{props.group.topic}</p> {/* Meeting Title*/}
                </div>

                <div className="flex justify-between">
                    <div className="flex">
                        <div className="flex items-center mr-10">
                            <FaCalendarAlt className="mr-2"/>
                            <span className="text-sm">{datePart}</span> {/* Date of Meeting */}
                        </div>
                        <div className="flex items-center">
                            <BsFillClockFill className="mr-2"/>
                            <span className="text-sm">{timePart}</span> {/* Time of Meeting*/}
                        </div>
                    </div>
                    <span className="flex items-center bg-white px-2 rounded-md text-xs font-medium">
                        {props.group.unique_group_id}
                    </span> {/* Meeting Id*/}
                </div>
            </div>


            {/* Group Member List*/}
            <div className="mt-4">
                    {props.group.members_details.map((member, id) => {
                        const memberName = `${member.firstname} ${member.lastname}`
                        return <GroupMemberList label={member.role} name={memberName} key={id}/>
                    })}
            </div>
            {/* Buttons */}
            <div className="flex justify-around mt-8">
                <button
                    onClick={handleRemoveFromGroup}
                    className="rounded-md bg-red
                        px-4 py-2 flex justify-center items-center text-white">
                    <IoExit className="mr-2"/>
                    Leave group
                </button>
                <a href={meetingUrl} target="_blank" className="rounded-md bg-blue
                        px-4 py-2 flex justify-center items-center text-white">
                    <TbPlugConnected className="mr-2"/>
                    Join meet
                </a>
            </div>
        </div>
        </div>
        </div>
    )
}

export default GroupMembers
