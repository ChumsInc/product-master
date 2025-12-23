import ProductListFilter from "@/components/product-list/ProductListFilter.tsx";
import {DataTableProvider} from "@chumsinc/sortable-tables";
import ProductListTable from "@/components/product-list/ProductListTable.tsx";
import {getProductListColumns} from "@/components/product-list/ProductListColumns.tsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";
import {useAppDispatch} from "@/app/configureStore.ts";
import {useEffect} from "react";
import {loadProductList} from "@/ducks/productList/actions.ts";

export default function ProductListContainer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadProductList());
    }, [dispatch]);

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
