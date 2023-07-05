import {ProductDimension} from "chums-types";
import {ProductSize} from "../ducks/product-list/actionTypes";


export const noop = () => {};
export const now = () => new Date().valueOf();

export const calcVolume = (dims?:ProductDimension):number => {
    if (!dims) {
        return 0;
    }
    return new ProductSize(dims).volume;
};
