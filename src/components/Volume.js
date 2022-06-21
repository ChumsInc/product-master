import React, {Fragment} from 'react';
import {calcVolume} from "../utils/general";

const Volume = ({length, width, height, quantity}) => {
    if (!length && !width && !height && !quantity) {
        return null;
    }
    return !Number(quantity)
        ? null
        : (<Fragment>{calcVolume({length, width, height, quantity}).toFixed(4)}</Fragment>);
};

export default Volume;
