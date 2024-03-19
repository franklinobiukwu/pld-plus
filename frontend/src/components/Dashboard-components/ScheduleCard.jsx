import {RiLightbulbFlashLine} from "react-icons/ri"
import {FaCalendarAlt} from "react-icons/fa"
import {BsFillClockFill} from "react-icons/bs"
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

const ScheduleCard = () => {
    return (
        <div>
            <div className="bg-white2 rounded-md p-4 shadow-md mb-4">
                {/* Cohort */}
                <div className="mb-2 text-xs text-white">
                    
                    <span className="bg-green px-2 py-1 rounded-md">Cohort 12</span>
                </div>
                {/* Topic */}
                <div className="flex items-center text-lg font-medium border-l-pri border-l-4 my-2 mt-4">
                    <RiLightbulbFlashLine className="mr-2 ml-2"/>
                    <h3>Intro to Python OOP</h3>
                </div>
                {/* Date and Time */}
                <div>
                    {/* Date */}
                    <div className="flex items-center font-medium border-l-pri border-l-4 my-2">
                        <FaCalendarAlt className="mr-2 ml-2"/>
                        <span className="text-sm">Jun 4, 2024</span>
                    </div>
                    {/* Time */}
                    <div className="flex items-center font-medium border-l-pri border-l-4 my-2">
                        <BsFillClockFill className="mr-2 ml-2"/>
                        <span className="text-sm">10:30 am</span> {/* Time of Meeting*/}
                    </div>
                </div>
                {/* Edit and Delete Button */}
                <div className="flex items-center mt-4 justify-end">
                    <button className="bg-red rounded-full p-2 text-white mr-4">
                        <MdDeleteForever />
                    </button>
                    <button className="bg-blue rounded-full p-2 text-white">
                        <FaEdit />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCard
