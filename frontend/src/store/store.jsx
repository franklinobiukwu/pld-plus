import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import scheduleReducer from "../features/scheduleSlice"
import pldGroupsReducer from "../features/pldGroupsSlice"
import profileImageReducer from "../features/profileImageSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        schedules: scheduleReducer,
        pldGroups: pldGroupsReducer,
        profileImage: profileImageReducer
    },
})

export default store
