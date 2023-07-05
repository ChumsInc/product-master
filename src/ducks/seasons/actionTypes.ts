import {ActionInterface, ActionPayload} from "chums-connected-components";
import {ProductSeason} from "chums-types";
import {apiActionHelper} from "../utils";


export interface SeasonsPayload extends ActionPayload {
    seasons?: ProductSeason[],
}

export interface SeasonsAction extends ActionInterface {
    payload?: SeasonsPayload,
}

export interface SeasonList {
    [key:string]: ProductSeason,
}

export const loadSeasons = 'settings/load';
export const [loadSeasonsPending, loadSeasonsResolved, loadSeasonsRejected] = apiActionHelper(loadSeasons);

export const defaultSeason:ProductSeason = {
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
