import { RiLightbulbFlashLine } from "react-icons/ri"
import { FaCalendarAlt } from "react-icons/fa"

const UpcomingPldList = (props) => {

    console.log(props)
    return (
        <div className="shadow-md rounded-md px-6 py-4 mt-1 bg-white2">
            <div>
                <div className="flex items-center">
                    <RiLightbulbFlashLine className="mr-2"/>
                    <span className="text-sm font-medium">{props.pld.topic}</span>
                </div>
                <div className="flex text-lightgrey text-xs">
                    <FaCalendarAlt className="mr-2"/>
                    <div className="mr-6">Jun 4, 2024</div>
                    <div>10:30 am</div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingPldList
