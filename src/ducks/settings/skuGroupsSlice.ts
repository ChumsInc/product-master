import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";
import type {SKUGroup} from "chums-types";

const adapter = createEntityAdapter<SKUGroup, string>({
    selectId: arg => arg.code,
    sortComparer: (a, b) => a.code.localeCompare(b.code)
})

const selectors = adapter.getSelectors();

const skuGroupsSlice = createSlice({
    name: 'skuGroups',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.skuGroups ?? []);
            })
    },
    selectors: {
        selectSKUGroups: (state) => selectors.selectAll(state),
    }
})

export default skuGroupsSlice;
export const {selectSKUGroups} = skuGroupsSlice.selectors;
