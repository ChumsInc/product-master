import React from 'react';
import {calcVolume} from "../utils/general";
import {ProductDimension} from "chums-types";
import numeral from "numeral";

export interface VolumeProps {
    dimensions?: ProductDimension,
}

const Volume = ({dimensions}: VolumeProps) => {
    if (!dimensions) {
        return null;
    }
    const {length, width, height, quantity} = dimensions;
    if (!length || !width || !height || !quantity) {
        return null;
    }
    const volume = calcVolume({length, width, height, quantity});
    return (<>{numeral(volume).format('0,0.0000')}</>);
};

export default Volume;
