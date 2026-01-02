import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BaseSKU, SortProps} from "chums-types";
import {loadBaseSkuList} from "@/ducks/base-sku/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";
import {baseSkuSorter} from "@/ducks/base-sku/utils.ts";

const adapter = createEntityAdapter<BaseSKU, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id
})

const selectors = adapter.getSelectors();

export interface BaseSkuState {
    status: 'idle' | 'loading' | 'rejected';
    skuGroupId: number | null;
    current: BaseSKU | null;
    showInactive: boolean;
    search: string;
    sort: SortProps<BaseSKU>;
}

const extraState: BaseSkuState = {
    status: 'idle',
    skuGroupId: null,
    current: null,
    showInactive: false,
    search: '',
    sort: {field: "sku", ascending: true}
};

const baseSkuSlice = createSlice({
    name: 'baseSku',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setCurrentBaseSKU: (state, action: PayloadAction<BaseSKU | null>) => {
            state.current = action.payload;
        },
        setBaseSKUSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setShowInactiveBaseSKUs: (state, action: PayloadAction<boolean>) => {
            state.showInactive = action.payload;
        },
        setBaseSKUSort: (state, action: PayloadAction<SortProps<BaseSKU>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBaseSkuList.pending, (state, action) => {
                state.status = 'loading'
                if (action.meta.arg.idSkuGroup && state.skuGroupId !== action.meta.arg.idSkuGroup) {
                    adapter.removeAll(state);
                    state.skuGroupId = action.meta.arg.idSkuGroup ? +action.meta.arg.idSkuGroup : null;
                }
            })
            .addCase(loadBaseSkuList.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
            })
            .addCase(loadBaseSkuList.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('baseSku/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectBaseSKUs: (state) => selectors.selectAll(state),
        selectCurrentBaseSKU: (state) => state.current ?? null,
        selectBaseSKUsStatus: (state) => state.status,
        selectBaseSKUSearch: (state) => state.search,
        selectShowInactiveBaseSKUs: (state) => state.showInactive,
        selectBaseSKUSort: (state) => state.sort,
        selectSkuGroupId: (state) => state.skuGroupId,
    }
});

export default baseSkuSlice;
export const {
    selectBaseSKUs,
    selectCurrentBaseSKU,
    selectBaseSKUsStatus,
    selectBaseSKUSearch,
    selectShowInactiveBaseSKUs,
    selectBaseSKUSort,
    selectSkuGroupId
} = baseSkuSlice.selectors;
export const {
    setCurrentBaseSKU,
    setBaseSKUSearch,
    setShowInactiveBaseSKUs,
    setBaseSKUSort
} = baseSkuSlice.actions;

export const selectFilteredBaseSKUs = createSelector(
    [selectBaseSKUs, selectBaseSKUSearch, selectShowInactiveBaseSKUs, selectBaseSKUSort],
    (list, search, showInactive, sort) => {
        return list
            .filter(s => s.sku.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
            .filter(s => showInactive || s.active)
            .sort(baseSkuSorter(sort))
    }
)
