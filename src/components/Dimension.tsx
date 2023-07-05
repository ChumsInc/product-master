import React from 'react';
import {ProductDimension} from "chums-types";

export interface DimensionProps {
    dimension?: ProductDimension
}

const Dimension = ({dimension}:DimensionProps) => {
    if (!dimension?.length && !dimension?.width && !dimension?.height) {
        return null;
    }

    const dims = [length, dimension.width, dimension.height].filter(d => !!d).join(' x ');
    return (
        <>{dims}</>
    )
};

export default Dimension;
