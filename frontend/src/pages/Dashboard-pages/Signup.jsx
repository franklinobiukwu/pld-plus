import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginState } from "../../features/userSlice"
import { useNavigate } from "react-router-dom"
import { TailSpin } from "react-loader-spinner"

const Signup = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [cohort, setCohort] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
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
            "gender": gender,
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
                    setError(data.error)
                    throw new Error("Sorry, couldn't register you:", data.error)
                }

                const data = await response.json()
                const user = data.user
                user['token'] = data.token
                // Store user in local storage
                console.log("Registered user", user)
                localStorage.setItem("user", JSON.stringify(user))
                // update global user
                dispatch(loginState(user))
                setLoading(false)
                navigate("/dashboard")
            } catch (error){
                console.error(error.message)
            }
        }

        registerUser()

        console.log(formData)
    }

    const formInputStyle = `border border-cream2 rounded-md px-2 w-full focus:border-cream focus:outline-none focus:ring-blue text-lightgrey py-1`
    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
                <div className="shadow-md rounded-md w-10/12 md:w-7/12 max-w-md flex flex-col justify-center items-center py-10 bg-gradient-to-b from-white2 to-white ">
                    <h1 className="font-medium text-pri text-2xl">Sign up</h1>
                    <form className="w-[80%] mt-10" onSubmit={handleSubmit}>
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
                                    className={formInputStyle}
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
                                    className={`${formInputStyle}`}
                                />
                            </div>
                        </div>
                        {/* Gender */}
                        <div>
                            <div className={genInputStyle}>
                                <div>
                                    {/* Face Avater*/}
                                </div>
                                <select
                                    type="text" 
                                    name="gender"
                                    placeholder="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={`w-full ${formInputStyle}`}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                
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
                                    className={`${formInputStyle}`}
                                />
                            </div>
                            {/* Username */}
                            <div className={genInputStyle}>
                                <div>
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={`${formInputStyle}`}
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
                                className={`${formInputStyle}`}
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
                                        className={`${formInputStyle}`}
                                    />
                                </div>
                                {/* Confirm Password*/}
                                <div className={genInputStyle}>
                                    <div>
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        placeholder="Confirm Password"
                                        value={password}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`${formInputStyle}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button*/}
                        <div>
                            <button
                                type="submit"
                                className={`${loading && "bg-[#0000ff91]"} bg-blue w-full py-2 rounded-md text-white font-medium mt-10 flex justify-center items-center`}
                            >
                                {loading? (<TailSpin
                                            visible={true}
                                            height="20"
                                            width="20"
                                            color="#ffffff"
                                            ariaLabel="tail-spin-loading"
                                            radius="1"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            />) : "Registar"

                                }
                            </button>
                        </div>
                        <div className="text-red text-center text-sm bg-[#ffbdbdb5] mt-4 rounded-sm">{error && error}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup
