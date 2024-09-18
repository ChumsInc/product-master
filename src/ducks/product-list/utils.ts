import {ProductListField, ProductSize} from "./actionTypes";
import {ProductMaster} from "chums-types";
import {getProperty} from 'dot-prop';
import {ProductSortProps} from "../types";

export const productListTableKey = 'product-list';

export const productSorter = (sort: ProductSortProps) => (a: ProductMaster, b: ProductMaster): number => {
    const {field, ascending} = sort;
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'id':
        case 'idSKUGroup':
            return (a[field] - b[field]) * sortMod;
        case 'season':
            return ((a.season?.code || '') === (b.season?.code || ''))
                ? productSorter({field: 'id', ascending})(a, b)
                : ((a.season?.code || '') > (b.season?.code || '') ? 1 : -1) * sortMod;
        case 'productLine':
        case 'SKU':
        case 'devCode':
        case 'name':
        case 'category':
        case 'subCategory':
        case 'UPC':
            return ((a[field] || '') === (b[field] || ''))
                ? productSorter({field: 'id', ascending})(a, b)
                : ((a[field] || '') > (b[field] || '') ? 1 : -1) * sortMod;
        case 'itemQuantity':
        case 'stdPrice':
        case 'suggestedRetailPrice':
            return Number(a[field] || 0) === Number(b[field] || 0)
                ? productSorter({field: 'id', ascending})(a, b)
                : (Number(a[field] || 0) - (Number(b[field] || 0))) * sortMod;
        case 'attributes.dimensions.weight':
        case 'attributes.shippingDimensions.weight':
        case 'attributes.casePackDimensions.quantity':
        case 'attributes.casePackDimensions.weight':
            return ((getProperty<ProductMaster, ProductListField>(a, field) || 0) - (getProperty<ProductMaster, ProductListField>(b, field) || 0)) * sortMod;
        case 'attributes.casePackDimensions.length': // used for Volume field
            return (new ProductSize(a.attributes?.casePackDimensions).volume - new ProductSize(b.attributes?.casePackDimensions).volume) * sortMod;
        default:
            return (a.id - b.id) * sortMod;
    }
}

