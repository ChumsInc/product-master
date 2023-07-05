import {combineReducers} from 'redux';
import {FETCH_INIT, FETCH_PRODUCT, FETCH_PRODUCT_ITEMS, FETCH_SUCCESS, SELECT_PRODUCT} from "../constants/actions";


const list = (state = [], action) => {
    const {type, status, items, item} = action;
    switch (type) {
    case FETCH_PRODUCT_ITEMS:
        return [...items];
    // case RECEIVE_SKU_ITEM:
    //     return [...state.filter(i => i.ItemCode !== item.ItemCode), {...item}]
    case SELECT_PRODUCT:
        return [];
    default:
        return state;
    }
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_PRODUCT_ITEMS:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const loaded = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_PRODUCT:
        if (status === FETCH_INIT) {
            return false;
        }
        return state;
    case FETCH_PRODUCT_ITEMS:
        if (status === FETCH_SUCCESS) {
            return true;
        }
        return state;
    default:
        return state;
    }
}

export default combineReducers({
    list,
    loading,
    loaded,
});
