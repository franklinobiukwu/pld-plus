import { useState } from "react"
import { FaCircleCheck } from "react-icons/fa6"
import { Form } from "react-router-dom"
import ProfileBtns from "./ProfileBtn.jsx";


const AccountInfo = (props) => {
    const user = props.user

    const [email, setEmail] = useState(user.email || "")
    const [socials, setSocials] = useState(user.socials || {})
    const [accountEdit, setAccountEdit] = useState(false)
    const [accountInfo, setAccountInfo] = useState({})

    const gatherAccountInfo = () => {
        setAccountInfo({"email":email, "socials":socials})
        console.log("Gathered Account Info", accountInfo)
    }


    const cancelAccountEdit = () => {
        setEmail(accountInfo["email"])
        setSocials(accountInfo["socials"])
    }


    return (
        <div>
            <div className="shadow-md rounded-md bg-white2 mt-10 w-full px-10 py-5">
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
                {/* Account Information Button */}
                <ProfileBtns
                    setFormEdit={setAccountEdit}
                    gather={gatherAccountInfo}
                    cancel={cancelAccountEdit}
                />
            </div>
        </div>
    )
}

export default AccountInfo
