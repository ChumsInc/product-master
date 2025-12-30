import ProductListFilter from "@/components/product-list/ProductListFilter.tsx";
import {DataTableProvider} from "@chumsinc/sortable-tables";
import ProductListTable from "@/components/product-list/ProductListTable.tsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {useEffect} from "react";
import {loadProductList} from "@/ducks/productList/actions.ts";
import {getProductListColumns} from "@/components/product-list/productListColumns.tsx";
import {selectProductListLoaded} from "@/ducks/productList/productListSlice.ts";

export default function ProductListContainer() {
    const dispatch = useAppDispatch();
    const loaded = useAppSelector(selectProductListLoaded)
    useEffect(() => {
        if (!loaded) {
            dispatch(loadProductList());
        }
    }, [dispatch, loaded]);

    return (
        <div>
            <h2>Product List</h2>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                <DataTableProvider initialFields={getProductListColumns()}>
                    <ProductListFilter/>
                    <ProductListTable/>
                </DataTableProvider>
            </ErrorBoundary>
        </div>
    )
}
