import {type ProductDimension, type ProductMaster} from "chums-types";

export type ProductMasterColumn = keyof Omit<FlattenedProductMaster, 'active' | 'company' | 'sellAsSelf' | 'sellAsMix' | 'sellAsColors' | 'attributes' | 'userId'>;
export type ProductListColumns = Record<ProductMasterColumn, boolean>;
export type ProductListColumnNames = Record<ProductMasterColumn, string>;

export interface FlattenedProductMaster extends ProductMaster {
    'attributes.dimensions': ProductDimension | undefined,
    'attributes.dimensions.weight': ProductDimension['weight'],
    'attributes.dimensions.volume': ProductDimension['volume'],
    'attributes.shippingDimensions': ProductDimension | undefined,
    'attributes.shippingDimensions.weight': ProductDimension['weight'],
    'attributes.shippingDimensions.volume': ProductDimension['volume'],
    'attributes.casePackDimensions': ProductDimension | undefined,
    'attributes.casePackDimensions.weight': ProductDimension['weight'],
    'attributes.casePackDimensions.volume': ProductDimension['volume'],
}

