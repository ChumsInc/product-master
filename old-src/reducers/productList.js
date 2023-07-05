import {combineReducers} from "redux";
import {
    FETCH_INIT,
    FETCH_PRODUCT_LIST,
    FETCH_PRODUCT_LIST_FAILURE,
    FETCH_SUCCESS,
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCT_LIST, SAVE_PRODUCT
} from "../constants/actions";

const list = (state = [], action) => {
    const {type, status, list, product} = action;
    switch(type) {
    case FETCH_PRODUCT_LIST:
        if (status === FETCH_SUCCESS) {
            return [...list];
        }
        return state;
    case SAVE_PRODUCT:
        if (status === FETCH_SUCCESS) {
            return [...state.filter(p => p.id !== product.id), {...product}];
        }
        return state;
    default:
        return state;
    }
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_PRODUCT_LIST:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

export default combineReducers({
    list,
    loading,
});

