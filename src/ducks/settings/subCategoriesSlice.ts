import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";
import type {CollectionRecord} from "chums-types/production";

const adapter = createEntityAdapter<CollectionRecord, string>({
    selectId: arg => arg.Category3,
    sortComparer: (a, b) => a.Category3.localeCompare(b.Category3)
})

const selectors = adapter.getSelectors();

const subCategoriesSlice = createSlice({
    name: 'subCategories',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.collections ?? []);
            })
    },
    selectors: {
        selectSubCategories: (state) => selectors.selectAll(state),
    }
})

export default subCategoriesSlice;
export const {selectSubCategories} = subCategoriesSlice.selectors;
