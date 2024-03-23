import {RiLightbulbFlashLine} from "react-icons/ri"
import {FaCalendarAlt} from "react-icons/fa"
import {BsFillClockFill} from "react-icons/bs"
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

const ScheduleCard = (props) => {

    const handleEdit = () => {
        props.handleEdit(props.schedule)
        props.openForm(true)
    }

    return (
        <div>
            <div className="bg-white2 rounded-md p-4 shadow-md mb-4 max-w-sm">
                {/* Cohort */}
                <div className="mb-2 text-xs text-white">
                    
                    <span className="bg-green px-2 py-1 rounded-md">{`Cohort ${props.schedule.cohort}`}</span>
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
                        <span className="text-sm">{props.schedule.datetime.split("T")[0]}</span>
                    </div>
                    {/* Time */}
                    <div className="flex items-center font-medium border-l-pri border-l-4 my-2">
                        <BsFillClockFill className="mr-2 ml-2"/>
                        <span className="text-sm">{props.schedule.datetime.split("T")[1]}</span> {/* Time of Meeting*/}
                    </div>
                </div>
                {/* Edit and Delete Button */}
                <div className="flex items-center justify-end">
                    <button className="bg-white hover:bg-red rounded-full p-2
                                        text-pri hover:text-white mr-4 ease-in-out duration-300">
                        <MdDeleteForever />
                    </button>
                    <button
                        className="bg-pri hover:bg-blue rounded-full p-2
                                        text-white ease-in-out duration-300"
                        onClick={handleEdit}
                    >
                        <FaEdit />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCard
