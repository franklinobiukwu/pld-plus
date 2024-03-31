import { useLoaderData } from "react-router-dom"
import AccountInfo from "../../components/Dashboard-components/AccountInfo.jsx";
import ProfileInfo from "../../components/Dashboard-components/ProfileInfo.jsx"
import useDispatchUser from "../../hooks/useDispatchUser.jsx";


const Profile = () => {
    const {user} = useDispatchUser()


    return (
        <div className="flex justify-center flex-col items-center">
            {/* Profile*/}
            <div className="w-full">
                <ProfileInfo user={user}/>
            </div>

            {/* Account Information */}
            <div className="w-[90%]">
                <AccountInfo user={user} />
            </div>
        
        </div>
    )
}

export default Profile
