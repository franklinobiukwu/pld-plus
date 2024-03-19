import { useState } from "react"
import Calendar from "react-calendar"
import AsideUpcoming from "./AsideUpcoming.jsx";
import Updates from "./Updates.jsx";


const Aside = () => {
    
    const [value, onChange] = useState(new Date())

    return (
        <div className="fixed max-w-[calc(90rem/12*2)]">
            {/* Calendar */}
            <div>
                <h3 className="text-xs font-semibold border-b border-b-cream2">CALENDAR</h3>
                <div className="rounded-md shadow-md px-4 py-2 mt-2 bg-pri text-white">
                    <Calendar onChange={onChange} value={value}/>
                </div>
            </div>   
            {/* Up Coming PLDs*/}
            <div>
                <AsideUpcoming />
            </div>
            {/* Updates */}
            <div>
                <Updates/>                
            </div>
        </div>
    )
}

export default Aside
