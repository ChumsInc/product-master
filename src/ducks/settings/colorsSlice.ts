import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";
import type {ProductColor} from "chums-types";

const adapter = createEntityAdapter<ProductColor, string>({
    selectId: arg => arg.code,
    sortComparer: (a, b) => a.code.localeCompare(b.code)
})

const selectors = adapter.getSelectors();

const colorsSlice = createSlice({
    name: 'colors',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.colors ?? []);
            })
    },
    selectors: {
        selectColorsList: (state) => selectors.selectAll(state),
    }
})

export default colorsSlice;
export const {selectColorsList} = colorsSlice.selectors;
