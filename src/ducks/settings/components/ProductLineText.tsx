import React from 'react';
import {useSelector} from 'react-redux';
import {selectProductLines} from "../selectors";

export interface ProductLineTextProps {
    productLine: string|null,
}

const ProductLineText = ({productLine}: ProductLineTextProps) => {
    const lines = useSelector(selectProductLines);
    const [pl] = lines.filter(line => line.ProductLine === productLine);

    if (!pl) {
        return null;
    }
    return (
        <>{pl?.ProductLineDesc || '-'} ({pl?.ProductLine || productLine})</>
    );
}
export default ProductLineText;
