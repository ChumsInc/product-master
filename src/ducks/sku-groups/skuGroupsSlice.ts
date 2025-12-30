import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loadSettings} from "@/ducks/settings/actions.ts";
import type {SKUGroup, SortProps} from "chums-types";
import {loadSkuGroup, loadSkuGroups, saveSkuGroup} from "@/ducks/sku-groups/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";
import {skuGroupSorter} from "@/ducks/settings/utils.ts";

interface SKUGroupsState {
    current: SKUGroup | null;
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    showInactive: boolean;
    search: string;
    sort: SortProps<SKUGroup>
}

const extraState: SKUGroupsState = {
    current: null,
    status: 'idle',
    showInactive: false,
    search: '',
    sort: {field: 'code', ascending: true}
};
const adapter = createEntityAdapter<SKUGroup, string>({
    selectId: arg => arg.code,
    sortComparer: (a, b) => a.code.localeCompare(b.code)
})

const selectors = adapter.getSelectors();

const skuGroupsSlice = createSlice({
    name: 'skuGroups',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setShowInactiveSKUGroups: (state, action: PayloadAction<boolean>) => {
            state.showInactive = action.payload;
        },
        setCurrentSKUGroup: (state, action: PayloadAction<SKUGroup | null>) => {
            state.current = action.payload;
        },
        setSKUGroupSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSKUGroupSort: (state, action: PayloadAction<SortProps<SKUGroup>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.skuGroups ?? []);
            })
            .addCase(loadSkuGroups.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadSkuGroups.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
            })
            .addCase(loadSkuGroups.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadSkuGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSkuGroup.fulfilled, (state, action) => {
                state.current = action.payload;
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(loadSkuGroup.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveSkuGroup.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveSkuGroup.fulfilled, (state, action) => {
                state.status = 'idle'
                state.current = action.payload;
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(saveSkuGroup.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('skuGroups/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectSKUGroups: (state) => selectors.selectAll(state),
        selectCurrentSKUGroup: (state) => state.current ?? null,
        selectSKUGroupsStatus: (state) => state.status,
        selectSKUGroupsShowInactive: (state) => state.showInactive,
        selectSKUGroupSearch: (state) => state.search,
        selectSKUGroupSort: (state) => state.sort,
    }
})

export default skuGroupsSlice;
export const {
    selectSKUGroups,
    selectSKUGroupSearch,
    selectSKUGroupsShowInactive,
    selectSKUGroupSort,
    selectSKUGroupsStatus,
    selectCurrentSKUGroup
} = skuGroupsSlice.selectors;
export const {
    setShowInactiveSKUGroups,
    setCurrentSKUGroup,
    setSKUGroupSort,
    setSKUGroupSearch,
} = skuGroupsSlice.actions;

export const selectFilteredSKUGroups = createSelector(
    [selectSKUGroups, selectSKUGroupSearch, selectSKUGroupsShowInactive, selectSKUGroupSort],
    (list, search, showInactive, sort) => {
        return list.filter(g => g.code.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase()))
            .filter(g => showInactive || g.active)
            .sort(skuGroupSorter(sort))
    }
)
