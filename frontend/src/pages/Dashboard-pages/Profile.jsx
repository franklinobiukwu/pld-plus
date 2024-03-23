import { Form, Link, useLoaderData } from "react-router-dom"
import ProfileImg from "../../images/girl.png"
import ProfileBg from "../../images/pld-plud-profile-bg.png"
import { useState } from "react"
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [cohort, setCohort] = useState("")
    const [email, setEmail] = useState("")
    const [socials, setSocials] = useState({})

    const users = useLoaderData()
    const user = users[0]

    const backgroundStyle = {
        backgroundImage: `url(${ProfileBg})`
    }

    return (
        <div className="flex justify-center flex-col items-center">
            <div
                className="w-full h-60 bg-cover"
                style={backgroundStyle}
            ></div>

            {/* Profile*/}
            <div
                className="bg-white2 relative shadow-md rounded-md mt-[-5%]
                            w-[90%] px-10 py-5">
                <div>
                    <div className="w-32 h-32 rounded-full overflow-hidden absolute mt-[-8%]">
                        <img src={ProfileImg} alt="profile-photo"/>
                    </div>
                    <div className="ml-36">
                        <h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                        <h4 className="text-md text-grey">{`@${user.username}`}</h4>
                        <span className="text-sm text-grey">{`Cohort ${user.cohort}`}</span>
                    </div>
                </div>

                 <Link className="flex justify-end mt-10">
                    <button
                        className="px-4 py-1 bg-gradient-to-t bg-blue rounded-md
                                font-medium text-white flex items-center">
                         <FaEdit className="mr-2"/>
                        Edit
                    </button>
                </Link>
            </div>
            {/* Account Information */}
            <div className="shadow-md rounded-md bg-white2 mt-10 w-[90%] px-10 py-5">
                <h3>Account Information</h3>
                <Form>
                    <label htmlFor="email">Email</label><br/>
                    <input
                        name="email"
                        id="email"
                        value={email?email:user.email}
                    />
                </Form>
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
