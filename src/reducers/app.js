import { combineReducers } from 'redux';
import {
    DISMISS_ALERT,
    FETCH_SUCCESS,
    FETCH_USER_ROLES, FETCH_VERSION,
    RECEIVE_USER_ROLES,
    SET_ALERT,
    SET_COMPANY
} from "../constants/actions";
import {DEFAULT_COMPANY} from "../constants/defaults";


const alerts = (state = [], action) => {
    const {type, alert, id}  = action;
    switch (type) {
    case SET_ALERT:
        return [...state, {...alert, id: new Date().valueOf()}];
    case DISMISS_ALERT:
        return [...state.filter(alert => alert.id !== id)];
    default:
        return state;
    }
};

const company = (state = DEFAULT_COMPANY, action) => {
    const {type, company} = action;
    switch (type) {
    case SET_COMPANY:
        return company;
    default:
        return state;
    }
};

const userRoles = (state = [], action) => {
    const {type, status, list} = action;
    switch (type) {
    case FETCH_USER_ROLES:
        return status === FETCH_SUCCESS
            ? [...list]
            : [];
    default:
        return state;
    }
};

const readOnly = (state = true, action) => {
    const {type, status, list = []} = action;
    switch (type) {
    case FETCH_USER_ROLES:
        return status === FETCH_SUCCESS
            ? !(list.includes('root') || list.includes('product-admin'))
            : state;
    default:
        return state;
    }
};

const version = (state = '', action) => {
    const {type, status, version} = action;
    switch (type) {
    case FETCH_VERSION:
        if (status === FETCH_SUCCESS) {
            return version;
        }
        return state;
    default:
        return state;
    }
}

export default combineReducers({
    alerts,
    userRoles,
    readOnly,
    company,
    version,
});
