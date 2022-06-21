import {fetchGET, fetchPOST} from '../utils/fetch';
import {
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_PRODUCT,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_ITEMS,
    FETCH_PRODUCT_LIST,
    FETCH_PRODUCT_LIST_FAILURE,
    FETCH_SUCCESS,
    RECEIVE_ATTRIBUTES,
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCT_LIST,
    SAVE_ATTRIBUTES,
    SAVE_PRODUCT,
    SELECT_PRODUCT, SET_PRODUCT_SECTION,
    UPDATE_PRODUCT
} from "../constants/actions";
import {setAlert} from "./app";
import {DEFAULT_PRODUCT} from "../constants/defaults";

export const newProduct = () => ({type: SELECT_PRODUCT, product: DEFAULT_PRODUCT});

export const updateProduct = (prop) => ({type: UPDATE_PRODUCT, prop});
export const updateProductAttributes = (attribute) => ({})

export const selectProduct = (product) => (dispatch, getState) => {
    dispatch({type: SELECT_PRODUCT, product});
    if (product.id) {
        dispatch(getProduct(product.id));
    }
};

export const saveProduct = () => (dispatch, getState) => {
    const {app, product} = getState();
    const {company} = app;
    const {selected} = product;
    dispatch({type: SAVE_PRODUCT, status: FETCH_INIT});
    const url = '/node-dev/production/pm/product';
    return fetchPOST(url, {...selected, company})
        .then(({product}) => {
            dispatch({type: SAVE_PRODUCT, status: FETCH_SUCCESS, product});
        })
        .catch(err => {
            dispatch({type: SAVE_PRODUCT, status: FETCH_FAILURE});
            dispatch(setAlert({message: 'The product failed to save: ' + err.message}));
        });
};

export const saveAttributes = ({changed, productId, ...attributes}) => (dispatch, getState) => {
    dispatch({type: SAVE_ATTRIBUTES, status: FETCH_INIT});
    const url = '/node-dev/production/pm/product/:productId/attributes'
        .replace(':productId', encodeURIComponent(productId));
    fetchPOST(url, attributes)
        .then(response => {
            const {attributes} = response;
            dispatch({type: SAVE_ATTRIBUTES, status: FETCH_SUCCESS, attributes});
        })
        .catch(err => {
            dispatch({type: SAVE_ATTRIBUTES, status: FETCH_FAILURE});
            dispatch(setAlert({message: 'The product failed to save attributes: ' + err.message}));
        });
};

export const getProduct = (id) => (dispatch, getState) => {
    dispatch({type: FETCH_PRODUCT, status: FETCH_INIT});
    const url = '/node-dev/production/pm/products/:id'
        .replace(':id', encodeURIComponent(id));
    fetchGET(url)
        .then(({product}) => {
            dispatch({type: FETCH_PRODUCT, status: FETCH_SUCCESS, product});
        })
        .catch(err => {
            dispatch({type: FETCH_PRODUCT, status: FETCH_FAILURE});
            dispatch(setAlert({message: `Unable to load product: ${err.message}`}));
        })
};

export const getProductList = () => (dispatch, getState) => {
    dispatch({type: FETCH_PRODUCT_LIST, status: FETCH_INIT});
    const url = '/node-dev/production/pm/products';
    fetchGET(url)
        .then(products => {
            dispatch({type: FETCH_PRODUCT_LIST, status: FETCH_SUCCESS, list: products});
        })
        .catch(err => {
            dispatch({type: FETCH_PRODUCT_LIST, status: FETCH_FAILURE});
            dispatch(setAlert({message: `Unable to load product: ${err.message}`}));
        })
};

export const setProductSection = (section) => ({type: SET_PRODUCT_SECTION, section});

export const assignNextColorUPC = (item) => (dispatch, getState) => {
    const {app} = getState();
    if (!app.isAdmin) {
        return;
    }
    fetchGET('/node-dev/sku/by-color/next')
        .then(res => {
            if (!res.result) {
                throw new Error('Unable to fetch next Color UPC');
            }
            const upc = res.result;
            const data = {...item, UDF_UPC_BY_COLOR: upc, upc};
            return fetchPOST('/node-dev/sku/by-color', data);
        })
        .then(res => {
            // const [item] = res.result;
            // item.key = item.ItemCode;
            // item.active = !(item.InactiveItem === 'Y' || item.ProductType === 'D');
            // item.notes = item.notes || '';
            // dispatch({type: RECEIVE_SKU_ITEM, item});
            // const data = {
            //     Company: item.company,
            //     ItemCode: item.ItemCode,
            //     UDF_UPC_BY_COLOR: item.upc,
            //     action: 'update',
            //     id: item.id,
            // };
            // return fetchPOST('/sage/api/item-upc.php', data);
        })
        .then(res => {
            // const {post} = res;
            // return fetchPOST('/node-dev/sku/by-color/update-item', post);
        })
        .then(res => {
            // const [item] = res.result;
            // item.key = item.ItemCode;
            // item.active = !(item.InactiveItem === 'Y' || item.ProductType === 'D');
            // item.notes = item.notes || '';
            // dispatch({type: RECEIVE_SKU_ITEM, item});
        })
        .catch(err => {
            dispatch(setAlert({message: `Unable to assign color UPC: ${err.message}`}));
        });
};


export const loadItems = (sku) => (dispatch) => {
    if (!sku) {
        dispatch({type: FETCH_PRODUCT_ITEMS, status: FETCH_SUCCESS, items: []});
        return;
    }
    const url = '/node-dev/sku/:sku'.replace(':sku', sku);
    dispatch({type: FETCH_PRODUCT_ITEMS, status: FETCH_INIT});
    fetchGET(url)
        .then(res => {
            const items = res.result
                .map(item => ({
                    ...item,
                    key: item.ItemCode,
                    active: !(item.InactiveItem === 'Y' || item.ProductType === 'D'),
                    notes: item.notes || ''
                }));
            dispatch({type: FETCH_PRODUCT_ITEMS, status: FETCH_SUCCESS, items});
        })
        .catch(err => {
            dispatch({type: FETCH_PRODUCT_ITEMS, status: FETCH_FAILURE});
            dispatch(setAlert({message: `Error loading sku item list: ${err.message}`}));
        });
};

