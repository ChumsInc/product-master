import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {alertsReducer, pageSetsReducer, tablesReducer, tabsReducer} from "chums-connected-components";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {default as settingsReducer} from '../ducks/settings';
import {default as seasonsReducer} from '../ducks/seasons';
import {default as productReducer} from '../ducks/product';
import {default as productListReducer} from '../ducks/product-list';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    // colors: colorsReducer,
    // itemSearch: itemSearchReducer,
    // keywords: keywordsReducer,
    pageSets: pageSetsReducer,
    product: productReducer,
    productList: productListReducer,
    seasons: seasonsReducer,
    settings: settingsReducer,
    tables: tablesReducer,
    tabs: tabsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error'],
        }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
