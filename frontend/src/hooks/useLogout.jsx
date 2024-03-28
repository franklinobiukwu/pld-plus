import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutState } from "../features/userSlice"

const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const endpoint = `${import.meta.env.VITE_BASE_API}/auth/logout`

    const logout = async () => {
        // remove user from storage
        localStorage.removeItem("user")
        // set global user variable to null
        dispatch(logoutState(null))
        // logout user from backend
        const response = await fetch(endpoint)
        navigate("/")
    }

    return {logout}
}

export default useLogout
