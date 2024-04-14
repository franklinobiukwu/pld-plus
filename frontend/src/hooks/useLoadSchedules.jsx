import { useState } from "react"
import { useDispatch } from "react-redux"
import useDispatchUser from "./useDispatchUser.jsx";
import { setSchedule } from "../features/scheduleSlice.jsx";
import { setScheduleInfo } from "../features/scheduleSlice.jsx";

const useLoadSchedules = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const { user } = useDispatchUser()

    const loadSchedules = async (page) => {
        const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/schedules?page=${page?page:1}`
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                if (!response.ok){
                    const errResponse = await response.json()
                    setLoading(false)
                    setError(`Error loading schedule: ${errResponse.message}`) 
                    throw Error("Error getting Schedule")
                }

                const data = await response.json()
                console.log(data)
                const {schedules, ...rest} = data
                const allSchedules = schedules.map(item => {
                    const {date, ...rest} = item
                    return {...rest, datetime: date}
                })
                 // Set Schedule
                dispatch(setSchedule(allSchedules))
                dispatch(setScheduleInfo(rest))
                setLoading(false)
                return data
            } catch (error) {
                console.error("Error fetching schedules:", error.message)
            }
    }

    return {loading, error, loadSchedules}
}

export default useLoadSchedules
