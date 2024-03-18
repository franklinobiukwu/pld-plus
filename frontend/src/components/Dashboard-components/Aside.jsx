import { useState } from "react"
import Calendar from "react-calendar"
import UpcomingPldList from "./UpcomingList.jsx";


const Aside = () => {
    
    const [value, onChange] = useState(new Date())

    return (
        <div>
            {/* Calendar */}
            <div>
                <h3 className="text-xs font-medium border-b border-b-cream2">CALENDAR</h3>
                <div className="rounded-md shadow-md px-4 py-2 mt-2">
                    <Calendar onChange={onChange} value={value}/>
                </div>
            </div>   
            {/* Up Coming PLDs*/}
            <div>
                <UpcomingPldList/>                
            </div>
            {/* Updates */}
            <div></div>
        </div>
    )
}

export default Aside
