import Debug from 'debug';
import {
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
import {fetchJSON} from "chums-components";
import {BaseSKU4} from "../ducks/settings/types";

const debug = Debug('chums:api:settings');

export interface SettingsAggregate {
    categories: ProductCategory[],
    colors: ProductColor[],
    countryOfOrigin: CountryOfOrigin[],
    lines: ProductLine[],
    mixes: ProductMixInfo[],
    primaryVendor: PrimaryVendor[],
    seasons: ProductSeason[],
    skuGroups: SKUGroup[],
    skuList: BaseSKU4[],
    status: ProductStatus[],
    subCategories: string[],
    warehouses: ProductWarehouse[]
}

export async function fetchSettings() {
    try {
        const {settings} = await fetchJSON<{
            settings: SettingsAggregate
        }>('/api/operations/production/pm/settings/chums');
        return settings;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("loadSettings()", err.message);
            return Promise.reject(err);
        }
        debug("loadSettings()", err);
        return Promise.reject(new Error('Error in loadSettings()'));
    }
}

