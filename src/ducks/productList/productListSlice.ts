import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductMaster, ProductStatusAttributes, SortProps} from "chums-types";
import {loadProductList} from "@/ducks/productList/actions.ts";
import {dismissAlert} from "@chumsinc/alert-list";
import {defaultColumnStatus, filterProductsByStatus, productListSorter} from "@/ducks/productList/utils.ts";
import {LocalStore} from "@chumsinc/ui-utils";
import {productListColumnsKey, productListFilterKey, productListStatusFiltersKey} from "@/utils/storageKeys.ts";
import {loadProduct, saveProduct, saveProductAttributes} from "@/ducks/product/actions.ts";
import type {FlattenedProductMaster, ProductListColumns} from "@/ducks/productList/types.ts";

const adapter = createEntityAdapter<ProductMaster, number>({
    selectId: arg => arg.id,
    sortComparer: (a, b) => a.id - b.id
})

const selectors = adapter.getSelectors();

export interface ProductListFilter {
    productLine: string | null,
    skuGroup: number | null,
    season: number | null,
    search: string | null,
}


export interface ProductListState {
    status: 'idle' | 'loading' | 'rejected';
    sort: SortProps<FlattenedProductMaster>;
    filters: ProductListFilter;
    statusFilters: ProductStatusAttributes;
    columns: ProductListColumns;
}

const extraState: ProductListState = {
    status: 'idle',
    sort: {field: 'devCode', ascending: true},
    filters: LocalStore.getItem<ProductListFilter>(productListFilterKey, {
        productLine: null,
        skuGroup: null,
        season: null,
        search: null,
    }),
    statusFilters: LocalStore.getItem<ProductStatusAttributes>(productListStatusFiltersKey, {
        new: true,
        updating: true,
        approved: true,
        live: true,
        discontinued: false
    }),
    columns: LocalStore.getItem<ProductListColumns>(productListColumnsKey, defaultColumnStatus)
};

const productListSlice = createSlice({
    name: 'productList',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setProductListSort: (state, action: PayloadAction<SortProps<FlattenedProductMaster>>) => {
            state.sort = action.payload;
        },
        setProductLineFilter: (state, action: PayloadAction<string | null>) => {
            state.filters.productLine = action.payload;
        },
        setSkuGroupFilter: (state, action: PayloadAction<number | null>) => {
            state.filters.skuGroup = action.payload;
        },
        setSeasonFilter: (state, action: PayloadAction<number | null>) => {
            state.filters.season = action.payload;
        },
        setStatusFilter: (state, action: PayloadAction<Partial<ProductStatusAttributes>>) => {
            state.statusFilters.approved = action.payload.approved ?? state.statusFilters.approved;
            state.statusFilters.new = action.payload.new ?? state.statusFilters.new;
            state.statusFilters.updating = action.payload.updating ?? state.statusFilters.updating;
            state.statusFilters.live = action.payload.live ?? state.statusFilters.live;
            state.statusFilters.discontinued = action.payload.discontinued ?? state.statusFilters.discontinued;
        },
        setSearchFilter: (state, action: PayloadAction<string | null>) => {
            state.filters.search = action.payload;
        },
        setColumn: (state, action: PayloadAction<Partial<ProductListColumns>>) => {
            state.columns = {...state.columns, ...action.payload};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadProductList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loadProductList.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload)
            })
            .addCase(loadProductList.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadProductList.typePrefix) {
                    state.status = 'idle'
                }
            })
            .addCase(loadProduct.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(saveProductAttributes.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
    },
    selectors: {
        selectProductList: (state) => selectors.selectAll(state),
        selectProductListSort: (state) => state.sort,
        selectProductListStatus: (state) => state.status,
        selectProductLineFilter: (state) => state.filters.productLine,
        selectSkuGroupFilter: (state) => state.filters.skuGroup,
        selectSeasonFilter: (state) => state.filters.season,
        selectStatusFilter: (state) => state.statusFilters,
        selectSearchFilter: (state) => state.filters.search,
        selectColumns: (state) => state.columns,
    }
});

export default productListSlice;
export const {
    selectProductList,
    selectProductListSort,
    selectProductListStatus,
    selectProductLineFilter,
    selectSkuGroupFilter,
    selectSeasonFilter,
    selectStatusFilter,
    selectSearchFilter,
    selectColumns
} = productListSlice.selectors;
export const {
    setProductListSort,
    setProductLineFilter,
    setSkuGroupFilter,
    setSeasonFilter,
    setStatusFilter,
    setSearchFilter,
    setColumn
} = productListSlice.actions;

export const selectFilteredProductList = createSelector(
    [selectProductList, selectProductListSort, selectProductLineFilter, selectSkuGroupFilter, selectSeasonFilter, selectStatusFilter, selectSearchFilter],
    (list, sort, productLine, skuGroup, season, status, search) => {
        return list
            .filter(product => !productLine || product.productLine === productLine)
            .filter(product => !skuGroup || product.idSKUGroup === skuGroup)
            .filter(product => !season || product.season?.id === season)
            .filter(product => filterProductsByStatus(product, status))
            .filter(product => !search
                || product.devCode?.toLowerCase().includes(search.toLowerCase())
                || product.SKU?.toLowerCase().includes(search.toLowerCase())
                || product.name?.toLowerCase().includes(search.toLowerCase())
                || product.notes?.toLowerCase().includes(search.toLowerCase())
                || product.UPC?.toLowerCase().includes(search.toLowerCase())
            )
            .sort(productListSorter(sort));
    }
)
