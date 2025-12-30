import {fetchJSON} from "@chumsinc/ui-utils";
import type {BaseSKU} from "chums-types";

export interface FetchBaseSkuListProps {
    idSkuGroup?: number;

}
export async function fetchBaseSkuList(arg?: FetchBaseSkuListProps):Promise<BaseSKU[]> {
    try {
        const url = arg?.idSkuGroup
            ? `/api/operations/sku/base/group/${arg.idSkuGroup}.json`
            : '/api/operations/sku/base.json';
        const res = await fetchJSON<{list: BaseSKU[]}>(url, {cache: 'no-cache'});
        return res?.list ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchBaseSkuList()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchBaseSkuList()", err);
        return Promise.reject(new Error('Error in fetchBaseSkuList()'));
    }
}
