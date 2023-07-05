import {ActionInterface, ActionPayload} from "chums-connected-components";
import {
    AdjustableDimension,
    ProductAttributes,
    ProductDimension,
    ProductMaster,
    ProductStatusAttributes
} from "chums-types";
import {apiActionHelper} from "../utils";

export interface EditableProduct extends ProductMaster {
    changed?: boolean,
}

export interface ProductPayload extends ActionPayload {
    list?: ProductMaster[]
    product?: ProductMaster,
    props?: Partial<ProductMaster>,
}

export interface ProductAction extends ActionInterface {
    payload?: ProductPayload,
}



export const updateProduct = 'product/update';
export const createNewProduct = 'product/newProduct';
 
export const loadProduct = 'product/load';
export const [loadProductPending, loadProductResolved, loadProductRejected] = apiActionHelper(loadProduct);

export const saveProduct = 'product/save';
export const [saveProductPending, saveProductResolved, saveProductRejected] = apiActionHelper(saveProduct);

export const defaultProduct:ProductMaster = {
    id: 0,
    company: 'chums',
    devCode: '',
    name: '',
    status: {
        new: true,
    },
    active: true,
    productType: 'F',
    productLine: '',
    category: '',
    subCategory: '',
    idSKUGroup: 0,
    SKU: '',
    UPC: '',
    sellAsSelf: true,
    sellAsMix: false,
    sellAsColors: false,
    color: '',
    suggestedRetailPrice: 0,
    stdPrice: 0,
    stdCost: 0,
    notes: '',
    attributes: {},
    season: null,
    userId: null,
    dateCreated: '',
    dateUpdated: '',
}
