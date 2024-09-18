import {ProductAttributes, ProductMaster, ProductStatusAttributes, SortProps} from "chums-types";
import {combineReducers} from "redux";
import {defaultListFilter, loadProductList} from "./actionTypes";
import {createAction, createAsyncThunk, createReducer, current} from "@reduxjs/toolkit";
import {setLocalStorage, storageKeys} from "../../utils/localStorage";
import {fetchProductList} from "../../api/product";
import {selectProductListLoading} from "./selectors";
import {RootState} from "../../app/configureStore";
import {ProductSortProps} from "../types";

export const setListPLFilterAction = createAction<string | undefined>('productList/filters/setProductLine');
export const setListSGFilterAction = createAction<number | undefined>('productList/filters/setSKUGroup')
export const setListSeasonFilterAction = createAction<number | undefined>('productList/filters/setSeason')
export const setListStatusFilterAction = createAction<keyof ProductStatusAttributes | ''>('productList/filters/setStatus')
export const setListSearchFilterAction = createAction<string | undefined>('productList/filters/setSearch')
export const setListActiveFilterAction = createAction<boolean>('productList/filters/setShowInactive')
export const loadProductListAction = createAsyncThunk<{ list: ProductMaster[], clearContext?: string }>(
    loadProductList,
    async (asd, thunkAPI) => {
        const list = await fetchProductList();
        return {list, clearContext: loadProductList}
    },
    {
        condition(arg, api): boolean {
            const state = api.getState() as RootState;
            return !state.productList.list.loading;
        }
    }
)

const listFiltersReducer = createReducer(defaultListFilter, (builder) => {
    builder
        .addCase(setListPLFilterAction, (state, action) => {
            state.productLine = action.payload || '';
            setLocalStorage(storageKeys.productList.filters, current(state));
        })
        .addCase(setListSGFilterAction, (state, action) => {
            state.skuGroupId = action.payload || 0;
            setLocalStorage(storageKeys.productList.filters, current(state));
        })
        .addCase(setListSeasonFilterAction, (state, action) => {
            state.seasonId = action.payload || 0;
            setLocalStorage(storageKeys.productList.filters, current(state));
        })
        .addCase(setListStatusFilterAction, (state, action) => {
            state.status = action.payload || '';
            setLocalStorage(storageKeys.productList.filters, current(state));
        })
        .addCase(setListSearchFilterAction, (state, action) => {
            state.search = action.payload || '';
            setLocalStorage(storageKeys.productList.filters, current(state));
        })
        .addCase(setListActiveFilterAction, (state, action) => {
            state.active = action.payload;
            setLocalStorage(storageKeys.productList.filters, current(state));
        })
});

interface ProductListState {
    products: ProductMaster[];
    loading: boolean;
    loaded: boolean;
    sort: ProductSortProps;
}

const defaultListState: ProductListState = {
    products: [],
    loading: false,
    loaded: false,
    sort: {
        field: 'id',
        ascending: true
    }
}

const listReducer = createReducer(defaultListState, (builder) => {
    builder
        .addCase(loadProductListAction.fulfilled, (state, action) => {
            state.loading = false
            state.loaded = true;
            state.products = action.payload.list;
        })
        .addCase(loadProductListAction.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadProductListAction.rejected, (state, action) => {
            state.loaded = true;
            state.loading = false;
            state.products = [];
        })
})

export default combineReducers({
    list: listReducer,
    filters: listFiltersReducer
})
