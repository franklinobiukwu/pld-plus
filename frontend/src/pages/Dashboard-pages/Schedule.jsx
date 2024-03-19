import ScheduleForm from "../../components/Dashboard-components/ScheduleForm"
import ScheduleCard from "../../components/Dashboard-components/ScheduleCard"
import { FaPlus } from "react-icons/fa"

const Schedule = () => {
    return (
        <div>

            <div className="flex">
            <div className="bg-pri text-white flex items-center px-4 py-2 rounded-md">
                <FaPlus className="text-white mr-2"/>
                New
            </div>
            </div>
            <ScheduleCard/>
            <ScheduleForm/>
        </div>
    )
}

export default Schedule
