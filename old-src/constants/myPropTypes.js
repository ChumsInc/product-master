import PropTypes from 'prop-types';

export const inputPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const colorPropType = PropTypes.string;

export const materialPropType = PropTypes.shape({
    id: PropTypes.number,
    code: PropTypes.string,
    description: PropTypes.string,
    notes: PropTypes.string,
    active: PropTypes.bool,
});

export const dimensionPropType = PropTypes.shape({
    length: inputPropType,
    width: inputPropType,
    height: inputPropType,
    weight: inputPropType,
});

export const adjustablePropType = PropTypes.shape({
    isAdjustable: PropTypes.bool,
    name: PropTypes.string,
    min: inputPropType,
    max: inputPropType,
});

export const productAttributePropTypes = PropTypes.shape({
    productId: PropTypes.number,
    colors: PropTypes.arrayOf(colorPropType),
    material: materialPropType,
    dimensions: dimensionPropType,
    adjustable: adjustablePropType,
    shippingDimensions: dimensionPropType,
    casePackDimensions: dimensionPropType,
    notes: PropTypes.string,
});

export const skuGroup = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    code: PropTypes.string,
    description: PropTypes.string,
    notes: PropTypes.string,
    active: PropTypes.bool,
    productLine: PropTypes.string,
    tags: PropTypes.object,
});

export const propTypeProductLine = {
    ProductLine: PropTypes.string,
    ProductLineDesc: PropTypes.string,
    ProductType: PropTypes.string,
    Valuation: PropTypes.string,
    ExplodedKitItems: PropTypes.string,
    active: PropTypes.bool,
};

export const propTypeSeason = {
    id: PropTypes.number,
    code: PropTypes.string,
    description: PropTypes.string,
    properties: PropTypes.shape({
        color: PropTypes.string,
    }),
    notes: PropTypes.string,
    active: PropTypes.bool,
    userId: PropTypes.number,
}
