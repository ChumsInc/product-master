import Debug from 'debug';
import {fetchJSON} from 'chums-components';
import {ProductMaster} from "chums-types";

const debug = Debug('chums:api:product-list');

export async function fetchProductList():Promise<ProductMaster[]> {
    try {
        const url = '/api/operations/production/pm/products';
        return await fetchJSON<ProductMaster[]>(url);
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchProductList()", err.message);
            return Promise.reject(err);
        }
        debug("fetchProductList()", err);
        return Promise.reject(new Error('Error in fetchProductList()'));
    }
}

export async function fetchProduct(id:number):Promise<ProductMaster> {
    try {
        const url = '/api/operations/production/pm/products/:id'
            .replace(':id', encodeURIComponent(id));
        const {product} = await fetchJSON<{ product:ProductMaster }>(url);
        return product;
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchProduct()", err.message);
            return Promise.reject(err);
        }
        debug("fetchProduct()", err);
        return Promise.reject(new Error('Error in fetchProduct()'));
    }
}

