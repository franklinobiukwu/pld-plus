import { useDispatch, useSelector } from "react-redux"
import { loginState } from "./userSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const RequireAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const location = useLocation()

    // Get user from redux store
    const userState = useSelector(state => state.user.user)

    // Dispatch user if not in store
    if (user && !userState){
        dispatch(loginState(user))
    }

    return (user?<Outlet/> : <Navigate to="/" state={{ from: location }} replace/>)
    
    
}
export default RequireAuth
