import {RiLightbulbFlashLine} from "react-icons/ri"
import {FaCalendarAlt} from "react-icons/fa"
import {BsFillClockFill} from "react-icons/bs"
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import { useDispatch } from "react-redux"
import { deleteSchedule } from "../../features/scheduleSlice.jsx"
import { useState } from "react"
import { FallingLines, Hourglass, InfinitySpin } from "react-loader-spinner"

const ScheduleCard = (props) => {
    const [deleting, setDeleting] = useState(false)

    // Get current user
    const {user} = useDispatchUser()
    const dispatch = useDispatch()

    const utcDateString = props.schedule.datetime
    console.log(props.schedule.topic, utcDateString)
    console.log(props.schedule)
    const utcDateObject = new Date(utcDateString)
    // Define options for formatting the date
    const options = {
        weekday: 'short', // Specify the long weekday name (e.g., Thursday)
        day: 'numeric', // Specify the day of the month (e.g., 11)
        month: 'long', // Specify the long month name (e.g., April)
        year: 'numeric' // Specify the full year (e.g., 2024)
    };
    // Convert to local date and time string
    const datePart = utcDateObject.toLocaleDateString(undefined, options)
    const timePart = utcDateObject.toLocaleTimeString(undefined, { hour12:true })


    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/schedule/delete/${props.schedule.id}`

    const handleEdit = () => {
        props.handleEdit(props.schedule)
        props.openForm(true)
    }

    const handleDelete = () => {
        setDeleting(true)
        const deleteSch = async () => {
            try {
                const response = await fetch(endpoint, {
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                    },
                    body: JSON.stringify({"current_user_id": user.id})
                })

                const data = await response.json()
                if (!response.ok){
                    setDeleting(false)
                    throw new Error("Couldn't delete schedule", data)
                }
                setDeleting(false)
                // remove schedule from store
                dispatch(deleteSchedule(props.schedule.id))
            } catch (error){
                console.error(error.message)
            }
        }

        deleteSch()

    }

    console.log(props.schedule)
    return (
        <div>
            <div className="bg-white2 rounded-md p-4 shadow-md mb-4 max-w-sm">
                {/* Cohort */}
                <div className="mb-2 text-xs text-white flex justify-between">
                    <span className="bg-green px-2 py-1 rounded-md">{`Cohort ${props.schedule.cohort}`}</span>
                    <span className="bg-green px-2 py-1 rounded-md">
                        {`Group id ${props.schedule.unique_group_id?props.schedule.unique_group_id: "refresh"}`}
                    </span>
                </div>
                {/* Topic */}
                <div className="flex items-center text-lg font-medium border-l-pri border-l-4 my-2 mt-4">
                    <RiLightbulbFlashLine className="mr-2 ml-2"/>
                    <h3>{props.schedule.topic}</h3>
                </div>
                {/* Date and Time */}
                <div>
                    {/* Date */}
                    <div className="flex items-center font-medium border-l-pri border-l-4 my-2">
                        <FaCalendarAlt className="mr-2 ml-2"/>
                        <span className="text-sm">{datePart}</span>
                    </div>
                    {/* Time */}
                    <div className="flex items-center font-medium border-l-pri border-l-4 my-2">
                        <BsFillClockFill className="mr-2 ml-2"/>
                        <span className="text-sm">{timePart}</span> {/* Time of Meeting*/}
                    </div>
                </div>
                {/* Edit and Delete Button */}
                { user.id == props.schedule.user_id && (
                <div className="flex items-center justify-end">
                    <button
                        className={`rounded-full p-2
                                        text-white hover:text-white mr-4 ease-in-out duration-300 ${deleting?"bg-cream":"bg-red"}`}
                        onClick={handleDelete}
                        disabled={deleting?"disabled":""}
                    >
                        {deleting?(
                            <Hourglass colors={["#0d0031", "#cf4f4f"]} width="15" height={15} visible={true} ariaLabel="falling-circles-loading"/>
                        ):(
                            <MdDeleteForever />
                        )}
                    </button>
                    <button
                        className={`bg-pri hover:bg-blue rounded-full p-2
                                        text-white ease-in-out duration-300`}
                        onClick={handleEdit}
                    >
                        <FaEdit />
                    </button>
                </div>)}
            </div>
        </div>
    )
}

export default ScheduleCard
