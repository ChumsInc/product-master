import {createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "@/app/configureStore.ts";
import {fetchUserRoles} from "@/ducks/user/api.ts";
import {selectUserStatus} from "@/ducks/user/userSlice.ts";

export const loadUserRoles = createAsyncThunk<string[], void, {state:RootState}>(
    'user/loadRoles',
    async () => {
        return fetchUserRoles();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectUserStatus(state) === 'idle';
        }
    }
)
