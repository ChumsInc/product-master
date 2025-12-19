import {fetchJSON} from "@chumsinc/ui-utils";
import type {
    BaseSKURecord,
    CategoryRecord,
    CountryOfOriginRecord,
    PrimaryVendorRecord,
    ProductLineRecord,
    ProductStatusRecord,
    WarehouseRecord
} from "chums-types/production";
import type {ProductColor, ProductMixInfo, ProductSeason, SKUGroup} from "chums-types";
import type {ProductMaterial} from "@/types/settings.ts";

export interface SettingsResponse {
    productLines: ProductLineRecord[];
    categories: CategoryRecord[];
    subCategories: string[];
    skuList: BaseSKURecord[];
    colors: ProductColor[];
    mixes: ProductMixInfo[];
    skuGroups: SKUGroup[];
    materials: ProductMaterial[];
    countryOfOrigin: CountryOfOriginRecord[];
    primaryVendor: PrimaryVendorRecord[];
    status: ProductStatusRecord[];
    seasons: ProductSeason[];
    warehouses: WarehouseRecord[];

}

export async function fetchSettings(): Promise<SettingsResponse | null> {
    try {
        const url = '/api/operations/product-master/v2/settings.json';
        return await fetchJSON<SettingsResponse>(url, {cache: 'no-cache'});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchSettings()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSettings()", err);
        return Promise.reject(new Error('Error in fetchSettings()'));
    }

}

export async function fetchSeasons(): Promise<ProductSeason[]> {
    try {
        const url = '/api/operations/product-master/v2/seasons.json';
        const res = await fetchJSON<{ seasons: ProductSeason[] }>(url, {cache: 'no-cache'});
        return res?.seasons ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchSeasons()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSeasons()", err);
        return Promise.reject(new Error('Error in fetchSeasons()'));
    }
}

export async function fetchSeason(arg:number): Promise<ProductSeason|null> {
    try {
        const url = `/api/operations/product-master/v2/seasons/${arg}.json`;
        const res = await fetchJSON<{ season: ProductSeason|null }>(url, {cache: 'no-cache'});
        return res?.season ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchSeasons()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSeasons()", err);
        return Promise.reject(new Error('Error in fetchSeasons()'));
    }
}

export async function postSeason(arg: ProductSeason): Promise<ProductSeason | null> {
    try {
        const body = JSON.stringify(arg);
        const url = arg.id
            ? `/api/operations/product-master/v2/seasons/${arg.id}.json`
            : '/api/operations/product-master/v2/seasons.json';
        const method = arg.id ? 'PUT' : 'POST';
        const res = await fetchJSON<{ season: ProductSeason | null }>(url, {method, body})
        return res?.season ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("()", err.message);
            return Promise.reject(err);
        }
        console.debug("()", err);
        return Promise.reject(new Error('Error in ()'));
    }
}
