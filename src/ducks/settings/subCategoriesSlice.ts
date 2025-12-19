import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";

const adapter = createEntityAdapter<string, string>({
    selectId: arg => arg,
    sortComparer: (a, b) => a.localeCompare(b)
})

const selectors = adapter.getSelectors();

const subCategoriesSlice = createSlice({
    name: 'subCategories',
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.subCategories ?? []);
            })
    },
    selectors: {
        selectSubCategories: (state) => selectors.selectAll(state),
    }
})

export default subCategoriesSlice;
export const {selectSubCategories} = subCategoriesSlice.selectors;
