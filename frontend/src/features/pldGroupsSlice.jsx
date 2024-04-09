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
        addMemberDetails: (state, action) => {
            const pldGroupId = action.payload.pld_group_id
            const userDetails = action.payload.user_details
            state.pldGroups = state.pldGroups.map(group => {
                if (group.id === pldGroupId){
                    group.members_details=[...group.members_details, userDetails]
                }
                return group
            })
        },
        deleteMemberDetails: (state, action) => {
            const pldGroupId = action.payload.pld_group_id
            const userEmail = action.payload.user_email
            state.pldGroups = state.pldGroups.map(group => {
                if (group.id === pldGroupId){
                    group.members_details = group.members_details.filter(member => member.email !== userEmail)
                }
                return group
            })
        },
    }
})

export const {setGroups, addMember, deleteMember, addMemberDetails, deleteMemberDetails } = pldGroupsSlice.actions
export default pldGroupsSlice.reducer
