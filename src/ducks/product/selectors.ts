import {RootState} from "../../app/configureStore";


export const selectCurrentProduct = (state:RootState) => state.product.currentProduct;
export const selectProductLoading = (state:RootState) => state.product.loading;
export const selectProductLoaded = (state:RootState) => state.product.loaded;
export const selectProductLoadError = (state:RootState) => state.product.loadError;
