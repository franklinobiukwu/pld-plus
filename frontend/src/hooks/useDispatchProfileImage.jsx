import { useSelector } from "react-redux"

const useDispatchProfileImage = () => {
    const profileImage = useSelector(state => state.profileImage.profileImage)

    return profileImage
}

export default useDispatchProfileImage
