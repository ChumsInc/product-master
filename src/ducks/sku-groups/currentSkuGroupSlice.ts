import type {SKUGroup} from "chums-types";
import {createSlice} from "@reduxjs/toolkit";
import {loadSkuGroup, loadSkuGroups, saveSkuGroup} from "@/ducks/sku-groups/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";

interface SKUGroupsState {
    current: SKUGroup | null;
    status: 'idle' | 'loading' | 'saving' | 'rejected';
}

const initialState: SKUGroupsState = {
    current: null,
    status: 'idle',
};

const currentSkuGroupSlice = createSlice({
    name: 'skuGroups/current',
    initialState: initialState,
    reducers: {
        setCurrentSKUGroup: (state, action) => {
            state.current = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadSkuGroups.fulfilled, (state, action) => {
                if (state.current) {
                    const current = action.payload.find(sg => sg.id === state.current!.id);
                    state.current = current ?? null;
                }
            })
            .addCase(loadSkuGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSkuGroup.fulfilled, (state, action) => {
                state.status = 'idle';
                state.current = action.payload;
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
            })
            .addCase(saveSkuGroup.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('skuGroups/current/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectCurrentSKUGroup: (state) => state.current ?? null,
        selectCurrentSKUGroupStatus: (state) => state.status,
    }
});

export default currentSkuGroupSlice;
export const {
    setCurrentSKUGroup
} = currentSkuGroupSlice.actions;
export const {
    selectCurrentSKUGroup,
    selectCurrentSKUGroupStatus,
} = currentSkuGroupSlice.selectors
