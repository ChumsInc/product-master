import {createAsyncThunk} from "@reduxjs/toolkit";
import type {SKUGroup} from "chums-types";
import type {RootState} from "@/app/configureStore.ts";
import {fetchSkuGroup, fetchSkuGroups, postSkuGroup} from "@/ducks/sku-groups/api.ts";
import {selectSKUGroupsStatus} from "@/ducks/sku-groups/skuGroupsSlice.ts";

export const loadSkuGroup = createAsyncThunk<SKUGroup|null, string, {state:RootState}>(
    'skuGroups/loadGroup',
    async (arg) => {
        return await fetchSkuGroup(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg && selectSKUGroupsStatus(state) === 'idle';
        }
    }
)

export const saveSkuGroup = createAsyncThunk<SKUGroup|null, SKUGroup, {state:RootState}>(
    'skuGroups/saveGroup',
    async (arg) => {
        return await postSkuGroup(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectSKUGroupsStatus(state) === 'idle';
        }
    }
)

export const loadSkuGroups = createAsyncThunk<SKUGroup[], void, {state:RootState}>(
    'skuGroups/load',
    async () => {
        return await fetchSkuGroups()
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectSKUGroupsStatus(state) === 'idle';
        }
    }
)
