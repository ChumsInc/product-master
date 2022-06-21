import {combineReducers} from "redux";
import items from './items';
import {
    FETCH_PRODUCT,
    FETCH_PRODUCT_FAILURE,
    RECEIVE_PRODUCT,
    SAVE_PRODUCT,
    SAVE_PRODUCT_FAILURE,
    SELECT_PRODUCT,
    UPDATE_PRODUCT,
    RECEIVE_ATTRIBUTES,
    SAVE_ATTRIBUTES,
    SAVE_ATTRIBUTES_FAILURE,
    FETCH_INIT,
    FETCH_SUCCESS,
    UPDATE_PRODUCT_ATTRIBUTES, SET_PRODUCT_SECTION
} from "../constants/actions";
import {DEFAULT_PRODUCT, PRODUCT_SECTIONS} from "../constants/defaults";

const selected = (state = DEFAULT_PRODUCT, action) => {
    const {type, status, product, prop, attributes} = action;
    switch (type) {
    case FETCH_PRODUCT:
    case SAVE_PRODUCT:
        if (status === FETCH_SUCCESS) {
            return {...product, changed: false};
        }
        return state;
    case SAVE_ATTRIBUTES:
        if (status === FETCH_SUCCESS) {
            return {...state, attributes};
        }
        return state;
    case SELECT_PRODUCT:
        return {...product};
    case UPDATE_PRODUCT:
        return {...state, ...prop, changed: true};
    case UPDATE_PRODUCT_ATTRIBUTES:
        return {...state, attributes: {...state.attributes, ...prop}, changed: true}
    default:
        return state;
    }
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_PRODUCT:
    case SAVE_PRODUCT:
    case SAVE_ATTRIBUTES:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const section = (state = PRODUCT_SECTIONS.dimensions, action) => {
    const {type, section} = action;
    switch (type) {
    case SET_PRODUCT_SECTION:
        return section;
    default:
        return state;
    }
};


export default combineReducers({
    selected,
    loading,
    items,
    section,
});

