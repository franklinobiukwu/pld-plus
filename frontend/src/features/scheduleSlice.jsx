import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    schedules: [],
    schedulesInfo: null
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
        updateSchedule: (state, action) =>{
            const updatedSchedule = action.payload
            state.schedules = state.schedules.map(schedule => {
                return schedule.id === updatedSchedule.id?{...updatedSchedule} : schedule
            })
        },
        deleteSchedule: (state, action) => {
            const deletedScheduleId = action.payload
            state.schedules = state.schedules.filter(schedule => schedule.id != deletedScheduleId)
        },
        setScheduleInfo: (state, action) => {
            state.schedulesInfo = {...action.payload}
        }
    }
})

export const { setSchedule, addSchedule, updateSchedule, deleteSchedule, setScheduleInfo } = scheduleSlice.actions
export default scheduleSlice.reducer
