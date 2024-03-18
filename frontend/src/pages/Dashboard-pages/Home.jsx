import Greet from "../../components/Dashboard-components/Greet"
import GroupMembers from "../../components/Dashboard-components/GroupMembers.jsx";
import OtherGroups from "../../components/Dashboard-components/OtherGroups.jsx";
import QuickActions from "../../components/Dashboard-components/QuickActions.jsx";
import UpcomingCard from "../../components/Dashboard-components/Upcoming"

const Home = () => {
    return (
        <div>
            <Greet/>
            <UpcomingCard/>
            <QuickActions/>
            <GroupMembers/>
            <OtherGroups/>
        </div>
    )
}

export default Home
