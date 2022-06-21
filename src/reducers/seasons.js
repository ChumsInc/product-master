import {combineReducers} from "redux";
import {
    FETCH_INIT,
    FETCH_SAVE_SEASON,
    FETCH_SEASONS, FETCH_SETTINGS,
    FETCH_SUCCESS,
    SELECT_SEASON,
    UPDATE_SEASON
} from "../constants/actions";
import {DEFAULT_SEASON} from "../constants/defaults";

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_SEASONS:
    case FETCH_SETTINGS:
    case FETCH_SAVE_SEASON:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const list = (state = [], action) => {
    const {type, status, seasons, season} = action;
    switch (type) {
    case FETCH_SEASONS:
    case FETCH_SETTINGS:
        return status === FETCH_SUCCESS
            ? [...seasons]
            : state;
    case FETCH_SAVE_SEASON:
        return status === FETCH_SUCCESS
            ? [
                ...state.filter(s => s.id !== 0).filter(s => s.id !== season.id),
                {...season}
            ]
            : state;
    default:
        return state;
    }
};

const selected = (state = DEFAULT_SEASON, action) => {
    const {type, season, props, status} = action;
    switch (type) {
    case UPDATE_SEASON:
        return {...state, ...props, changed: true};
    case SELECT_SEASON:
        return {...season};
    case FETCH_SAVE_SEASON:
        return status === FETCH_SUCCESS
            ? {...season}
            : state;
    default:
        return state;
    }
};

export default combineReducers({
    loading,
    list,
    selected,
})
