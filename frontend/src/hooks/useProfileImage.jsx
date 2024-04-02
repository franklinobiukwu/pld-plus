import { useState } from "react"
import useDispatchUser from "./useDispatchUser"
import { useDispatch } from "react-redux"
import { setImage } from "../features/profileImageSlice.jsx";

const useProfileImage = () => {
    const [profileImage, setProfileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const {user} = useDispatchUser()
    const dispatch = useDispatch()

    if (!user){
        return {profileImage: null, loading: null, fetchProfileImage:null}
    }
    const endpoint = `${import.meta.env.VITE_BASE_API}/dashboard/profile/img/${user.user_image}`

    const fetchProfileImage = async() => {
        setLoading(true)
        try{
            const response = await fetch(endpoint, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })

            if (!response.ok){
                const data = await response.text() // Read response as text
                setLoading(false)
                throw new Error(`Couldn't load profile picture: ${data}`)
            }

            const contentType = response.headers.get("content-type")
            if (contentType && contentType.startsWith("image")){
                // If the response is an image, set the profile image directly
                const blob = await response.blob()
                setProfileImage(URL.createObjectURL(blob))
                dispatch(setImage(URL.createObjectURL(blob)))
            } else {
                // If the response is JSON, parse it and set the profile image
                const imageData = await response.json()
                setProfileImage(imageData)
                dispatch(setProfileImage(imageData))
            }
            setLoading(false)
        } catch (error) {
            console.error(error.message)
        }
    }

    return { profileImage, loading, fetchProfileImage }
}
export default useProfileImage
