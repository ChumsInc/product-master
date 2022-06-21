export const get = (key) => {
    if (window.localStorage) {
        return JSON.parse(window.localStorage.getItem(key) || null);
    }
    return null;
};

export const set = (key, value) => {
    if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

const LS_PREFIX = 'chums.com.intranet.productMaster';
export const LS_PRODUCT_LIST_UI = LS_PREFIX + '.productListUI';
export const LS_PRODUCT_MAIN_UI = LS_PREFIX + '.productMainUI';
