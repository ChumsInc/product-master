import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";
import type {ProductMixInfo} from "chums-types";

const adapter = createEntityAdapter<ProductMixInfo, number>({
    selectId: arg => arg.id,
    sortComparer: (a, b) => a.id - b.id
})

const selectors = adapter.getSelectors();

const mixesSlice = createSlice({
    name: 'mixes',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.colors ?? []);
            })
    },
    selectors: {
        selectMixesList: (state) => selectors.selectAll(state),
    }
})

export default mixesSlice;
export const {selectMixesList} = mixesSlice.selectors;
