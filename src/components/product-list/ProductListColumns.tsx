import type {DataTableField} from '@chumsinc/sortable-tables'
import {columnNames, dimensionsToString} from "@/ducks/productList/utils.ts";
import type {FlattenedProductMaster} from "@/ducks/productList/types.ts";

export const productListColumns: DataTableField<FlattenedProductMaster>[] = [
    {id: 'id', field: 'id', title: columnNames.id, sortable: true},
    {id: 'devCode', field: 'devCode', title: columnNames.devCode, sortable: true},
    {id: 'SKU', field: 'SKU', title: columnNames.SKU, sortable: true},
    {id: 'name', field: 'name', title: columnNames.name, sortable: true},
    {id: 'season', field: 'season', title: columnNames.season, sortable: true, render: (row) => row.season?.code ?? null},
    {id: 'status', field: 'status', title: columnNames.status, sortable: true, render: (row) => JSON.stringify(row.status)},
    {id: 'productLine', field: 'productLine', title: columnNames.productLine, sortable: true},
    {id: 'category', field: 'category', title: columnNames.category, sortable: true},
    {id: 'idSKUGroup', field: 'idSKUGroup', title: columnNames.idSKUGroup, sortable: true},
    {id: 'UPC', field: 'UPC', title: columnNames.UPC, sortable: true},
    {id: 'stdPrice', field: 'stdPrice', title: columnNames.stdPrice, sortable: true},
    {
        id: 'suggestedRetailPrice',
        field: 'suggestedRetailPrice',
        title: columnNames.suggestedRetailPrice,
        sortable: true
    },
    {id: 'stdCost', field: 'stdCost', title: columnNames.stdCost, sortable: true},
    {
        id: 'attributes.dimensions',
        field: 'attributes.dimensions',
        title: columnNames['attributes.dimensions'],
        sortable: true,
        render: (row) => dimensionsToString(row.attributes?.dimensions)
    },
    {
        id: 'attributes.dimensions.weight',
        field: 'attributes.dimensions.weight',
        title: columnNames['attributes.dimensions.weight'],
        sortable: true
    },
    {
        id: 'attributes.dimensions.volume',
        field: 'attributes.dimensions.volume',
        title: columnNames['attributes.dimensions.volume'],
        sortable: true
    },
    {
        id: 'attributes.shippingDimensions',
        field: 'attributes.shippingDimensions',
        title: columnNames['attributes.shippingDimensions'],
        sortable: true,
        render: (row) => dimensionsToString(row.attributes?.shippingDimensions)
    },
    {
        id: 'attributes.shippingDimensions.weight',
        field: 'attributes.shippingDimensions.weight',
        title: columnNames['attributes.shippingDimensions.weight'],
        sortable: true
    },
    {
        id: 'attributes.shippingDimensions.volume',
        field: 'attributes.shippingDimensions.volume',
        title: columnNames['attributes.shippingDimensions.volume'],
        sortable: true
    },
    {
        id: 'attributes.casePackDimensions',
        field: 'attributes.casePackDimensions',
        title: columnNames['attributes.casePackDimensions'],
        sortable: true,
        render: (row) => dimensionsToString(row.attributes?.casePackDimensions)
    },
    {
        id: 'attributes.casePackDimensions.weight',
        field: 'attributes.casePackDimensions.weight',
        title: columnNames['attributes.casePackDimensions.weight'],
        sortable: true
    },
    {
        id: 'attributes.casePackDimensions.volume',
        field: 'attributes.casePackDimensions.volume',
        title: columnNames['attributes.casePackDimensions.volume'],
        sortable: true
    },
    {id: 'dateCreated', field: 'dateCreated', title: columnNames.dateCreated, sortable: true},
    {id: 'dateUpdated', field: 'dateUpdated', title: columnNames.dateUpdated, sortable: true},
    {id: 'itemQuantity', field: 'itemQuantity', title: columnNames.itemQuantity, sortable: true},
    {id: 'notes', field: 'notes', title: columnNames.notes, sortable: true},
]
