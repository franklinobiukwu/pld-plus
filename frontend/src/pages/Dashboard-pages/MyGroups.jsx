import { useSelector } from "react-redux"
import GroupCard from "../../components/Dashboard-components/GroupCard"
import { HiMiniRocketLaunch } from "react-icons/hi2"
import { useEffect, useMemo, useState } from "react"
import SearchBar from "../../components/Dashboard-components/SearchBar.jsx";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import GroupMembers from "../../components/Dashboard-components/GroupMembers.jsx";
import { IoIosClose } from "react-icons/io";
import Skeleton from "react-loading-skeleton";

const MyGroups = () => {
    const [query, setQuery] = useState("")
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const {user} = useDispatchUser()
    const [group, setGroup] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [myGroups, setMyGroups] = useState([])

    useEffect(() => {
        if (groups !== null){
            const myGroups = groups.filter((group) => {
                if (group.members_id.includes(user.id)) return group
            })
            setMyGroups(myGroups)
            setLoading(false)
        }
    }, [groups])

    const filteredGroups = useMemo(() => {
        return myGroups.filter(group => {
            return (
                String(group.unique_group_id).toLowerCase().includes(query.toLowerCase()) ||
                String(group.topic).toLowerCase().includes(query.toLowerCase()) ||
                String(group.cohort).toLowerCase().includes(query.toLowerCase())
            )

        })
    }, [myGroups, query])


    const handleOpen = (group) =>{
        setGroup(group)
        setIsOpen(true)
    }

    const handleClose =() => {
        setGroup("")
        setIsOpen(false)
    }

    return (
        <div className="relative">
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
                {filteredGroups.length > 1 ?   (
                    <div className="hidden md:block border-t-8 border-t-pri rounded-t-md h-4 bg-white2 md:mb-[-4rem] max-w-sm"></div>
                ):(
                    <div></div>
                )}
                {loading ? (<Skeleton count={3}/>
                ):(
                    filteredGroups.map((group) => (
                        <div onClick={() => handleOpen(group)} className="cursor-pointer">
                            <GroupCard group={group} key={group.unique_group_id}/>
                        </div>
                    ))
                )}
            </div>
 
            </div>
            {/* Display meeting*/}
            <div className={`absolute top-0 w-full h-lvh bg-[#ffffffe0] ${isOpen ? "":"hidden"}`}>
                <div
                    className="flex justify-end px-4 hover:text-red ease-in-out duration-300 cursor-pointer"
                    onClick={handleClose}
                >
                    <IoIosClose className="text-4xl"/>
                </div>
                <div className="flex justify-center items-center w-full h-full">
                   <GroupMembers group={group} close={handleClose} /> 
                </div>
            </div>
        </div>
    )
}

export default MyGroups