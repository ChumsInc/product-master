import {
    AdjustableDimension,
    ProductAttributes,
    ProductDimension,
    ProductMaster,
    ProductStatusAttributes, SortProps
} from "chums-types";

export type ProductField = keyof ProductMaster
    | `attributes.${keyof ProductAttributes}`
    | `attributes.${keyof Pick<ProductAttributes, 'shippingDimensions'|'casePackDimensions'|'dimensions'>}.${keyof ProductDimension}`
    | `attributes.${keyof Pick<ProductAttributes, 'adjustable'>}.${keyof AdjustableDimension}`
    | `status.${keyof ProductStatusAttributes}`
    | `season.code`;

export type ThunkActionStatus = 'idle'|'pending'|'fulfilled'|'rejected';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
export type AsyncThunkAction = ReturnType<GenericAsyncThunk['fulfilled'|'rejected'|'pending']>

export interface ProductSortProps  extends Omit<SortProps, 'field'>{
    field: ProductField;
}
