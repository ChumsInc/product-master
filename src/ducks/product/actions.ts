import {fetchProduct} from "../../api/product";
import {ThunkAction} from "redux-thunk";
import {AppDispatch, RootState} from "../../app/configureStore";
import {
    createNewProduct,
    loadProduct,
    loadProductPending,
    loadProductRejected,
    loadProductResolved,
    ProductAction, ProductPayload,
    updateProduct
} from "./actionTypes";
import {selectProductLoading} from "./selectors";
import {ProductMaster} from "chums-types";
import {selectTabById, TabState, updateTabsAction} from "chums-connected-components/dist/tabs";
import {appTabs, tabKey} from "../../app/AppTabs";
import {Tab} from "chums-components";
import {createAsyncThunk} from "@reduxjs/toolkit";
import app from "../../app/App";
import {NavTab} from "../../app/types";

interface ProductThunkAction extends ThunkAction<any, RootState, unknown, ProductAction> {
}

export const createNewProductAction = (): ProductAction => ({type: createNewProduct});

export const loadProductAction = createAsyncThunk(
    loadProduct,
    async (id:number, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as TabState<NavTab>;
            const product = await fetchProduct(id);
            const productTab = selectTabById<NavTab>(appTabs.product.id, tabKey)(state);
            thunkAPI.dispatch(updateTabsAction(tabKey, [{...productTab, to: `/product/${product.id}`, title: product.name}]))
            return {clearContext: loadProduct, product} as ProductPayload;
        } catch(error:unknown) {
            if (error instanceof Error) {
                console.log("()", error.message);
                return thunkAPI.rejectWithValue({error, context: loadProduct});
            }
            console.error("()", error);
        }
    }
)

export const _loadProductAction = (id: number): ProductThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            const loading = selectProductLoading(state);
            if (loading) {
                return;
            }
            dispatch({type: loadProductPending})
            const product = await fetchProduct(id);
            dispatch({type: loadProductResolved, payload: {clearContext: loadProduct, product}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("loadProductListAction()", error.message);
                return dispatch({type: loadProductRejected, payload: {error, context: loadProduct}})
            }
            console.error("loadProductListAction()", error);
        }
    }

export const updateProductAction = (props: Partial<ProductMaster>) => ({type: updateProduct, payload: {props}});
