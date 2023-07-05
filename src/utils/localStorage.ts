export function getLocalStorage<T>(key:string):T|null {
    if (window.localStorage) {
        const value = window.localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }
    return null;
}

export const setLocalStorage = (key:string, value:any) => {
    if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
};

const LS_PREFIX = 'product-master';

export const storageKeys = {
    productList: {
        fields: `${LS_PREFIX}/product-list/fields`,
        filters: `${LS_PREFIX}/product-list/filters`,
    }
}

