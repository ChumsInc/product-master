import {fetchGET, fetchPOST} from '../utils/fetch';

import {
    DISMISS_ALERT, FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS,
    FETCH_USER_ROLES, FETCH_VERSION,
    RECEIVE_USER_ROLES,
    SET_ALERT,
    SET_COMPANY,
    SET_PRODUCT_LIST_UI, SET_PRODUCT_MAIN_UI
} from "../constants/actions";
import {fetchSettings} from "./settings";

export const setAlert = ({
                             type = 'warning',
                             title = 'Oops!',
                             message = 'There was an error'}) => ({type: SET_ALERT, alert: {type, title, message}});

export const dismissAlert = (id) => ({type: DISMISS_ALERT, id});

export const setCompany = (company) => (dispatch) => {
    dispatch({type: SET_COMPANY, company});
    dispatch(fetchSettings(company));
};

export const fetchRoles = () => (dispatch, getState) => {
    dispatch({type: FETCH_USER_ROLES, status: FETCH_INIT});
    fetchGET('/node-dev/user/roles')
        .then(result => {
            dispatch({type: FETCH_USER_ROLES, status: FETCH_SUCCESS, list: result.roles || []});
        })
        .catch(err => {
            dispatch({type: FETCH_USER_ROLES, status: FETCH_FAILURE});
            dispatch(setAlert({message: err.message || 'Unable to fetch user roles'}));
        })
};

export const setProductListUI = (changes) => ({type: SET_PRODUCT_LIST_UI, changes});
export const setProductMainUI = (changes) => ({type: SET_PRODUCT_MAIN_UI, changes});

export const fetchVersion = () => (dispatch, getState) => {
    dispatch({type: FETCH_VERSION, status: FETCH_INIT});
    fetch('package.json', {cache: "no-cache", credentials: 'same-origin'})
        .then(res => res.json())
        .then(res => {
            const {version} = res;
            dispatch({type: FETCH_VERSION, status: FETCH_SUCCESS, version});
        })
        .catch(err => {
            dispatch({type: FETCH_VERSION, status: FETCH_FAILURE});
            console.log(err.message);
        });
}
