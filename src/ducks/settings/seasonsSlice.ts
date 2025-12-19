import {createEntityAdapter, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loadSeason, loadSeasons, loadSettings, saveSeason} from "@/ducks/settings/actions.ts";
import type {ProductSeason} from "chums-types";
import {dismissAlert} from "@chumsinc/alert-list";

const adapter = createEntityAdapter<ProductSeason, number>({
    selectId: arg => arg.id,
    sortComparer: (a, b) => a.id - b.id
})

const selectors = adapter.getSelectors();

interface SeasonsState {
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    currentSeason: ProductSeason | null;
}

const extraState: SeasonsState = {status: 'idle', currentSeason: null};
const seasonsSlice = createSlice({
    name: 'seasons',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setCurrentSeason: (state, action: PayloadAction<ProductSeason | null>) => {
            state.currentSeason = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSettings.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.seasons ?? []);
            })
            .addCase(loadSeasons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSeasons.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
            })
            .addCase(loadSeasons.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadSeason.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSeason.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currentSeason = action.payload;
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(loadSeason.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(saveSeason.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveSeason.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currentSeason = action.payload;
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('seasons/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectSeasons: (state) => selectors.selectAll(state),
        selectCurrentSeason: (state) => state.currentSeason ?? null,
        selectSeasonsStatus: (state) => state.status
    }
})

export default seasonsSlice;
export const {selectSeasons, selectSeasonsStatus, selectCurrentSeason} = seasonsSlice.selectors;
export const {setCurrentSeason} = seasonsSlice.actions;
