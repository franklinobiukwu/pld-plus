import { useEffect, useState } from "react"
import UpcomingPldList from "./UpcomingList"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux"
import useLoadSchedules from "../../hooks/useLoadSchedules.jsx";

const AsideUpcoming =() => {
    const {loading, error, loadSchedules} = useLoadSchedules()
    const schedules = useSelector(state => state.schedules.schedules)
    const [filteredSchedules, setFilteredSchedules] = useState([])


    useEffect(() => {
        loadSchedules()
    },[])

    useEffect(() => {
        if (schedules){
            const filtered = schedules.filter((schedule) => {
                const dateObj = new Date(schedule.datetime)
                const now = new Date()
                if (dateObj >= now) return schedule
            })
            setFilteredSchedules(filtered)
        }
    }, [schedules])

    return (
        <div>
            <h3 className="text-xs font-semibold border-b border-b-cream2 mt-4">UP COMING PLDS</h3>
            <div className="mt-2">
                { loading?(
                    <Skeleton/>
                ):
                    filteredSchedules.length > 0 ?
                        filteredSchedules.map((schedule) => {
                            return <UpcomingPldList pld={schedule} key={schedule.id}/>
                    }) : (<p className="text-sm mt-2 text-lightgrey">No up coming plds</p>)
                }
            </div>
        </div>
    )
}

export default AsideUpcoming
