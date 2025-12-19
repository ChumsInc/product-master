import {createSlice} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";

export interface SettingsState {
    status: 'idle' | 'loading' | 'rejected';
}

const initialState: SettingsState = {status: 'idle'};

const settingsStatusSlice = createSlice({
    name: 'settings-status',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSettings.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(loadSettings.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadSettings.typePrefix) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectSettingsStatus: (state) => state.status,
    }
})

export default settingsStatusSlice;
export const {selectSettingsStatus} = settingsStatusSlice.selectors;
