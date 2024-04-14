import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutState } from "../features/userSlice"
import { clearImage } from "../features/profileImageSlice.jsx";


const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logout = async () => {
        // remove user from storage
        localStorage.removeItem("user")
        // set global user variable to null
        dispatch(logoutState(null))
        // Clear profile image data from Redux store
        dispatch(clearImage)
        // logout user from backend
        const endpoint = `${import.meta.env.VITE_BASE_API}/auth/logout`
        const response = await fetch(endpoint)
        console.log(response)
        // navigate to home page
        navigate("/")
    }

    return {logout}
}

export default useLogout
