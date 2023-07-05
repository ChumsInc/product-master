import {apiActionHelper} from "../utils";
import {ActionInterface, ActionPayload, SortableTableField, SortProps} from "chums-connected-components";
import {ProductAttributes, ProductDimension, ProductMaster, ProductStatusAttributes} from "chums-types";
import React from "react";
import {getLocalStorage, storageKeys} from "../../utils/localStorage";

export interface ProductListPayload extends ActionPayload {
    list?: ProductMaster[],
    value?: string,
    id?: number,
    checked?: boolean,
    status?: keyof ProductStatusAttributes | '',
}

export interface ProductListAction extends ActionInterface {
    payload?: ProductListPayload,
}

export const loadProductList = 'productList/load';
export const [loadProductListPending, loadProductListResolved, loadProductListRejected] = apiActionHelper(loadProductList);

export const setProductListPLFilter = 'productList/filters/setPLFilter';
export const setProductListSGFilter = 'productList/filters/setSGFilter';
export const setProductListSeasonFilter = 'productList/filters/setSeasonFilter';
export const setProductListStatusFilter = 'productList/filters/setStatusFilter';
export const setProductListSearchFilter = 'productList/filters/setSearchFilter';
export const setProductListActiveFilter = 'productList/filters/setActiveFilter';

export const productListTableKey = 'product-list';
export type ProductListField = keyof ProductMaster
    | `attributes.${keyof ProductAttributes}`
    | `attributes.${keyof ProductAttributes}.${keyof ProductDimension}`
    | `status.${keyof ProductStatusAttributes}`
    | `season.code`;

export interface ProductListTableField extends SortableTableField {
    field: ProductListField,
    render?: (row: ProductMaster) => React.ReactNode,
}

export interface ProductListSortProps extends SortProps {
    field: ProductListField
}

export interface ProductListFilter {
    productLine: string,
    skuGroupId: number,
    seasonId: number,
    status: keyof ProductStatusAttributes | '',
    search: string,
    active: boolean
}

const storedFilter = getLocalStorage<ProductListFilter>(storageKeys.productList.filters);

export const defaultListFilter: ProductListFilter = {
    productLine: storedFilter?.productLine ?? '',
    skuGroupId: storedFilter?.skuGroupId ?? 0,
    seasonId: storedFilter?.seasonId ?? 0,
    status: storedFilter?.status ?? '',
    search: storedFilter?.search ?? '',
    active: storedFilter?.active ?? true,
}

export class ProductSize implements ProductDimension {
    quantity: number = 0;
    length: number = 0;
    width: number = 0;
    height:number = 0;
    weight: number = 0;
    volume: number = 0;

    constructor(dims?:ProductDimension) {
        this.quantity = dims?.quantity || 1;
        this.length = dims?.length || 0;
        this.width = dims?.width || 0;
        this.height = dims?.height || 0;
        this.weight = dims?.weight || 0;
        this.volume = (this.length * this.width * this.height) / this.quantity;
    }
}
