import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchBaseSkuList, type FetchBaseSkuListProps} from "@/ducks/base-sku/api.ts";
import type {BaseSKU} from "chums-types";
import type {RootState} from "@/app/configureStore.ts";
import {selectBaseSKUsStatus} from "@/ducks/base-sku/baseSkuSlice.ts";

export const loadBaseSkuList = createAsyncThunk<BaseSKU[], FetchBaseSkuListProps, {state:RootState}>(
    'baseSku/loadList',
    async (arg) => {
        return await fetchBaseSkuList(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectBaseSKUsStatus(state) === 'idle';
        }
    }
)
