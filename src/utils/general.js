import {getContrastingColor} from 'react-color/lib/helpers/color';


export const noop = () => {};
export const now = () => new Date().valueOf();

export const calcVolume = ({length, width, height, quantity}) => {
    return !Number(quantity)
        ? 0
        : (Number(length) * Number(width) * Number(height)) / Number(quantity);
};


export const isLightColor = (hexColor) => {
    return getContrastingColor(hexColor) === '#000';
};
