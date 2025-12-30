import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {SKUGroup} from "chums-types";

export const skuGroupFields: SortableTableField<SKUGroup>[] = [
    {id: 'code', field: 'code', title: 'Code', sortable: true},
    {id: 'description', field: 'description', title: 'Description', sortable: true},
    {id: 'productLine', field: 'productLine', title: 'Product Line', sortable: true},
    {id: 'notes', field: 'notes', title: 'Notes', sortable: true}
]
