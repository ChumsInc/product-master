import {ProductAttributes, ProductDimension, ProductMaster, ProductStatusAttributes} from "chums-types";
import {ReactNode} from "react";
import {getLocalStorage, storageKeys} from "../../utils/localStorage";
import {DataTableField} from "chums-components";


export const productListTableKey = 'product-list';
export type ProductListField = keyof ProductMaster
    | `attributes.${keyof ProductAttributes}`
    | `attributes.${keyof ProductAttributes}.${keyof ProductDimension}`
    | `status.${keyof ProductStatusAttributes}`
    | `season.code`;

export interface ProductListTableField extends Omit<DataTableField, 'field' | 'render'> {
    field: ProductListField,
    render?: (row: ProductMaster) => ReactNode,
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
    height: number = 0;
    weight: number = 0;
    volume: number = 0;

    constructor(dims?: ProductDimension) {
        this.quantity = dims?.quantity || 1;
        this.length = dims?.length || 0;
        this.width = dims?.width || 0;
        this.height = dims?.height || 0;
        this.weight = dims?.weight || 0;
        this.volume = (this.length * this.width * this.height) / this.quantity;
    }
}
