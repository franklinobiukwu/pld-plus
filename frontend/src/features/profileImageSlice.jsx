import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    profileImage: null
}

const profileImageSlice = createSlice( {
    name: "profile image",
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.profileImage = action.payload
        }
    }
})

export const { setImage } = profileImageSlice.actions
export default profileImageSlice.reducer
