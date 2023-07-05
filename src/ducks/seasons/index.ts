import {ProductSeason} from "chums-types";
import {AsyncThunk, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchSeasonAPI, fetchSeasonsAPI, saveSeasonAPI} from "../../api/seasons";
import {RootState} from "../../app/configureStore";
import {ThunkActionStatus} from "../types";

export interface SeasonList {
    [key: string]: ProductSeason,
}

export const loadSeasons = 'seasons/loadSeasons';
export const loadSeason = 'seasons/loadSeason'
export const saveSeason = 'seasons/saveSeason'
export const deleteSeason = 'seasons/deleteSeason'

export const selectSeasons = (state: RootState) => state.seasons.list;
export const selectCurrentSeason = (state: RootState) => state.seasons.current;
export const selectSeasonsLoading = (state: RootState) => state.seasons.loading;
export const selectSeasonsSaving = (state: RootState) => state.seasons.saving;

export const defaultSeason: ProductSeason = {
    id: 0,
    code: '',
    active: true,
    properties: {
        color: '#FFF',
    },
    notes: '',
    userId: 0,
    description: '',
}

export interface SeasonsState {
    list: SeasonList,
    current: ProductSeason,
    loading: ThunkActionStatus,
    saving: ThunkActionStatus,
}

const defaultSeasonsState: SeasonsState = {
    list: {},
    current: {...defaultSeason},
    loading: 'idle',
    saving: 'idle',
}

export const loadSeasonsAction = createAsyncThunk<ProductSeason[]>(
    loadSeasons,
    async (v, thunkAPI) => {
        return await fetchSeasonsAPI();
    },
    {
        condition(arg, api): boolean {
            const state = api.getState() as RootState;
            return !state.seasons.loading;
        }
    });
type LoadSeasonsAction = ReturnType<AsyncThunk<ProductSeason[], unknown, any>['pending' | 'fulfilled' | 'rejected']>;

export const loadSeasonAction = createAsyncThunk<ProductSeason, number>(
    loadSeason,
    async (id, thunkAPI) => {
        return await fetchSeasonAPI(id);
    },
    {
        condition(arg, api): boolean {
            const state = api.getState() as RootState;
            return !state.seasons.loading;
        }
    });

export const saveSeasonAction = createAsyncThunk<ProductSeason, ProductSeason>(
    saveSeason,
    async (season, thunkAPI) => {
        return await saveSeasonAPI(season);
    },
    {
        condition(arg, api): boolean {
            const state = api.getState() as RootState;
            return selectSeasonsLoading(state) !== 'pending' && selectSeasonsSaving(state) !== 'pending';
        }
    }
)

const seasonsReducer = createReducer(defaultSeasonsState, builder => {
    builder
        .addCase(loadSeasonsAction.fulfilled, (state, action) => {
            state.loading = action.meta.requestStatus;
            state.list = {};
            action.payload.forEach(s => {
                state.list[s.code] = s;
            })
        })
        .addCase(loadSeasonsAction.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        })
        .addCase(loadSeasonsAction.rejected, (state, action) => {
            state.loading = action.meta.requestStatus;
        })
        .addCase(loadSeasonAction.fulfilled, (state, action) => {
            state.loading = action.meta.requestStatus;
            state.current = action.payload;
        })
        .addCase(loadSeasonAction.pending, (state, action) => {
            state.loading = action.meta.requestStatus;
        })
        .addCase(loadSeasonAction.rejected, (state, action) => {
            state.loading = action.meta.requestStatus;
        })
        .addMatcher<LoadSeasonsAction>(
            action => action.type.startsWith(loadSeasons),
            (state, action) => {
                state.loading = action.meta.requestStatus
            }
        );
})
export default seasonsReducer;
