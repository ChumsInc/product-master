import type {SortableTableField} from "@chumsinc/sortable-tables";
import type {SKUGroup} from "chums-types";
import {generatePath, Link} from "react-router";

export const skuGroupFields: SortableTableField<SKUGroup>[] = [
    {
        id: 'code',
        field: 'code',
        title: 'Code',
        sortable: true,
        render: (row) => (
            <Link to={generatePath('/sku-groups/:id', {id: `${row.id}`})}>
                {row.code}
            </Link>
        )
    },
    {
        id: 'description', field: 'description', title: 'Description', sortable: true, render: (row) => (
            <Link to={generatePath('/sku-groups/:id', {id: `${row.id}`})}>
                {row.description}
            </Link>
        )
    },
    {id: 'productLine', field: 'productLine', title: 'Product Line', sortable: true},
    {id: 'notes', field: 'notes', title: 'Notes', sortable: true}
]
