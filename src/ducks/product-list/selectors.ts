import Debug from 'debug';
import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectCurrentPage, selectPageSet, selectRowsPerPage, selectTableSort} from "chums-connected-components";
import {ProductListSortProps, productListTableKey} from "./actionTypes";
import {productSorter} from "./utils";
import {filterPage} from "chums-components";
import {selectSeasons} from "../seasons/selectors";
import {defaultSeason} from "../seasons/actionTypes";

const debug = Debug('chums:ducks:product-list:selectors');


export const selectProductList = (state: RootState) => state.productList.list.products;
export const selectProductListLoading = (state: RootState) => state.productList.list.loading;
export const selectProductListLoaded = (state: RootState) => state.productList.list.loaded;

export const selectProductListLength = (state: RootState) => state.productList.list.products.length;

export const selectProductListPLFilter = (state: RootState) => state.productList.filters.productLine;
export const selectProductListSGFilter = (state: RootState) => state.productList.filters.skuGroupId;
export const selectProductListSeasonIDFilter = (state: RootState) => state.productList.filters.seasonId;
export const selectProductListStatusFilter = (state: RootState) => state.productList.filters.status
export const selectProductListSearchFilter = (state: RootState) => state.productList.filters.search;
export const selectProductListActiveFilter = (state: RootState) => state.productList.filters.active;

export const selectProductListSeason = createSelector(
    [selectProductListSeasonIDFilter, selectSeasons],
    (id, seasons) => {
        const [season] = seasons.filter(s => s.id === id);
        return season || {...defaultSeason};
    }
)

export const selectPage = (state:RootState) => selectPageSet(productListTableKey)(state).page;

export const selectFilteredProductList = createSelector(
    [
        selectProductList, selectProductListPLFilter, selectProductListSGFilter, selectProductListSeasonIDFilter,
        selectProductListStatusFilter, selectProductListSearchFilter,
        selectProductListActiveFilter
    ],
    (list, pl, skuGroupId, seasonId, status, search, isActive) => {
        let re: RegExp;
        if (search) {
            try {
                re = new RegExp(search, 'i');
            } catch (err: unknown) {
            }
        }
        return list.filter(p => !pl || p.productLine === pl)
            .filter(p => !skuGroupId || p.idSKUGroup === skuGroupId)
            .filter(p => !seasonId || p.season?.id === seasonId)
            .filter(p => status === '' || p.status[status])
            .filter(p => !isActive || p.active)
            .filter(p => !search || re.test(p.SKU) || re.test(p.name))
    }
)
export const selectFilteredProductListLength = createSelector([selectFilteredProductList], (list) => list.length);

export const selectPagedProductList = createSelector(
    [selectFilteredProductList, selectTableSort(productListTableKey), selectPage, selectRowsPerPage(productListTableKey)],
    (list, sort, page, rowsPerPage) => {
        debug('selectPagedProductList()', {length: list.length, page, rowsPerPage});
        return list
            .sort(productSorter(sort as ProductListSortProps))
            .filter(filterPage(page, rowsPerPage))
    }
);
