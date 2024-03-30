import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    schedules: []
}

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setSchedule: (state, action) => {
            state.schedules = [...action.payload]
        },
        addSchedule: (state, action) => {
            state.schedules = [...state.schedules, action.payload]
        },
        deleteSchedule: (state, action) => {
            const deletedScheduleId = action.payload
            state.schedules = state.schedules.filter(schedule => schedule.id != deletedScheduleId)
        }
    }
})

export const { setSchedule, addSchedule, deleteSchedule } = scheduleSlice.actions
export default scheduleSlice.reducer
