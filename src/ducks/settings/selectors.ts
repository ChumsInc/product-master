import {RootState} from "../../app/configureStore";

export const selectSettingsLoading = (state: RootState) => state.settings.loading;
export const selectProductLines = (state: RootState) => state.settings.productLines;
export const selectProductStatus = (state: RootState) => state.settings.productStatus;
export const selectBaseSKUList = (state: RootState) => state.settings.baseSKUList;
export const selectColors = (state: RootState) => state.settings.colors;
export const selectCategories = (state: RootState) => state.settings.categories;
export const selectCountryOfOrigin = (state: RootState) => state.settings.countryOfOrigin;
export const selectMixes = (state: RootState) => state.settings.mixes;
export const selectSeasons = (state: RootState) => state.settings.seasons;
export const selectSKUGroups = (state: RootState) => state.settings.SKUGroups;
export const selectPrimaryVendors = (state: RootState) => state.settings.primaryVendors;
export const selectSubCategories = (state: RootState) => state.settings.subCategories;
export const selectWarehouses = (state: RootState) => state.settings.warehouses;

