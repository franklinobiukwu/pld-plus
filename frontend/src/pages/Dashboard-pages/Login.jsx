import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaEnvelope, FaLock } from "react-icons/fa6";
import useLogin from "../../hooks/useLogin";
import { TailSpin } from "react-loader-spinner";
import ErrorCard from "../../components/ErrorCard.jsx";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    // login hook
    const {login, isLoading, error} = useLogin()
    const [displayError, setDisplayError] = useState(false)

    const [validEmail, setValidEmail] = useState(false)

    // Get online status: Know if user is online or not
    const isOnline = navigator.onLine
    console.log("Am I online?", isOnline)

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        console.log(`This is the ${error.toString()}`)
        console.log(`This is the ${error}`)
        setDisplayError(true)
    }, [error])

    const handleSubmit = (e) => {
        console.log(email, password)
        e.preventDefault()
        login(email, password)
    }
    
    return (
        <div className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
            <div 
                className="shadow-md rounded-md w-10/12 md:w-7/12 max-w-md flex flex-col
        justify-center items-center py-10 bg-gradient-to-b from-white2 to-white"
            >
                <h1 className="font-medium text-pri text-2xl">Login</h1>
                <form
                    className="w-[80%] mt-10"
                    onSubmit={handleSubmit}
                >
                    {/* Email */}
                    <div
                        className="flex items-center rounded-md overflow-hidden"
                    >
                        <div>
                            <FaEnvelope/> 
                        </div>
                        <input
                            placeholder="Email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-2 py-1 w-full"
                        />
                    </div>

                    {/* Password */}
                    <div
                        className="flex items-center rounded-md overflow-hidden"
                    >
                        <div>
                            <FaLock/>
                        </div>
                        <input
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className=" px-2 py-1 w-full mt-4 rounded-md"
                        />
                    </div>
                    {/* Remember me */}
                    <div className="flex justify-between mt-4 flex-col md:flex-row">
                        <div className="flex">
                            <input
                                name="rememberme"
                                id="rememberme"
                                type="checkbox"
                                className="mr-2"
                            />
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <Link to="reset" className="underline text-blue mt-1 md:mt-0">Forgot Password?</Link>
                    </div>
                    {/* Submit Button*/}
                    <button
                        type="submit"
                        className={`${isLoading? "bg-[#0000ff91]" : "bg-blue"} px-4 py-2 font-medium text-white
                                rounded-md w-full mt-10 flex justify-center items-center`}
                        disabled={isLoading}
                    >
                        { isLoading? (<TailSpin
                                        visible={true}
                                        height="20"
                                        width="20"
                                        color="#ffffff"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        />) : "Login"}
                    </button>
                    <div className="mt-2">
                        {error &&
                            displayError &&
                            <ErrorCard 
                                message={isOnline?`${error}`:"Please connect to the internet"}
                                setDisplayError={setDisplayError}
                                error={error}
                            />
                        }
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <div className="mt-6 text-center">or</div>
                        <Link to="/signup" className="underline text-blue">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login
