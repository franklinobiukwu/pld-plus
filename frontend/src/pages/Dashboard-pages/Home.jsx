import { useSelector } from "react-redux";
import Greet from "../../components/Dashboard-components/Greet"
import GroupMembers from "../../components/Dashboard-components/GroupMembers.jsx";
import OtherGroups from "../../components/Dashboard-components/OtherGroups.jsx";
import QuickActions from "../../components/Dashboard-components/QuickActions.jsx";
import UpcomingCard from "../../components/Dashboard-components/Upcoming"
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Home = () => {
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const {user} = useDispatchUser()
    const [myGroups, setMyGroups] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (groups){
            const filteredGroup = groups.filter((group) => {
                const dateObj = new Date(group.datetime)
                if (group.members_id.includes(user.id) && dateObj - new Date() > 0) return group
            })
            setMyGroups(filteredGroup)
            setLoading(false)
        }
    }, [groups, user.id])

    console.log("My groups: ", myGroups)
    // Convert datetime string to date object
    const sortedGroups = myGroups.map(group => ({
        ...group,
            datetime: new Date(group.datetime)
    }))
    // Sort the array based on the differences between dates and today's date
    sortedGroups.sort((a, b) => {
        const dateA = Math.abs(new Date(a.datetime) - new Date())
        const dateB = Math.abs(new Date(b.datetime) - new Date())
        return dateA - dateB
    })

    console.log("Sorted groups: ", myGroups)
    console.log(sortedGroups)
    console.log("Group is Loading", loading)


    return (
        <div className="lg:grid grid-cols-12">
            <div className="col-span-6">
                <Greet />
            </div>
            {/* Upcoming Card*/}
            <div className="col-span-8 col-start-1 mt-10 max-w-md">
                <UpcomingCard/>
            </div>
            {/* Quick Action*/}
            <div className="col-span-10 mt-10 max-w-md">
                <QuickActions/>
            </div>
            {/* Group members*/}
            <div className="md:flex gap-4 col-start-1 col-end-13 mt-10">
                {loading?
                    (
                        <div>
                            <h3 className="text-xs font-medium border-b border-b-cream2 min-w-96">YOUR GROUP MEMBERS</h3>
                            <div className=" border-t-8 rounded-md border-pri mt-2 bg-white2">
                                <hr className="text-cream2 mt-4"/>
                            </div>
                            <Skeleton count={3}/>
                        </div>
                    ) : sortedGroups.length > 0 ?
                <div className="flex-grow max-w-md">
                    <GroupMembers group={sortedGroups[0]}/>
                </div> :
                    <div>
                            <div>
                                <h3 className="text-xs font-medium border-b border-b-cream2">YOUR GROUP MEMBERS</h3>
                                <div className=" border-t-8 rounded-md border-pri mt-2 bg-white2">
                                    <hr className="text-cream2 mt-4"/>
                                </div>
                                <p className="text-lightgrey mt-2 text-sm">You have no meeting in the future. <Link to="/dashboard/discover-groups" className="text-blue">Join a group</Link></p>
                            </div>
                    </div>
                }
                {/* Other Group*/}
                <div className="mt-10 md:mt-0 max-w-md">
                    <OtherGroups/>
                </div>
            </div>
        </div>
    )
}

export default Home
