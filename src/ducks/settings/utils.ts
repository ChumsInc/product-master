import {ProductLine} from "chums-types";

export const productLineSorter = (field?:keyof ProductLine) => (a:ProductLine, b:ProductLine):number => {
    switch (field) {
    case 'ProductLineDesc':
        return a.ProductLineDesc.toLowerCase() === b.ProductLineDesc.toLowerCase()
            ? (a.ProductLine > b.ProductLine ? 1 : -1)
            : (a.ProductLineDesc.toLowerCase() > b.ProductLineDesc.toLowerCase() ? 1 : -1);
    default:
        return (a.ProductLine > b.ProductLine ? 1 : -1);
    }
}
