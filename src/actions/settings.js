import {fetchGET, fetchPOST} from '../utils/fetch';
import {
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_SETTINGS,
    FETCH_SUCCESS,
} from "../constants/actions";
import {setAlert} from "./app";
import {DEFAULT_COMPANY} from "../constants/defaults";

export const fetchSettings = (company) => (dispatch, getState) => {
    if (!company) {
        const state = getState();
        company = state.app.company || DEFAULT_COMPANY;
    }
    dispatch({type: FETCH_SETTINGS, status: FETCH_INIT});
    const url = '/node-dev/production/pm/settings/:company'
        .replace(':company', encodeURIComponent(company));
    fetchGET(url)
        .then(res => {
            const {
                categories = [],
                colors = [],
                lines = [],
                mixes = [],
                skuList = [],
                subCategories = [],
                skuGroups = [],
                seasons = [],
            } = res;
            dispatch({type: FETCH_SETTINGS, status: FETCH_SUCCESS, categories, colors, lines, mixes, skuList, subCategories, skuGroups, seasons});
        })
        .catch(err => {
            dispatch({type: FETCH_SETTINGS, status: FETCH_FAILURE});
            dispatch(setAlert({message: err.message || 'Unable to fetch settings'}));
        })
};


