import type {BaseSKU, SortProps} from "chums-types";

export const baseSkuSorter = (sort: SortProps<BaseSKU>) => (a: BaseSKU, b: BaseSKU) => {
    const sortMod = sort.ascending ? 1 : -1;
    const field = sort.field;
    switch (field) {
        case 'sku':
        case 'upc':
        case 'description':
            return (
                (a[field] ?? '').localeCompare(b[field] ?? '') === 0
                    ? (a.id - b.id)
                    : (a[field] ?? '').localeCompare(b[field] ?? '')
            ) * sortMod;
        case 'id':
        default:
            return (a.id - b.id) * sortMod;
    }
}
