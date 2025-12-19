import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {ProductLineRecord} from "chums-types/production";
import {loadSettings} from "@/ducks/settings/actions.ts";
import {productLineSorter} from "@/ducks/settings/utils.ts";

const adapter = createEntityAdapter<ProductLineRecord, string>({
    selectId: arg => arg.ProductLine,
    sortComparer: (a, b) => a.ProductLineDesc.localeCompare(b.ProductLineDesc)
})

const selectors = adapter.getSelectors();

const productLinesSlice = createSlice({
    name: 'productLines',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.productLines ?? []);
            })
    },
    selectors: {
        selectProductLines: (state) => selectors.selectAll(state),
    }
})

export default productLinesSlice;
export const {selectProductLines} = productLinesSlice.selectors;
export const selectSortedProductLines = createSelector(
    [selectProductLines],
    (list) => {
        return [...list].sort(productLineSorter)
    }
)
