import type {ProductLine, ProductSeason, SKUGroup, SortProps} from "chums-types";

export function productLineSorter(a: ProductLine, b: ProductLine) {
    return a.ProductLineDesc.toLowerCase().localeCompare(b.ProductLineDesc.toLowerCase()) === 0
        ? a.ProductLine.localeCompare(b.ProductLine)
        : a.ProductLineDesc.toLowerCase().localeCompare(b.ProductLineDesc.toLowerCase())
}

export const skuGroupSorter = (sort: SortProps<SKUGroup>) =>
    (a: SKUGroup, b: SKUGroup) => {
        const field = sort.field;
        const sortMod = sort.ascending ? 1 : -1;
        switch (field) {
            case 'code':
            case "description":
            case 'notes':
                return (
                    (a[field] ?? '').localeCompare(b[field] ?? '') === 0
                        ? a.id - b.id
                        : (a[field] ?? '').localeCompare(b[field] ?? '')
                ) * sortMod;
            case "id":
            default:
                return (a.id - b.id) * sortMod;

        }
    }

export const seasonSorter = (sort: SortProps<ProductSeason>) =>
    (a: ProductSeason, b: ProductSeason) => {
        const sortMod = sort.ascending ? 1 : -1;
        const field = sort.field;
        switch (field) {
            case 'code':
            case 'description':
            case 'notes':
                return (
                    (a[field] ?? '').localeCompare(b[field] ?? '') === 0
                        ? a.id - b.id
                        : (a[field] ?? '').localeCompare(b[field] ?? '')
                ) * sortMod;
            case "id":
            default:
                return (a.id - b.id) * sortMod;
        }
    }
