import { useDispatch, useSelector } from "react-redux"
import { loginState } from "../features/userSlice"

const useDispatchUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user.user)

    // Dispatch user to state if not in state
    const dispatchUser = () => {

        if (!userState){
            dispatch(loginState(user)) 
        }
    }

    return  { user, dispatchUser }
}

export default useDispatchUser
