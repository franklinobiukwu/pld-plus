import {useMemo, useState } from "react";
import GroupCard from "../../components/Dashboard-components/GroupCard.jsx";
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import Pagination from "../../components/Dashboard-components/Pagination.jsx";
import useLoadGroups from "../../hooks/useLoadGroups.jsx"
import useSearch from "../../hooks/useSearch.jsx";

const DiscoverGroup = () => {
    const [query, setQuery] = useState("")
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const pldGroupsInfo = useSelector(state => state.pldGroups.pldGroupsInfo)
    const {loadGroups} = useLoadGroups()
    const isLoading = groups === null
    const {loading, error, results, search} = useSearch("pld_group")
    

    const filteredGroups = useMemo(() => { 
        if (!groups && !results) return []
        const data = groups?groups:results
        return data.filter(group => {
            return (
                String(group.group_id).toLowerCase().includes(query.toLowerCase()) ||
                String(group.topic).toLowerCase().includes(query.toLowerCase()) ||
                String(group.cohort).toLowerCase().includes(query.toLowerCase()))
    })}, [groups, query])


    return (
        <div className="min-h-full flex flex-col">
            <SearchBar
                useQuery={{'query': query, 'setQuery': setQuery}}
                placeholder="search id or topic"
                search={search}
                data={"pld_group"}
            />
            {/* Search Results*/}
            <div className="grow">
            <div className="md:grid grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
                {isLoading ? (<Skeleton count={3}/>
                ):(
                    filteredGroups.map(( group, id) => (
                        <GroupCard group={group} key={id}/>
                    ))
                )}
            </div>
            </div>
            {/* Pagination */}
            <div className="mt-4">
                {pldGroupsInfo && <Pagination
                    currentPage={pldGroupsInfo.current_page}
                    totalPages={pldGroupsInfo.total_pages}
                    totalItems={pldGroupsInfo.total_groups}
                    loadItems={loadGroups}
                    />
                }
            </div>
        </div>
    )
}

export default DiscoverGroup
