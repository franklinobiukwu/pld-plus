import { useState } from "react"
import useDispatchUser from "./useDispatchUser.jsx";
import { useDispatch } from "react-redux";
import { setGroups } from "../features/pldGroupsSlice.jsx";
import { setPldGroupInfo } from "../features/pldGroupsSlice.jsx";

const useLoadGroups = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {user} = useDispatchUser()
    const dispatch = useDispatch()


    const loadGroups = async (page) => {
        const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/discover-groups?page=${page?page:1}`
       try{
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })

            if (!response.ok){
                const errResponse = await response.json()
                setError(`${errResponse.error}`)
                setLoading(false)
                throw new Error("Couldn't load groups")
            }
            const data = await response.json()
            const {schedules, ...rest} = data
            const allGroup = data.schedules.map(schedule => {
                const { date, ...rest } = schedule
                return {...rest, datetime: date}
            })
           // Set Group
            dispatch(setGroups(allGroup))
            dispatch(setPldGroupInfo(rest))
            setLoading(false)
       } catch (error){
            console.error(`Error loafing groups: ${error.message}`)
       } 
    }

    return {loading, error, loadGroups}
}

export default useLoadGroups
