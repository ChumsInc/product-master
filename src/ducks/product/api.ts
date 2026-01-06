import {fetchJSON} from "@chumsinc/ui-utils";
import type {ProductAttributes, ProductMaster} from "chums-types";

export async function fetchProduct(arg: number|string) {
    try {
        const url = `/api/operations/product-master/v2/products/${arg}.json`;
        const res = await fetchJSON<{ product: ProductMaster|null }>(url, {cache: 'no-cache'});
        return res?.product ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchProduct()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchProduct()", err);
        return Promise.reject(new Error('Error in fetchProduct()'));
    }
}

export async function postProduct(arg: ProductMaster):Promise<ProductMaster|null> {
    try {
        const body = JSON.stringify(arg);
        const url = arg.id
            ? `/api/operations/product-master/v2/products/${arg.id}.json`
            : '/api/operations/product-master/v2/product.json';
        const method = arg.id ? 'PUT' : 'POST';
        const res = await fetchJSON<{ product: ProductMaster|null }>(url, {method, body})
        return res?.product ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postProduct()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(new Error('Error in postProduct()'));
    }
}

export type SaveProductAttributesArgs = Pick<ProductMaster, 'id'> & {
    attributes: Partial<ProductAttributes>
}

export async function postProductAttributes(arg: SaveProductAttributesArgs):Promise<ProductMaster|null> {
    try {
        const body = JSON.stringify(arg);
        const url = `/api/operations/product-master/v2/products/${arg.id}/attributes.json`;
        const method = 'PUT';
        const res = await fetchJSON<{ product: ProductMaster|null }>(url, {method, body})
        return res?.product ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postProductAttributes()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(new Error('Error in postProductAttributes()'));
    }
}
