import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import type {BaseSKURecord} from "chums-types/production";
import {loadSettings} from "@/ducks/settings/actions.ts";

const adapter = createEntityAdapter<BaseSKURecord, string>({
    selectId: arg => arg.Category4,
    sortComparer: (a, b) => a.Category4.localeCompare(b.Category4)
})

const selectors = adapter.getSelectors();

const baseSKUListSlice = createSlice({
    name: 'baseSKU',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.skuList ?? []);
            })
    },
    selectors: {
        selectBaseSKUList: (state) => selectors.selectAll(state),
    }
})

export default baseSKUListSlice;
export const {selectBaseSKUList} = baseSKUListSlice.selectors;
