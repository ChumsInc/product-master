import {combineReducers} from "redux";
import {
    BaseSKU,
    CountryOfOrigin,
    PrimaryVendor,
    ProductCategory,
    ProductColor,
    ProductLine,
    ProductMixInfo,
    ProductSeason, ProductStatus, ProductWarehouse, SKUGroup
} from "chums-types";
import {loadSettingsPending, loadSettingsRejected, loadSettingsResolved, SettingsAction} from "./actionTypes";
import {BaseSKU4} from "./types";

const categoriesReducer = (state:ProductCategory[] = [], action:SettingsAction):ProductCategory[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.categories) {
            return payload.categories.sort((a, b) => a.Category2 > b.Category2 ? 1 : -1);
        }
        return state;
    }
    return state;
}

const colorsReducer = (state:ProductColor[] = [], action:SettingsAction):ProductColor[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.colors) {
            return payload.colors.sort((a, b) => a.id - b.id);
        }
        return state;
    }
    return state;
}

const countryOfOriginReducer = (state:CountryOfOrigin[] = [], action:SettingsAction):CountryOfOrigin[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.countryOfOrigin) {
            return payload.countryOfOrigin.sort((a, b) => a.countryOfOrigin > b.countryOfOrigin ? 1 : -1);
        }
        return state;
    }
    return state;
}

const productLinesReducer = (state:ProductLine[] = [], action:SettingsAction):ProductLine[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.lines) {
            return payload.lines.sort((a, b) => a.ProductLine > b.ProductLine ? 1 : -1);
        }
        return state;
    }
    return state;
}

const mixesReducer = (state:ProductMixInfo[] = [], action:SettingsAction):ProductMixInfo[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.mixes) {
            return payload.mixes.sort((a, b) => a.id - b.id);
        }
        return state;
    }
    return state;
}

const primaryVendorsReducer = (state:PrimaryVendor[] = [], action:SettingsAction):PrimaryVendor[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.primaryVendor) {
            return payload.primaryVendor.sort((a, b) => a.PrimaryVendorNo > b.PrimaryVendorNo ? 1 : -1);
        }
        return state;
    }
    return state;
}

const seasonsReducer = (state:ProductSeason[] = [], action:SettingsAction):ProductSeason[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.seasons) {
            return payload.seasons.sort((a, b) => a.id - b.id);
        }
        return state;
    }
    return state;
}

const SKUGroupsReducer = (state:SKUGroup[] = [], action:SettingsAction):SKUGroup[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.skuGroups) {
            return payload.skuGroups.sort((a, b) => a.id - b.id);
        }
        return state;
    }
    return state;
}

const baseSKUListReducer = (state:BaseSKU4[] = [], action:SettingsAction):BaseSKU4[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.skuList) {
            return payload.skuList.sort((a, b) => a.Category4 > b.Category4 ? 1 : -1);
        }
        return state;
    }
    return state;
}

const productStatusReducer = (state:ProductStatus[] = [], action:SettingsAction):ProductStatus[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.status) {
            return payload.status.sort((a, b) => a.id - b.id);
        }
        return state;
    }
    return state;
}

const subCategoriesReducer = (state:string[] = [], action:SettingsAction):string[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.subCategories) {
            return payload.subCategories.sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1);
        }
        return state;
    }
    return state;
}

const warehousesReducer = (state:ProductWarehouse[] = [], action:SettingsAction):ProductWarehouse[] => {
    const {type, payload} = action;
    switch (type) {
    case loadSettingsResolved:
        if (payload?.warehouses) {
            return payload.warehouses.sort((a, b) => a.WarehouseCode > b.WarehouseCode ? 1 : -1);
        }
        return state;
    }
    return state;
}

const loadingReducer = (state:boolean = false, action:SettingsAction):boolean => {
    switch (action.type) {
    case loadSettingsPending:
        return true;
    case loadSettingsResolved:
    case loadSettingsRejected:
        return false;
    }
    return state;
}
export default combineReducers({
    categories: categoriesReducer,
    colors: colorsReducer,
    countryOfOrigin: countryOfOriginReducer,
    productLines: productLinesReducer,
    mixes: mixesReducer,
    primaryVendors: primaryVendorsReducer,
    seasons: seasonsReducer,
    baseSKUList: baseSKUListReducer,
    SKUGroups: SKUGroupsReducer,
    productStatus: productStatusReducer,
    subCategories: subCategoriesReducer,
    warehouses: warehousesReducer,
    loading: loadingReducer,
})
