import type {SKUGroup} from "chums-types";
import {fetchJSON} from "@chumsinc/ui-utils";

export async function postSkuGroup(arg:SKUGroup):Promise<SKUGroup|null> {
    try {
        const body = JSON.stringify(arg);
        const url = '/api/operations/sku/groups.json';
        const method = 'POST';
        const res = await fetchJSON<{ group: SKUGroup|null }>(url, {method, body});
        return res?.group ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postSkuGroup()", err.message);
            return Promise.reject(err);
        }
        console.debug("postSkuGroup()", err);
        return Promise.reject(new Error('Error in postSkuGroup()'));
    }
}

export async function fetchSkuGroups(): Promise<SKUGroup[]> {
    try {
        const url = '/api/operations/sku/groups.json';
        const res = await fetchJSON<{ list: SKUGroup[] }>(url, {cache: 'no-cache'});
        return res?.list ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchSkuGroups()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSkuGroups()", err);
        return Promise.reject(new Error('Error in fetchSkuGroups()'));
    }
}

export async function fetchSkuGroup(code:string): Promise<SKUGroup|null> {
    try {
        const url = `/api/operations/sku/groups/${encodeURIComponent(code)}.json`;
        const res = await fetchJSON<{ group: SKUGroup|null }>(url, {cache: 'no-cache'});
        return res?.group ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchSkuGroup()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSkuGroup()", err);
        return Promise.reject(new Error('Error in fetchSkuGroup()'));
    }
}
