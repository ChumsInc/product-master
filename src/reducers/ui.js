import { combineReducers } from 'redux';
import {SET_PRODUCT_LIST_UI, SET_PRODUCT_MAIN_UI} from "../constants/actions";
import {get, set, LS_PRODUCT_LIST_UI, LS_PRODUCT_MAIN_UI} from '../utils/localStorage';
import {DEFAULT_PRODUCT_LIST_UI, DEFAULT_PRODUCT_MAIN_UI} from "../constants/defaults";


if (typeof DEFAULT_PRODUCT_LIST_UI.sort === 'string') {
    const field = DEFAULT_PRODUCT_LIST_UI.sort;
    DEFAULT_PRODUCT_LIST_UI.sort = {field, asc: true};
    set(LS_PRODUCT_LIST_UI, DEFAULT_PRODUCT_LIST_UI);
}

const productListUI = (state = DEFAULT_PRODUCT_LIST_UI, action) => {
    const {type, changes} = action;
    switch (type) {
    case SET_PRODUCT_LIST_UI:
        if (changes.filter !== undefined
            || changes.sort !== undefined
            || changes.active !== undefined
            || changes.rowsPerPage !== undefined) {
            changes.page = 1;
        }
        set(LS_PRODUCT_LIST_UI, {...get(LS_PRODUCT_LIST_UI), ...changes});
        return {...state, ...changes};
    default:
        return state;
    }
};

const productMain = (state = DEFAULT_PRODUCT_MAIN_UI, action) => {
    const {type, changes} = action;
    switch (type) {
    case SET_PRODUCT_MAIN_UI:
        if (changes.filter !== undefined
            || changes.sort !== undefined
            || changes.active !== undefined
            || changes.rowsPerPage !== undefined) {
            changes.page = 1;
        }
        set(LS_PRODUCT_MAIN_UI, {...get(LS_PRODUCT_MAIN_UI), ...changes});
        return {...state, ...changes};
    default:
        return state;
    }
};

export default combineReducers({
    productListUI,
    productMain,
})
