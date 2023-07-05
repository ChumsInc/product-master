import {combineReducers} from "redux";
import seasons from './seasons';
import {FETCH_INIT, FETCH_SETTINGS, FETCH_SUCCESS, RECEIVE_SETTINGS} from "../constants/actions";

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_SETTINGS:
        return status === FETCH_INIT;
    default:
        return state;
    }
}

const productLines = (state = [], action) => {
    const {type, status, lines} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...lines];
        }
        return [];
    default:
        return state;
    }
};

const categories = (state = [], action) => {
    const {type, status, categories} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...categories];
        }
        return [];
    default:
        return state;
    }
};

const subCategories = (state = [], action) => {
    const {type, status, subCategories} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...subCategories];
        }
        return [];
    default:
        return state;
    }
};

const skuList = (state = [], action) => {
    const {type, status, skuList} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...skuList];
        }
        return [];
    default:
        return state;
    }
};

const colors = (state = [], action) => {
    const {type, status, colors} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...colors];
        }
        return [];
    default:
        return state;
    }
};

const mixes = (state = [], action) => {
    const {type, status, mixes} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...mixes];
        }
        return [];
    default:
        return state;
    }
};

const skuGroups = (state = [], action) => {
    const {type, status, skuGroups} = action;
    switch (type) {
    case FETCH_SETTINGS:
        if (status === FETCH_SUCCESS) {
            return [...skuGroups];
        }
        return [];
    default:
        return state;
    }
};

export default combineReducers({
    loading,
    productLines,
    categories,
    subCategories,
    skuList,
    colors,
    mixes,
    skuGroups,
    seasons,
});
