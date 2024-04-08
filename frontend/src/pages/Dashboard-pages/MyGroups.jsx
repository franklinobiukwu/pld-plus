import { useSelector } from "react-redux"
import GroupCard from "../../components/Dashboard-components/GroupCard"
import { HiMiniRocketLaunch } from "react-icons/hi2"
import { useMemo, useState } from "react"
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";

const MyGroups = () => {
    const [query, setQuery] = useState("")
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const {user} = useDispatchUser()

    const myGroups = groups.filter((group) => {
        if (group.members_id.includes(user.id)) return group
    })

    const filteredGroups = useMemo(() => {
        return myGroups.filter(group => {
            return (
                String(group.group_id).toLowerCase().includes(query.toLowerCase()) ||
                String(group.topic).toLowerCase().includes(query.toLowerCase()) ||
                String(group.cohort).toLowerCase().includes(query.toLowerCase())
            )

        })
    }, [myGroups, query])

    return (
        <div>
            {/* Host PLD */}
        {/*        <div className="flex">
            <div className="flex flex-col shadow-md rounded-md p-4 justify-center items-center bg-white2">
                <div 
                    className="flex rounded-md p-2 bg-green
                        h-10 w-10 items-center justify-center text-white">
                    <HiMiniRocketLaunch />
                </div>
                    <p className="mt-1 text-sm">Host PLD</p>
             </div>
        </div>*/}


            {/* Groups */}
            <div className="flex flex-col justify-center items-center md:block">
                <SearchBar
                    useQuery={{'query': query, 'setQuery': setQuery}}
                    placeholder="search pld"
                />
                           {/* Search Results*/}
            <div className="md:grid grid-cols-2 gap-4 mt-10">
                <div className="border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                {filteredGroups.length > 2 ?   (
                    <div className="hidden md:block border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                ):(
                    <div></div>
                )}
                {!groups ? (<Skeleton count={3}/>
                ):(
                    filteredGroups.map(( group, id) => (
                        <GroupCard group={group} key={id}/>
                    ))
                )}
            </div>
 
            </div>
        </div>
    )
}

export default MyGroups
