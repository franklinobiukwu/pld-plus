import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import scheduleReducer from "../features/scheduleSlice"
import pldGroupsReducer from "../features/pldGroupsSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        schedules: scheduleReducer,
        pldGroups: pldGroupsReducer
    },
})

export default store
