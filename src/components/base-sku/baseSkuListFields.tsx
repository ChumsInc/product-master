import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {BaseSKU} from "chums-types";
import FormattedUPC from "@/components/common/FormattedUPC.tsx";
import BaseSkuItemStats from "@/components/base-sku/BaseSkuItemStats.tsx";

export const baseSkuListFields: SortableTableField<BaseSKU>[] = [
    {id: 'sku', field: 'sku', title: 'SKU', sortable: true},
    {id: 'description', field: 'description', title: 'Description', sortable: true},
    {id: 'upc', field: 'upc', title: 'UPC', sortable: true, render: (row) => <FormattedUPC upc={row.upc}/>},
    {
        id: 'itemStats',
        field: 'itemStats',
        title: 'Items',
        render: (row) => <BaseSkuItemStats stats={row.itemStats ?? null}/>
    }
]

