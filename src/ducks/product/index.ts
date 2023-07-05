import {alertDismissed} from 'chums-connected-components';
import {combineReducers} from "redux";
import {
    createNewProduct,
    defaultProduct,
    EditableProduct,
    loadProduct,
    loadProductPending,
    loadProductRejected,
    loadProductResolved,
    ProductAction,
    updateProduct
} from "./actionTypes";
import {createReducer} from "@reduxjs/toolkit";
import {loadProductAction} from "./actions";


const productReducer = createReducer(defaultProduct, (builder) => {
    builder
        .addCase<any, ProductAction>(loadProductAction, (state, action) => {
            if (action.payload?.product) {
                return action.payload.product;
            }
            return {...defaultProduct};
        })
        .addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state, action:ProductAction) => {
                if (action.payload?.product) {
                    return action.payload.product;
                }
                return {...defaultProduct};
            })
})
const currentProductReducer = (state: EditableProduct = {...defaultProduct}, action: ProductAction): EditableProduct => {
    const {type, payload} = action;
    switch (type) {
    case loadProductResolved:
        if (payload?.product) {
            return {...payload.product};
        }
        return {...defaultProduct};
    case updateProduct:
        if (payload?.props) {
            return {
                ...state,
                ...payload.props,
                changed: true,
            }
        }
        return state;
    case createNewProduct:
        return {...defaultProduct}
    }
    return state;
}

const loadingReducer = (state: boolean = false, action: ProductAction): boolean => {
    switch (action.type) {
    case loadProductPending:
        return true;
    case loadProductResolved:
    case loadProductRejected:
        return false;
    }
    return state;
}

const loadedReducer = (state: boolean = false, action: ProductAction): boolean => {
    switch (action.type) {
    case loadProductResolved:
    case createNewProduct:
        return true;
    case loadProductRejected:
    case loadProductPending:
        return false;
    }
    return state;
}

const loadErrorReducer = (state: boolean = false, action: ProductAction): boolean => {
    switch (action.type) {
    case loadProductRejected:
        return true;
    case loadProductResolved:
    case alertDismissed:
        if (action.payload?.clearContext && action.payload.context === loadProduct) {
            return false;
        }
        return state;
    case loadProductPending:
        return false;
    }
    return state;
}

export default combineReducers({
    current: productReducer,
    currentProduct: currentProductReducer,
    loading: loadingReducer,
    loaded: loadedReducer,
    loadError: loadErrorReducer
})
