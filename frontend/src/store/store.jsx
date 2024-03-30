import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import scheduleReducer from "../features/scheduleSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        schedules: scheduleReducer,
    },
})

export default store
