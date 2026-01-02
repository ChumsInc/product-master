import type {ProductAttributes, ProductDimension, ProductMaster, ProductStatusAttributes, SortProps} from "chums-types";
import Decimal from "decimal.js";
import type {Flatten} from "@/types/utils.ts";
import type {
    FlattenedProductMaster,
    ProductListColumnNames,
    ProductListColumns,
    ProductMasterColumn
} from "@/ducks/productList/types.ts";
import {LocalStore} from "@chumsinc/ui-utils";
import type {DataTableField} from "@chumsinc/sortable-tables";

export const productListSorter = (sort: SortProps<Flatten<ProductMaster>>) =>
    (a: ProductMaster, b: ProductMaster): number => {
        const sortMod = sort.ascending ? 1 : -1;
        const field = sort.field as keyof ProductMaster;
        switch (field) {
            case 'devCode':
                return (
                    (a.devCode ?? '').localeCompare(b.devCode ?? '') === 0
                        ? (
                            (a.SKU ?? '').localeCompare(b.SKU ?? '') === 0
                                ? a.id - b.id
                                : (a.SKU ?? '').localeCompare(b.SKU ?? '')
                        )
                        : (a.devCode ?? '').localeCompare(b.devCode ?? '')
                ) * sortMod;
            case 'name':
            case 'SKU':
            case 'UPC':
            case 'productType':
            case 'productLine':
            case 'category':
            case 'subCategory':
            case 'dateCreated':
            case 'dateUpdated':
                return (
                    (a[field] ?? '').localeCompare(b[field] ?? '') === 0
                        ? (
                            (a.SKU ?? '').localeCompare(b.SKU ?? '') === 0
                                ? a.id - b.id
                                : (a.SKU ?? '').localeCompare(b.SKU ?? '')
                        )
                        : (a[field] ?? '').localeCompare(b[field] ?? '')
                ) * sortMod;
            case 'suggestedRetailPrice':
            case 'stdPrice':
            case 'stdCost':
            case 'itemQuantity':
                return (
                    new Decimal(a[field] ?? 0).minus(new Decimal(b[field] ?? 0)).eq(0)
                        ? (
                            (a.SKU ?? '').localeCompare(b.SKU ?? '') === 0
                                ? a.id - b.id
                                : (a.SKU ?? '').localeCompare(b.SKU ?? '')
                        )
                        : Decimal(a[field] ?? 0).minus(new Decimal(b[field] ?? 0)).toNumber()
                ) * sortMod;
                case 'season':
                    return (
                        (a.season?.id ?? 0) === ( b.season?.id ?? 0)
                        ? a.id - b.id
                        : (a.season?.id ?? 0) - ( b.season?.id ?? 0)
                    ) * sortMod;
            case 'id':
                return (
                    a.id - b.id
                ) * sortMod
        }
        if (field.startsWith('attributes.')) {
            const val = productAttributesSorter(sort)(a, b);
            return (
                val === 0
                    ? productListSorter({field: 'id', ascending: true})({...a, attributes: undefined}, {
                        ...b,
                        attributes: undefined
                    })
                    : val
            ) * sortMod;
        }

        return a.id - b.id;
    }

export const productAttributesSorter = (sort: SortProps<Flatten<ProductMaster>>) =>
    (a: ProductMaster, b: ProductMaster): number => {
        const field = sort.field;
        const fields = field.toLocaleString().split('.');
        const subField1 = fields[1] as keyof ProductAttributes;
        switch (subField1) {
            case 'dimensions':
            case 'casePackDimensions':
            case 'shippingDimensions':
                return productDimensionsSorter(sort)(a, b)
            default:
                return 0;
        }

    }

export const productDimensionsSorter = (sort: SortProps<Flatten<ProductMaster>>) =>
    (a: ProductMaster, b: ProductMaster): number => {
        const field = sort.field;
        const fields = field.toLocaleString().split('.');
        const subField1 = fields[1] as keyof Pick<ProductAttributes, 'dimensions' | 'shippingDimensions' | 'casePackDimensions'>;
        const subField2 = fields[2] as keyof ProductDimension | undefined;
        switch (subField2) {
            case 'weight':
            case 'length':
            case 'width':
            case 'height':
            case 'quantity':
                return (
                    +(a.attributes?.[subField1]?.[subField2] ?? 0) - +(b.attributes?.[subField1]?.[subField2] ?? 0)
                )
            case 'volume': {
                const volumeA = +(a.attributes?.[subField1]?.width ?? 0) * +(a.attributes?.[subField1]?.length ?? 0) * +(a.attributes?.[subField1]?.height ?? 0) * +(a.attributes?.[subField1]?.quantity ?? 1);
                const volumeB = +(a.attributes?.[subField1]?.width ?? 0) * +(b.attributes?.[subField1]?.length ?? 0) * +(b.attributes?.[subField1]?.height ?? 0) * +(a.attributes?.[subField1]?.quantity ?? 1);
                return volumeA - volumeB;
            }
            default: {
                return dimensionsToString(a.attributes?.[subField1], true).localeCompare(dimensionsToString(b.attributes?.[subField1], true))
            }
        }
    }

