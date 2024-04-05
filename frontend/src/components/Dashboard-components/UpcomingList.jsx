import { RiLightbulbFlashLine } from "react-icons/ri"
import { FaCalendarAlt } from "react-icons/fa"

const UpcomingPldList = (props) => {
    // Convert datetime to local datetime
    const dateString = props.pld.datetime
    const dateObj = new Date(dateString)

    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    const datePart = dateObj.toLocaleDateString(undefined, options)
    const timePart = dateObj.toLocaleTimeString(undefined, { hour12: true, hour: "numeric", minute: "numeric" })

    return (
        <div className="shadow-md rounded-md px-6 py-4 mt-1 bg-white2">
            <div>
                <div className="flex items-center">
                    <RiLightbulbFlashLine className="mr-2"/>
                    <span className="text-sm font-medium">{props.pld.topic}</span>
                </div>
                <div className="flex text-lightgrey text-xs">
                    <FaCalendarAlt className="mr-2"/>
                    <div className="mr-6">{datePart}</div>
                    <div>{timePart}</div>
                </div>
            </div>
        </div>
    )
}

export default UpcomingPldList
