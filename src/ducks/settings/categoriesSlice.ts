import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import type {CategoryRecord} from "chums-types/production";
import {loadSettings} from "@/ducks/settings/actions.ts";

const adapter = createEntityAdapter<CategoryRecord, string>({
    selectId: arg => arg.code,
    sortComparer: (a, b) => a.code.localeCompare(b.code)
})

const selectors = adapter.getSelectors();

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.categories ?? []);
            })
    },
    selectors: {
        selectCategories: (state) => selectors.selectAll(state),
    }
})

export default categoriesSlice;
export const {selectCategories} = categoriesSlice.selectors;
