import { useSelector } from "react-redux";
import Greet from "../../components/Dashboard-components/Greet"
import GroupMembers from "../../components/Dashboard-components/GroupMembers.jsx";
import OtherGroups from "../../components/Dashboard-components/OtherGroups.jsx";
import QuickActions from "../../components/Dashboard-components/QuickActions.jsx";
import UpcomingCard from "../../components/Dashboard-components/Upcoming"
import useDispatchUser from "../../hooks/useDispatchUser.jsx";

const Home = () => {
    const groups = useSelector(state => state.pldGroups.pldGroups)
    const {user} = useDispatchUser()

    const myGroups = groups.filter((group) => {
        if (group.members_id.includes(user.id)) return group
    })

    console.log("My groups: ", myGroups)
    // Convert datetime string to date object
    const newMyGroups = myGroups.map(group => ({
        ...group,
            datetime: new Date(group.datetime)
    }))
    // Sort the array based on the differences between dates and today's date
    newMyGroups.sort((a, b) => {
        const dateA = Math.abs(a.datetime - new Date())
        const dateB = Math.abs(b.datetime - new Date())
        return dateA - dateB
    })

    console.log("Sorted groups: ", myGroups)


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
                <div className="flex-grow max-w-md">
                    <GroupMembers group={newMyGroups[0]}/>
                </div>
                {/* Other Group*/}
                <div className="mt-10 md:mt-0 max-w-md">
                    <OtherGroups/>
                </div>
            </div>
        </div>
    )
}

export default Home
