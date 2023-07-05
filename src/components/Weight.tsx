import React from 'react';
import numeral from "numeral";

export interface WeightProps {
    weight?: number|null
}
const Weight = ({weight}:WeightProps) => {
    if (!weight || !Number(weight)) {
        return null;
    }
    return (<>{numeral(weight).format('0,0.000')}</>)
};

export default Weight;
