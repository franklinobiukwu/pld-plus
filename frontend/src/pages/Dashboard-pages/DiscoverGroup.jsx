import { useEffect, useState } from "react";
import GroupCard from "../../components/Dashboard-components/GroupCard.jsx";
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";

const DiscoverGroup = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState([])

    const endpoint = `${import.meta.env.VITE_BASE_API}/groups`

    // Load Groups Data From Backend Database
    useEffect(()=>{
        const loadGroup = async() => {
            const res = await fetch(endpoint)

            if (!res.ok){
                setIsLoading(false)
                throw new Error("Couldn't load groups")
            }

            const data = await res.json()
            setGroups(data)
            setIsLoading(false)
        }

        loadGroup()
    },[])
    return (
        <div className="flex flex-col justify-center items-center md:block">
            <SearchBar className=""/>
            {/* Search Results*/}
            <div className="md:grid grid-cols-2 gap-4 mt-10">
                <div className="border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                <div className="hidden md:block border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                {isLoading?"Loading groups...":groups.map(( group, id) => {
                    return <GroupCard group={group} key={id}/>
                })}
            </div>
        </div>
    )
}

export default DiscoverGroup
