import { useLoaderData } from "react-router-dom"
import AccountInfo from "../../components/Dashboard-components/AccountInfo.jsx";
import ProfileInfo from "../../components/Dashboard-components/ProfileInfo.jsx"


const Profile = () => {
    const users = useLoaderData()
    const user = users[1]


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

export const loadUsers = async() => {
    const endpoint = `${import.meta.env.VITE_BASE_API}/users`
    const res = await fetch(endpoint) 

    const data = await res.json()
    return data
}
