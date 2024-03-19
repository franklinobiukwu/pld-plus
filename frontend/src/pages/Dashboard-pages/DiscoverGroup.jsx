import GroupCard from "../../components/Dashboard-components/GroupCard.jsx";
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";

const DiscoverGroup = () => {
    return (
        <div>
            <SearchBar/>
            {/* Search Results*/}
            <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="border-t-8 border-t-pri rounded-t-md h-4 bg-white2 mb-[-4rem]"></div>
                <div className="border-t-8 border-t-pri rounded-t-md h-4 bg-white2 mb-[-4rem]"></div>
                <GroupCard/>            
                <GroupCard/>            
                <GroupCard/>            
                <GroupCard/>            
                <GroupCard/>            
            </div>
        </div>
    )
}

export default DiscoverGroup
