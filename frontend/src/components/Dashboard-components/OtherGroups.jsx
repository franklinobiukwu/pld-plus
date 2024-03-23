import Skeleton from "react-loading-skeleton";
import GroupCard from "./GroupCard.jsx";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'


const OtherGroups = () => {
    const [groups, setGroups] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const endpoint = `${import.meta.env.VITE_BASE_API}/groups`

    {/* Load Groups Data From Backend Database */}
    useEffect(()=>{
        const getGroup = async () => {
            const res = await fetch(endpoint)
            if (!res.ok){
                setIsLoading(false)
                throw new Error("Couldn't load groups")
            }
            const data = await res.json()
            setGroups(data)
            setIsLoading(false)
        }

        getGroup()
    }, [])

    return (
        <div className="min-w-72">
            <h3 className="text-xs font-medium
                    border-b border-b-cream2">OTHER GROUPS</h3>
            <div className="border-t-8 rounded-md border-pri mt-2">
                <hr className="text-cream2 mt-4"/>

                <div>
                    {/* Group Member List*/}
                    {isLoading ? (
                        <Skeleton count={3}/>
                    ):groups.map((group, id) => {
                        return <GroupCard group={group} key={id}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default OtherGroups
