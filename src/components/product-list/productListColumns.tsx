import type {DataTableField} from '@chumsinc/sortable-tables'
import {columnNames, dimensionsToString, prepColumnVisibility} from "@/ducks/productList/utils.ts";
import type {FlattenedProductMaster} from "@/ducks/productList/types.ts";
import StatusList from "@/components/status/StatusList.tsx";
import SeasonBadge from "@/components/season/SeasonBadge.tsx";
import {formatGTIN} from "@chumsinc/gtin-tools";
import {friendlyDate} from "@/utils/date.ts";
import numeral from 'numeral';
import {Link} from "react-router";
import {productEditLink} from "@/utils/nav-links.ts";

const productListColumns: DataTableField<FlattenedProductMaster>[] = [
    {
        id: 'id',
        field: 'id',
        title: columnNames.id,
        sortable: true,
        render: (row) => <Link to={productEditLink(row)}>{row.id}</Link>
    },
    {id: 'devCode', field: 'devCode', title: columnNames.devCode, sortable: true, render: (row) => <Link to={productEditLink(row)}>{row.devCode}</Link>},
    {id: 'SKU', field: 'SKU', title: columnNames.SKU, sortable: true, render: (row) => <Link to={productEditLink(row)}>{row.SKU}</Link>},
    {id: 'name', field: 'name', title: columnNames.name, sortable: true, render: (row) => <Link to={productEditLink(row)}>{row.name}</Link>},
    {
        id: 'season',
        field: 'season',
        title: columnNames.season,
        sortable: true,
        render: (row) => <SeasonBadge seasonId={row.season?.id}/>
    },
    {
        id: 'status',
        field: 'status',
        title: columnNames.status,
        sortable: true,
        render: (row) => <StatusList status={row.status}/>
    },
    {id: 'productLine', field: 'productLine', title: columnNames.productLine, sortable: true},
    {id: 'category', field: 'category', title: columnNames.category, sortable: true},
    {id: 'subCategory', field: 'subCategory', title: columnNames.subCategory, sortable: true},
    {id: 'idSKUGroup', field: 'idSKUGroup', title: columnNames.idSKUGroup, sortable: true},
    {id: 'UPC', field: 'UPC', title: columnNames.UPC, sortable: true, render: (row) => formatGTIN(row.UPC)},
    {id: 'stdPrice', field: 'stdPrice', title: columnNames.stdPrice, sortable: true, align: 'end'},
    {
        id: 'suggestedRetailPrice',
        field: 'suggestedRetailPrice',
        title: columnNames.suggestedRetailPrice,
        sortable: true,
        align: "end"
    },
    {id: 'stdCost', field: 'stdCost', title: columnNames.stdCost, sortable: true, align: 'end'},
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
        sortable: true,
        render: (row) => row.attributes?.dimensions?.weight ?? null,
        align: 'end'
    },
    {
        id: 'attributes.dimensions.volume',
        field: 'attributes.dimensions.volume',
        title: columnNames['attributes.dimensions.volume'],
        sortable: true,
        render: (row) => row.attributes?.dimensions?.volume ?? null,
        align: 'end'
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
        sortable: true,
        render: (row) => row.attributes?.shippingDimensions?.weight ?? null,
        align: 'end'
    },
    {
        id: 'attributes.shippingDimensions.volume',
        field: 'attributes.shippingDimensions.volume',
        title: columnNames['attributes.shippingDimensions.volume'],
        sortable: true,
        render: (row) => row.attributes?.shippingDimensions?.volume ?? null,
        align: 'end',
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
    {
        id: 'dateCreated',
        field: 'dateCreated',
        title: columnNames.dateCreated,
        sortable: true,
        render: (row) => friendlyDate(row.dateCreated),
        align: 'end'
    },
    {
        id: 'dateUpdated',
        field: 'dateUpdated',
        title: columnNames.dateUpdated,
        sortable: true,
        render: (row) => friendlyDate(row.dateUpdated),
        align: 'end'
    },
    {
        id: 'itemQuantity',
        field: 'itemQuantity',
        title: columnNames.itemQuantity,
        sortable: true,
        render: (row) => numeral(row.itemQuantity).format('0,0'),
        align: 'end'
    },
    {id: 'notes', field: 'notes', title: columnNames.notes, sortable: true},
]

export function getProductListColumns() {
    return prepColumnVisibility(productListColumns)
}