export function productHasStatus(product: ProductMaster, status: keyof ProductStatusAttributes) {
    return product?.status[status]
}

export function filterProductsByStatus(product: ProductMaster, status: ProductStatusAttributes) {
    return (status.new && productHasStatus(product, 'new'))
        || (status.approved && productHasStatus(product, 'approved'))
        || (status.live && productHasStatus(product, 'live'))
        || (status.updating && productHasStatus(product, 'updating'))
        || (status.watch && productHasStatus(product, 'watch'))
        || (status.discontinued && productHasStatus(product, 'discontinued'))
}

export function dimensionsToString(dimensions: ProductDimension | undefined, includeQuantity = false): string {
    if (!dimensions || !(dimensions.width || dimensions.length || dimensions.height || dimensions.quantity)) {
        return '';
    }
    if (!includeQuantity) {
        if (!dimensions.height) {
            return `${dimensions.width} x ${dimensions.length}`;
        }
        return `${dimensions.width} x ${dimensions.length} x ${dimensions.height}`;
    }
    if (!dimensions.height) {
        return `${dimensions.width} x ${dimensions.length} (${dimensions.quantity})`;
    }
    return `${dimensions.width} x ${dimensions.length} x ${dimensions.height} (${dimensions.quantity})`;
}

export const columns: ProductMasterColumn[] = [
    'id',
    'devCode',
    'SKU',
    'name',
    'season',
    'status',
    'productLine',
    'category',
    'subCategory',
    'idSKUGroup',
    'UPC',
    'stdPrice',
    'suggestedRetailPrice',
    'stdCost',
    'attributes.dimensions',
    'attributes.dimensions.weight',
    'attributes.dimensions.volume',
    'attributes.shippingDimensions',
    'attributes.shippingDimensions.weight',
    'attributes.shippingDimensions.volume',
    'attributes.casePackDimensions',
    'attributes.casePackDimensions.weight',
    'attributes.casePackDimensions.volume',
    'dateCreated',
    'dateUpdated',
    'itemQuantity',
    'notes',
];

export const defaultColumnStatus: ProductListColumns = {
    id: false,
    devCode: true,
    SKU: true,
    name: true,
    season: true,
    status: true,
    productLine: true,
    category: true,
    idSKUGroup: true,
    UPC: true,
    stdPrice: true,
    suggestedRetailPrice: true,
    stdCost: false,
    'attributes.dimensions': false,
    'attributes.dimensions.weight': true,
    'attributes.dimensions.volume': false,
    'attributes.shippingDimensions': false,
    'attributes.shippingDimensions.weight': false,
    'attributes.shippingDimensions.volume': false,
    'attributes.casePackDimensions': false,
    'attributes.casePackDimensions.weight': true,
    'attributes.casePackDimensions.volume': false,
    dateCreated: false,
    dateUpdated: true,
    itemQuantity: false,
    notes: false,
    productType: false,
    subCategory: false,
    color: false,
}

export const columnNames: ProductListColumnNames = {
    id: 'ID',
    devCode: 'Dev Code',
    SKU: 'SKU',
    name: 'Name',
    season: 'Season',
    status: 'Status',
    color: "Color",
    productType: "Product Type",
    subCategory: "Collection",
    productLine: 'P/L',
    category: 'Cat',
    idSKUGroup: 'SKU Group',
    UPC: 'UPC',
    stdPrice: 'Wholesale',
    suggestedRetailPrice: 'MSRP',
    stdCost: 'Std. Cost',
    'attributes.dimensions': 'Dimensions',
    'attributes.dimensions.weight': 'Weight',
    'attributes.dimensions.volume': 'Volume',
    'attributes.shippingDimensions': 'Packaged Dimensions',
    'attributes.shippingDimensions.weight': 'Packaged Weight',
    'attributes.shippingDimensions.volume': 'Packaged Volume',
    'attributes.casePackDimensions': 'Inner Pack Dimensions',
    'attributes.casePackDimensions.weight': 'Inner Pack Weight',
    'attributes.casePackDimensions.volume': 'Inner Pack Volume',
    dateCreated: 'Created',
    dateUpdated: 'Updated',
    itemQuantity: 'QOH',
    notes: 'Notes'
}

export function saveColumnStatus(status: ProductListColumns): void {
    LocalStore.setItem<ProductListColumns>('productListColumns', status);
}

export function loadColumnStatus(): ProductListColumns {
    return LocalStore.getItem<ProductListColumns>('productListColumns', defaultColumnStatus);
}

export function prepColumnVisibility(fields: DataTableField<FlattenedProductMaster>[]): DataTableField<FlattenedProductMaster>[] {
    const status = loadColumnStatus();
    return fields.map(field => {
        const key = field.field as keyof ProductListColumns;
        const visible: boolean = status[key] !== false;
        return {...field, visible}
    })
}

