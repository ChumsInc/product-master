import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchProductList} from "@/ducks/productList/api.ts";
import type {ProductMaster} from "chums-types";
import type {RootState} from "@/app/configureStore.ts";
import {selectProductListStatus} from "@/ducks/productList/productListSlice.ts";

export const loadProductList = createAsyncThunk<ProductMaster[], void, { state: RootState }>(
    'products/list/load',
    async () => {
        return await fetchProductList();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectProductListStatus(state) === 'idle';
        }
    }
)

