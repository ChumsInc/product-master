import {
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_SAVE_SEASON,
    FETCH_SEASONS,
    FETCH_SUCCESS,
    SELECT_SEASON,
    UPDATE_SEASON,
} from "../constants/actions";
import {buildPath, fetchGET, fetchPOST} from "../utils/fetch";
import {URL_SEASONS} from "../constants/paths";
import {DEFAULT_SEASON} from "../constants/defaults";

const isFetching = (state) => state.settings.seasons.loading;

export const fetchSeasons = () => (dispatch, getState) => {
    if (isFetching(getState())){
        return;
    }
    dispatch({type: FETCH_SEASONS, status: FETCH_INIT});
    const url = buildPath(URL_SEASONS, {}, true);
    fetchGET(url)
        .then(({seasons}) => {
            dispatch({type: FETCH_SEASONS, status: FETCH_SUCCESS, seasons});
        })
        .catch(err => {
            console.log("fetchSeasons()", err.message);
            dispatch({type: FETCH_SEASONS, status: FETCH_FAILURE, message: err.message});
        });
};

export const saveSeason = (season) => (dispatch, getState) => {
    if (isFetching(getState())){
        return;
    }
    dispatch({type: FETCH_SAVE_SEASON, status: FETCH_INIT});
    const url = (buildPath(URL_SEASONS, {id: season.id}));
    fetchPOST(url, season)
        .then(({season}) => {
            dispatch({type: FETCH_SAVE_SEASON, status: FETCH_SUCCESS, season});
        })
        .catch(err => {
            console.log("saveSeason()", err.message);
            dispatch({type: FETCH_SAVE_SEASON, status: FETCH_FAILURE, message: err.message});
        });
};

export const updateSeason = (props) => ({type: UPDATE_SEASON, props});
export const newSeason = () => ({type: SELECT_SEASON, season: DEFAULT_SEASON});
export const selectSeason = (season) => ({type: SELECT_SEASON, season});
