import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginState: (state, action) => {
            console.log("Data to dispatch", action.payload)
            state.user = action.payload
        },
        logoutState: (state) => {
            state.user = null
        }
    }
})

export const { loginState, logoutState } = userSlice.actions
export default userSlice.reducer

