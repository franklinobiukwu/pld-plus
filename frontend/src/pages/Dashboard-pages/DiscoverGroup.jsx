import {useMemo, useState } from "react";
import GroupCard from "../../components/Dashboard-components/GroupCard.jsx";
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const DiscoverGroup = () => {
    const [query, setQuery] = useState("")
    const groups = useSelector(state => state.pldGroups.pldGroups)

    const filteredGroups = useMemo(() => { 
        return groups.filter(group => {
            return (
                String(group.group_id).toLowerCase().includes(query.toLowerCase()) ||
                String(group.topic).toLowerCase().includes(query.toLowerCase()) ||
                String(group.cohort).toLowerCase().includes(query.toLowerCase()))
    })}, [groups, query])


    return (
        <div className="flex flex-col justify-center items-center md:block">
            <SearchBar
                useQuery={{'query': query, 'setQuery': setQuery}}
                placeholder="search id or topic"
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
    )
}

export default DiscoverGroup
