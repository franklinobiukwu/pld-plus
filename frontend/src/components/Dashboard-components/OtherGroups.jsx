import GroupCard from "./GroupCard.jsx";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import Skeleton from "react-loading-skeleton";


const OtherGroups = () => {
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const {user} = useDispatchUser() 
    const [otherGroups, setOtherGroups] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (groups !== null && groups.length > 0){
            const filteredGroups = groups.filter(group => {
            const dateObj = new Date(group.datetime)
                if (!group.members_id.includes(user.id) && dateObj - new Date() > 0) return group
            })
            // Sorting the filtered Groups by datetime
            filteredGroups.sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
            // Updating state with sorted filter group
            setOtherGroups([...filteredGroups])
            setLoading(false)
        }
    },[groups, user.id])


    return (
        <div className="min-w-72">
            <h3 className="text-xs font-medium
                    border-b border-b-cream2">OTHER GROUPS</h3>
            <div className="border-t-8 rounded-md border-pri mt-2">
                <hr className="text-cream2 mt-4"/>

                <div>
                    {/* Group Member List*/}
                    {loading? (<Skeleton count={3}/>) : otherGroups.length > 0 ? 
                            otherGroups.map((group, id) => <GroupCard group={group} key={id}/>) : (<p className="text-lightgrey mt-2 text-sm">No groups to display</p>)
                    }
                        
                </div>
            </div>
        </div>
    )
}

export default OtherGroups
