import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchProduct, postProduct, postProductAttributes, type SaveProductAttributesArgs} from "@/ducks/product/api.ts";
import type {ProductMaster} from "chums-types";
import type {RootState} from "@/app/configureStore.ts";
import {selectCurrentProductStatus} from "@/ducks/product/currentProductSlice.ts";

export const loadProduct = createAsyncThunk<ProductMaster|null, number|string, {state:RootState}>(
    'products/current/load',
    async (arg) => {
        if (!arg) {
            return null;
        }
        return await fetchProduct(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg && selectCurrentProductStatus(state) === 'idle';
        }
    }
)

export const saveProduct = createAsyncThunk<ProductMaster|null, ProductMaster, {state:RootState}>(
    'products/current/save',
    async (arg) => {
        return await postProduct(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCurrentProductStatus(state) === 'idle';
        }
    }
);

export const saveProductAttributes = createAsyncThunk<ProductMaster|null,  SaveProductAttributesArgs, {state:RootState}>(
    'products/current/saveAttributes',
    async (arg) => {
        return await postProductAttributes(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCurrentProductStatus(state) === 'idle';
        }
    }
)
