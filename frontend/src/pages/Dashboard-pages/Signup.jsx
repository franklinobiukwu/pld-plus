import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginState } from "../../features/userSlice"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [cohort, setCohort] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const genInputStyle = `rounded-md mt-4`

    const endpoint = `${import.meta.env.VITE_BASE_API}/auth/register`
//    console.log(endpoint)

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "username": username,
            "cohort": cohort,
            "password": password
        }
        
        const registerUser = async () => {
            try{
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })

                if (!response.ok){
                    setLoading(false)
                    const data = await response.json()
                    console.log(data)
                    throw new Error("Sorry, couldn't register you")
                }

                const data = await response.json()
                console.log(data)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch(loginState(data.user))
                setLoading(false)
                navigate("/dashboard")
            } catch (error){
                console.error(error.message)
            }
        }

        registerUser()

        console.log(formData)
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="shadow-md py-10 rounded-md max-w-lg ">
                    <form className="px-10" onSubmit={handleSubmit}>
                        {/* Names */}
                        <div>
                            {/* First Name */}
                            <div className={genInputStyle}>
                                <div>
                                {/* Face Avater */}
                                </div>
                                <input
                                    type="text" 
                                    name="firstname"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className={``}
                                />
                            </div>
                            {/* Last Name */}
                            <div className={genInputStyle}>
                                <div>
                                    {/* Face Avater*/}
                                </div>
                                <input
                                    type="text" 
                                    name="lastname"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    className={``}
                                />
                            </div>
                        </div>
                        {/* Email and Username*/}
                        <div>
                            {/* Email */}
                            <div className={genInputStyle}>
                                <div>
                                    {/* Envelop avata*/}
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Username */}
                            <div className={genInputStyle}>
                                <div>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Cohort */}
                        <div className={genInputStyle}>
                            <div>
                                {/* Cohort avatar*/}
                            </div>
                            <input
                                name="cohort"
                                type="number"
                                placeholder="Cohort e.g 17"
                                value={cohort}
                                onChange={(e) => setCohort(e.target.value)}
                            />
                        </div>
                        {/* Password and Confirm Password*/}
                        <div>
                            <div>
                                {/* Password */}
                                <div className={genInputStyle}>
                                    <div>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {/* Confirm Password*/}
                                <div className={genInputStyle}>
                                    <div>
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button*/}
                        <div>
                            <button
                                type="submit"
                                className="bg-green w-full py-2 rounded-md text-white font-medium"
                            >Registar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup
