import type {ProductMaster} from "chums-types";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loadProductList} from "@/ducks/productList/actions.ts";
import {loadProduct, saveProduct, saveProductAttributes} from "@/ducks/product/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";

export interface CurrentProductState {
    product: ProductMaster | null;
    status: 'idle' | 'loading' | 'saving' | 'rejected';
}

const initialState: CurrentProductState = {
    product: null,
    status: 'idle'
};

const productSlice = createSlice({
    name: 'products/current',
    initialState: initialState,
    reducers: {
        setCurrentProduct: (state, action: PayloadAction<ProductMaster | null>) => {
            state.product = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProduct.pending, (state, action) => {
                state.status = 'loading';
                if (action.meta.arg !== state.product?.id) {
                    state.product = null;
                }
            })
            .addCase(loadProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.product = action.payload;
            })
            .addCase(loadProduct.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveProduct.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.product = action.payload;
            })
            .addCase(saveProduct.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveProductAttributes.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveProductAttributes.fulfilled, (state, action) => {
                state.status = 'idle';
                state.product = action.payload;
            })
            .addCase(saveProductAttributes.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadProductList.fulfilled, (state, action) => {
                if (state.product) {
                    const updated = action.payload.find(p => p.id === state.product!.id);
                    state.product = updated ?? null;
                }
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('products/current/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectCurrentProduct: (state) => state.product,
        selectCurrentProductStatus: (state) => state.status,

    }
})
export default productSlice;

export const {setCurrentProduct} = productSlice.actions;
export const {selectCurrentProduct, selectCurrentProductStatus} = productSlice.selectors;
