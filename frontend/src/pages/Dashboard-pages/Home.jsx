import Greet from "../../components/Dashboard-components/Greet"
import GroupMembers from "../../components/Dashboard-components/GroupMembers.jsx";
import OtherGroups from "../../components/Dashboard-components/OtherGroups.jsx";
import QuickActions from "../../components/Dashboard-components/QuickActions.jsx";
import UpcomingCard from "../../components/Dashboard-components/Upcoming"

const Home = () => {
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
            <div className="lg:flex gap-x-4 col-start-1 col-end-13 mt-10">
                <div className="max-w-md">
                    <GroupMembers/>
                </div>
                {/* Other Group*/}
                <div className="max-w-md">
                    <OtherGroups/>
                </div>
            </div>
        </div>
    )
}

export default Home
