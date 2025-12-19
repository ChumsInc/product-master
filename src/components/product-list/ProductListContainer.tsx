import ProductListFilter from "@/components/product-list/ProductListFilter.tsx";
import {DataTableProvider} from "@chumsinc/sortable-tables";
import ProductListTable from "@/components/product-list/ProductListTable.tsx";
import {productListColumns} from "@/components/product-list/ProductListColumns.tsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallbackComponent from "@/components/common/ErrorFallbackComponent.tsx";

export default function ProductListContainer() {
    return (
        <div>
            <h2>Product List</h2>
            <ProductListFilter/>
            <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                <DataTableProvider initialFields={productListColumns}>
                    <ProductListTable />
                </DataTableProvider>
            </ErrorBoundary>
        </div>
    )
}
