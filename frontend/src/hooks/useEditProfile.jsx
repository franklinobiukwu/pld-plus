import { useDispatch } from "react-redux"
import useDispatchUser from "./useDispatchUser"
import { loginState } from "../features/userSlice"

const useEditProfile = () => {

    const { user } = useDispatchUser()
    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/profile/edit-profile`
    const dispatch = useDispatch()

    const editProfile = async (details, setLoading) => {
        setLoading(true)
        try{
            const response = await fetch(endpoint, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                "body": JSON.stringify(details)
            })

            if (!response.ok){
                setLoading(false)
                const error = await response.json()
                throw new Error(`Couldn't update profile: ${error.message}`)
            }

            const data = await response.json()
            setLoading(false)
            console.log("Been dispatched", data.user)
            const newUser = {...user, ...data.user}
            console.log(newUser)
            localStorage.setItem("user", JSON.stringify(newUser))
            dispatch(loginState(newUser))
        } catch(error){
            console.error(error.message)
        }

        return newUser
    }


    return {editProfile}
}

export default useEditProfile
