import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pldGroups: []
}

const pldGroupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.pldGroups = action.payload
        },
        addMember: (state, action) => {
            const pldGroupId = action.payload.pld_group_id
            const userId = action.payload.user_id
            state.pldGroups = state.pldGroups.map(group => {
                if (group.id === pldGroupId){
                    group.member_count += 1
                    group.members_id.push(userId)
                }
                return group
            })
        },
        deleteMember: (state, action) => {
            const userId = action.payload.user_id
            const pldGroupId = action.payload.pld_group_id
            state.pldGroups = state.pldGroups.map(group => {
               if (group.id === pldGroupId){
                    group.member_count -= 1
                    group.members_id = group.members_id.filter(id => id !== userId)
               } 

                return group
            })
        },
    }
})

export const {setGroups, addMember, deleteMember } = pldGroupsSlice.actions
export default pldGroupsSlice.reducer
