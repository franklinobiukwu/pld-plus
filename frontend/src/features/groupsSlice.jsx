import { createSlice } from "@reduxjs/toolkit";
import scheduleSlice from "./scheduleSlice.jsx";

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (action, payload) => {
        },
        addGroup: (action, payload) => {
        },
        updateGroup: (action, payload) => {
        },
    }
})

export const {setGroup, addGroup, updateGroup } = groupsSlice.actions
export default groupsSlice.reducer
