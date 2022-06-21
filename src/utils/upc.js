/**
 * Created by steve on 1/10/2017.
 */

export const CHUMS = '000298';
export const CHISCO = '093039';
export const BEYONDCOASTAL = '';

export const raw  = (upc) => {
    let re = /[0-9]/;
    return upc.split('')
        .filter(c => re.test(c))
        .join('');
};

export const formatUPC = (gtin, autoCheckDigit = true) => {
    if (typeof gtin !== "string") {
        return gtin;
    }

    gtin = gtin.replace(/\D/g, '').replace(/\s/g, '');

    if (gtin.length > 2 && /^4[59]/.test(gtin)) {
        return formatEAN13(gtin, autoCheckDigit);
    }

    if (gtin.length > 12) {
        return gtin;
    }

    if (gtin.length < 11 && autoCheckDigit) {
        autoCheckDigit = false;
    }

    const [full, p1, p2, p3, p4] = /^([\d]{0,1})([\d]{0,5})([\d]{0,5})([\d]*)/.exec(gtin);
    return [p1, p2, p3, autoCheckDigit ? checkdigit(gtin.substr(0, 11)) : p4].join(' ').trim();
};

export const formatEAN13 = (gtin, autoCheckDigit = true) => {
    if (typeof gtin !== "string") {
        return gtin;
    }

    gtin = gtin.replace(/\D/g, '').replace(/\s/g, '');

    if (gtin.length > 13) {
        return gtin;
    }

    if (gtin.length < 12 && autoCheckDigit) {
        autoCheckDigit = false;
    }

    const [full, p1, p2, p3, p4] = /^([\d]*)([\d]{0,6})([\d]{0,6})([\d]*)/.exec(gtin);
    return [p1, p2, p3, autoCheckDigit ? checkdigit(gtin.substr(0, 13)) : p4].join(' ').trim();
};

export const checkdigit = (gtin) => {
    if (typeof gtin !== "string") {
        console.log('checkdigit() GTIN must be a string', gtin);
        return gtin;
    }
    gtin = raw(gtin.trim());

    if (gtin.length < 11) {
        // console.log('UPCA.checkdigit() UPC is too short', upc);
        return '';
    }

    let cd = {
        even: 0,
        odd: 0
    };
    gtin.split('').reverse().map((c, index) => {
        let parsed = parseInt(c, 10);
        if (index % 2 === 0) {
            cd.even += parsed;
        } else {
            cd.odd += parsed;
        }
    });
    cd.even *= 3;
    return (10 - (cd.odd + cd.even) % 10) % 10;
};
