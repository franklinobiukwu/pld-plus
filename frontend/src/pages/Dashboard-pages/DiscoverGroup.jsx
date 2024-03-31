import { useEffect, useMemo, useState } from "react";
import GroupCard from "../../components/Dashboard-components/GroupCard.jsx";
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setGroups } from "../../features/pldGroupsSlice.jsx";

const DiscoverGroup = () => {
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")

    const {user} = useDispatchUser()
    const dispatch = useDispatch()

    const groups = useSelector(state => state.pldGroups.pldGroups)

    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/discover-groups`

    const filteredGroups = useMemo(() => { 
        return groups.filter(group => {
        return (String(group.group_id).toLowerCase().includes(query.toLowerCase()) ||
            String(group.topic).toLowerCase().includes(query.toLowerCase()) || String(group.cohort).toLowerCase().includes(query.toLowerCase()))
    })}, [groups, query])


    // Load Groups Data From Backend Database
    useEffect(()=>{
        const loadGroup = async() => {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })

            if (!response.ok){
                setLoading(false)
                throw new Error("Couldn't load groups")
            }

            const data = await response.json()
            console.log("groups", data.schedules)
            const allGroup = data.schedules.map(schedule => {
                const { date, ...rest } = schedule
                return {...rest, datetime: date}
            })
            dispatch(setGroups(allGroup))
            setLoading(false)
        }

        loadGroup()
    },[])
    return (
        <div className="flex flex-col justify-center items-center md:block">
            <SearchBar useQuery={{'query': query, 'setQuery': setQuery}} placeholder="search id or topic"/>
            {/* Search Results*/}
            <div className="md:grid grid-cols-2 gap-4 mt-10">
                <div className="border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                <div className="hidden md:block border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                {loading?"Loading groups...":filteredGroups.map(( group, id) => {
                    return <GroupCard group={group} key={id}/>
                })}
            </div>
        </div>
    )
}

export default DiscoverGroup
