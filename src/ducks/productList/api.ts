import type {ProductMaster} from "chums-types";
import {fetchJSON} from "@chumsinc/ui-utils";

export async function fetchProductList():Promise<ProductMaster[]> {
    try {
        const url = '/api/operations/product-master/v2/product.json';
        const res = await fetchJSON<ProductMaster[]>(url, {cache: 'no-cache'});
        return res ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchProductList()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchProductList()", err);
        return Promise.reject(new Error('Error in fetchProductList()'));
    }
}
