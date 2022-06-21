import {get, LS_PRODUCT_LIST_UI, LS_PRODUCT_MAIN_UI} from "../utils/localStorage";

export const COMPANIES = {
    chums: 'Chums',
    bc: 'Beyond Coastal'
};

export const DEFAULT_COMPANY = 'chums';
export const DEFAULT_PRODUCT = {
    id: 0,
    name: '',
    productType: 'F',
    productLine: '',
    category: '',
    subCategory: '',
    SKU: '',
    UPC: '',
    sellAsSelf: true,
    sellAsMix: false,
    sellAsColors: false,
    color: '',
    suggestedRetailPrice: null,
    stdPrice: null,
    stdCost: null,
    notes: '',
    status: {
        'new': false,
        updating: false,
        approved: false,
        live: false,
        discontinued: false,
        season: 0,
    },
};

export const DEFAULT_PATH = 'list';


export const DEFAULT_MATERIAL = {
    id: 0,
    code: '',
    description: '',
    notes: '',
    active: true,
};

export const DEFAULT_DIMENSION = {
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    quantity: 1,
};

export const DEFAULT_ADJUSTABLE = {
    isAdjustable: false,
    name: '',
    min: 0,
    max: 0,
};

export const DEFAULT_PRODUCT_ATTRIBUTES = {
    productId: 0,
    colors: [],
    material: {...DEFAULT_MATERIAL},
    dimensions: {...DEFAULT_DIMENSION},
    adjustable: {...DEFAULT_ADJUSTABLE},
    shippingDimensions: {...DEFAULT_DIMENSION},
    casePackDimensions: {...DEFAULT_DIMENSION},
    notes: '',
};

export const DEFAULT_PRODUCT_LIST_UI = {
    filter: '',
    productLine: '',
    active: true,
    skuGroup: 0,
    status: true,
    categories: false,
    prices: false,
    upc: true,
    dimensions: true,
    notes: false,
    page: 1,
    rowsPerPage: 25,
    sort: {
        field: 'SKU',
        asc: true
    },
    ...(get(LS_PRODUCT_LIST_UI) || {})
};

export const DEFAULT_PRODUCT_MAIN_UI = {
    tab: 'dimensions',
    sortSageItems: {field: 'ItemCode', asc: true},
    filterItem: '',
    page: 1,
    rowsPerPage: 25,
    ...(get(LS_PRODUCT_MAIN_UI) || {})
}

export const PRODUCT_TYPES = {
    F: 'Finished Goods',
    D: 'Discontinued Item',
    R: 'Raw Materials',
    K: 'Kit Item',
};

export const DEFAULT_SEASON = {id: 0, code: '', description: '', properties: {}, notes: '', active: true};

export const PRODUCT_SECTIONS = {
    dimensions: 'dimensions',
    items: 'items',
}
