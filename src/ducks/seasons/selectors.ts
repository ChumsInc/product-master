import {RootState} from "../../app/configureStore";
import {defaultSeason} from "./actionTypes";

export const selectSettingsLoading = (state: RootState) => state.settings.loading;
export const selectSeasons = (state: RootState) => Object.values(state.seasons.list);
export const selectCurrentSeason = (state: RootState) => state.seasons.current;
export const selectSeasonByCode = (code:string) => (state:RootState) => state.seasons.list[code] || {...defaultSeason};


