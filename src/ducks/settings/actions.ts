import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchSeason, fetchSeasons, fetchSettings, postSeason, type SettingsResponse} from "@/ducks/settings/api.ts";
import type {RootState} from "@/app/configureStore.ts";
import type {ProductSeason} from "chums-types";
import {selectSeasonsStatus} from "@/ducks/settings/seasonsSlice.ts";
import {selectSettingsStatus} from "@/ducks/settings/settingsStatusSlice.ts";

export const loadSettings = createAsyncThunk<SettingsResponse|null, void, {state:RootState}>(
    'settings/load', async () => {
        return await fetchSettings();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectSettingsStatus(state) === 'idle';
        }
    }
)

export const saveSeason = createAsyncThunk<ProductSeason|null, ProductSeason, {state:RootState}>(
    'seasons/saveSeason',
    async (arg) => {
        return await postSeason(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectSeasonsStatus(state) === 'idle';
        }
    }
)

export const loadSeasons = createAsyncThunk<ProductSeason[], void, {state:RootState}>(
    'seasons/loadSeasons',
    async () => {
        return await fetchSeasons();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectSeasonsStatus(state) === 'idle';
        }
    }
)

export const loadSeason = createAsyncThunk<ProductSeason|null, number, {state:RootState}>(
    'seasons/loadSeason',
    async (arg) => {
        return await fetchSeason(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return arg > 0 && selectSeasonsStatus(state) === 'idle';
        }
    }
)
