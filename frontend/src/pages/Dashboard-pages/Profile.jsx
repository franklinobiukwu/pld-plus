import { Form, Link, useLoaderData } from "react-router-dom"
import ProfileImg from "../../images/girl.png"
import ProfileBg from "../../images/pld-plud-profile-bg.png"
import { useState } from "react"
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";


const Profile = () => {
    const users = useLoaderData()
    const user = users[0]

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [cohort, setCohort] = useState("")
    const [email, setEmail] = useState(user.email)
    const [socials, setSocials] = useState({})
    const [accountEdit, setAccountEdit] = useState(false)

    {/* Button Function Handlers */}
    const handleAccountEdit = () => {
        setAccountEdit(true)
    }
    const handleAccountCancel = () => {
        setAccountEdit(false)
    }
    const handleAccountSave = () => {
        setAccountEdit(false)
    }

    const backgroundStyle = {
        backgroundImage: `url(${ProfileBg})`
    }

    const btnStyle = `px-4 py-1 bg-gradient-to-t rounded-md font-medium text-white flex items-center`

    return (
        <div className="flex justify-center flex-col items-center">
            <div
                className="w-full h-60 bg-cover rounded-md"
                style={backgroundStyle}
            ></div>

            {/* Profile*/}
            <div
                className="flex flex-col justify-center items-center bg-white2 
                            relative shadow-md rounded-md mt-[-25%] md:mt-[-5%] md:w-[90%] px-10 py-5 md:block"
            >
                <div className="flex items-center justify-center md:block">
                    <div 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden
                            absolute  top-0 mt-[-23%] md:mt-[-8%]">
                        <img src={ProfileImg} alt="profile-photo"/>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-8 md:ml-36 md:mt-0 md:block">
                        <h2 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                        <h4 className="text-md text-grey">{`@${user.username}`}</h4>
                        <span className="text-sm text-grey">{`Cohort ${user.cohort}`}</span>
                    </div>
                </div>

                 <Link className="flex justify-end mt-5 md:mt-10">
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
                <h3 className="text-lg font-semibold">Account Information</h3>
                <hr className="border-cream2"/>
                <Form className="mt-5 w-full">
                    <label htmlFor="email" className="font-medium">Email</label><br/>
                    <div className="flex items-center justify-center">
                        <input
                            name="email"
                            id="email"
                            value={email}
                            className="w-full rounded-md px-2"
                            disabled={accountEdit? "": "disabled"}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        {accountEdit?"":
                            <FaCircleCheck className={"text-green"}/>
                        }
                    </div>
                </Form>

                {/* Buttons */}
                 <div className="flex justify-end mt-5 md:mt-10">

                    {accountEdit?(
                        <div className="flex">
                             <button
                                className={`${btnStyle} bg-red mr-4`}
                                onClick={() => handleAccountCancel()}
                             >
                                <span className="flex justify-center items-center">
                                    <IoCheckmarkDoneCircle className="mr-2"/>
                                    <span>Cancel</span>
                                </span>
                            </button>

                            <button
                                className={`${btnStyle} bg-whiten border-2 border-grey`}
                                onClick={() => handleAccountSave()}
                            >
                                <span className="flex justify-center items-center text-grey">
                                    <IoCheckmarkDoneCircle className="mr-2"/>
                                    <span>Save</span>
                                </span>
                            </button>
                        </div>
                        ):(
                        <button
                            className={`${btnStyle} bg-blue`}
                            onClick={() => handleAccountEdit()}
                        >
                            <span className="flex items-center justify-center">
                                <FaEdit className="mr-2"/>
                                <span>Edit</span>
                            </span>
                        </button>
                        )}
                </div>
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
