import {ActionInterface, ActionPayload} from "chums-connected-components";
import {
    BaseSKU,
    CountryOfOrigin,
    PrimaryVendor,
    ProductCategory,
    ProductColor,
    ProductLine,
    ProductMixInfo,
    ProductSeason,
    ProductStatus,
    ProductWarehouse,
    SKUGroup
} from "chums-types";
import {apiActionHelper} from "../utils";
import {BaseSKU4} from "./types";


export interface SettingsPayload extends ActionPayload {
    categories?: ProductCategory[],
    colors?: ProductColor[],
    countryOfOrigin?: CountryOfOrigin[],
    lines?: ProductLine[],
    mixes?: ProductMixInfo[],
    primaryVendor?: PrimaryVendor[],
    seasons?: ProductSeason[],
    skuGroups?: SKUGroup[],
    skuList?: BaseSKU4[],
    status?: ProductStatus[],
    subCategories?: string[],
    warehouses?: ProductWarehouse[]
}

export interface SettingsAction extends ActionInterface {
    payload?:SettingsPayload,
}

export const loadSettings = 'settings/load';
export const [loadSettingsPending, loadSettingsResolved, loadSettingsRejected] = apiActionHelper(loadSettings);


