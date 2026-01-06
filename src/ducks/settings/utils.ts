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
            case 'productLine':
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

const seasonPattern = /^(\S{2})(\d{2})$/i;

const seasonSplit = (code: string): string => {
    if (seasonPattern.test(code)) {
        const match = seasonPattern.exec(code);
        if (!match) {
            return code;
        }
        return `${match[2]}-${match[1]}`;
    }
    return code;
}

export const seasonSorter = (sort: SortProps<ProductSeason>) =>
    (a: ProductSeason, b: ProductSeason) => {
        const sortMod = sort.ascending ? 1 : -1;
        const field = sort.field;
        switch (field) {
            case 'code':
                return (
                    seasonSplit(a[field] ?? '').localeCompare(seasonSplit(b[field] ?? '')) === 0
                        ? a.id - b.id
                        : seasonSplit(a[field] ?? '').localeCompare(seasonSplit(b[field] ?? ''))
                ) * sortMod;
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
