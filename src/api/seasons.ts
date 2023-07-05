import {fetchJSON} from "chums-components";
import {ProductSeason} from "chums-types";

export async function fetchSeasonsAPI():Promise<ProductSeason[]> {
    try {
        const {seasons} = await fetchJSON<{seasons: ProductSeason[]}>('/api/operations/pm/seasons/list');
        return seasons;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("fetchSeasons()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchSeasons()", err);
        return Promise.reject(new Error('Error in fetchSeasons()'));
    }
}

export async function fetchSeasonAPI(id:number):Promise<ProductSeason> {
    try {
        const url = `/api/operations/pm/seasons/${encodeURIComponent(id)}`
        const {season} = await fetchJSON<{season: ProductSeason}>(url);
        return season;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("fetchSeason()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchSeason()", err);
        return Promise.reject(new Error('Error in fetchSeason()'));
    }
}

export async function saveSeasonAPI(_season:ProductSeason):Promise<ProductSeason> {
    try {
        const url = `/api/operations/pm/seasons/${encodeURIComponent(_season.id || '')}`;
        const method = _season.id ? 'PUT' : 'POST';
        const body = JSON.stringify(_season);
        const {season} = await fetchJSON<{season: ProductSeason}>(url, {method, body});
        return season;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("saveSeason()", err.message);
            return Promise.reject(err);
        }
        console.warn("saveSeason()", err);
        return Promise.reject(new Error('Error in saveSeason()'));
    }
}

export async function deleteSeasonAPI(id:number):Promise<ProductSeason[]>{
    try {
        const url = `/api/operations/pm/seasons/${encodeURIComponent(id)}`;
        const method = 'DELETE';
        const {seasons} = await fetchJSON<{seasons: ProductSeason[]}>(url, {method});
        return seasons;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("saveSeason()", err.message);
            return Promise.reject(err);
        }
        console.warn("saveSeason()", err);
        return Promise.reject(new Error('Error in saveSeason()'));
    }
}
