import Skeleton from "react-loading-skeleton";
import GroupCard from "./GroupCard.jsx";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import useLoadGroup from "../../hooks/useLoadGroup.jsx";
import { useSelector } from "react-redux";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";


const OtherGroups = () => {
    const {loading, error, loadGroup} = useLoadGroup()
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const {user} = useDispatchUser() 
    const [otherGroups, setOtherGroups] = useState([])


    {/* Load Groups Data From Backend Database */}
    useEffect(()=>{
       loadGroup() 
    }, [])

    useEffect(() => {
        if (groups.length > 0){
            const filteredGroups = groups.filter(group => !group.members_id.includes(user.id))
            setOtherGroups(filteredGroups)
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
                    {loading ? (
                        <Skeleton count={3}/>
                    ) : 
                        otherGroups.length > 0 ? 
                            otherGroups.map((group, id) => <GroupCard group={group} key={id}/>
                        ) : (
                            <p className="text-lightgrey mt-2 text-sm">No groups to display</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default OtherGroups
