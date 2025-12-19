import {createSlice} from "@reduxjs/toolkit";
import {loadUserRoles} from "@/ducks/user/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";

export interface UserState {
    roles: string[];
    status: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
}

const initialState: UserState = {
    roles: [],
    status: 'idle',
    loaded: false
};

const editRoles = ['root', 'product-admin'];

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadUserRoles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserRoles.fulfilled, (state, action) => {
                state.status = 'idle';
                state.roles = action.payload;
                state.loaded = true;
            })
            .addCase(loadUserRoles.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadUserRoles.typePrefix) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectUserStatus: (state) => state.status,
        selectCanEdit: (state) => state.roles.some(role => editRoles.includes(role)),
        selectShouldLoadRoles: (state) => state.status === 'idle' && !state.loaded,
    }
})

export default userSlice;
export const {selectUserStatus, selectCanEdit} = userSlice.selectors;
