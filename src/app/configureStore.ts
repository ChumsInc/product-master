import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {alertsSlice} from "@chumsinc/alert-list";
import settingsStatusSlice from "@/ducks/settings/settingsStatusSlice.ts";
import productLinesSlice from "@/ducks/settings/productLinesSlice.ts";
import categoriesSlice from "@/ducks/settings/categoriesSlice.ts";
import colorsSlice from "@/ducks/settings/colorsSlice.ts";
import mixesSlice from "@/ducks/settings/mixesSlice.ts";
import seasonsSlice from "@/ducks/settings/seasonsSlice.ts";
import skuGroupsSlice from "@/ducks/sku-groups/skuGroupsSlice.ts";
import subCategoriesSlice from "@/ducks/settings/subCategoriesSlice.ts";
import productListSlice from "@/ducks/productList/productListSlice.ts";
import userSlice from "@/ducks/user/userSlice.ts";
import currentProductSlice from "@/ducks/product/currentProductSlice.ts";
import baseSkuSlice from "@/ducks/base-sku/baseSkuSlice.ts";


const rootReducer = combineReducers({
    [alertsSlice.reducerPath]: alertsSlice.reducer,
    [settingsStatusSlice.reducerPath]: settingsStatusSlice.reducer,
    [productLinesSlice.reducerPath]: productLinesSlice.reducer,
    [baseSkuSlice.reducerPath]: baseSkuSlice.reducer,
    [categoriesSlice.reducerPath]: categoriesSlice.reducer,
    [colorsSlice.reducerPath]: colorsSlice.reducer,
    [mixesSlice.reducerPath]: mixesSlice.reducer,
    [seasonsSlice.reducerPath]: seasonsSlice.reducer,
    [skuGroupsSlice.reducerPath]: skuGroupsSlice.reducer,
    [subCategoriesSlice.reducerPath]: subCategoriesSlice.reducer,
    [currentProductSlice.reducerPath]: currentProductSlice.reducer,
    [productListSlice.reducerPath]: productListSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
})


const store = configureStore({
    reducer: rootReducer,
    devTools: {
        name: 'chums-product-master',
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
