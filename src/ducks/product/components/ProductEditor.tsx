import React, {ChangeEvent, FormEvent} from "react";
import {useSelector} from "react-redux";
import {selectCurrentProduct} from "../selectors";
import {useAppDispatch} from "../../../app/configureStore";
import {updateProductAction} from "../actions";
import {FormCheck, FormColumn} from "chums-components";
import {ProductField} from "../../types";
import {codeschool as theme} from 'base16'
import {JSONView} from "json-view/dist";
import ProductStatusEditor from "./ProductStatusEditor";
// import {} from 'json-view/dist/'

const colWidth = 8;

const ProductEditor = () => {
    const dispatch = useAppDispatch();
    const product = useSelector(selectCurrentProduct);

    const changeHandler = (field:ProductField) => (ev:ChangeEvent<HTMLInputElement>) => {
        switch (field) {
        case 'devCode':
        case 'name':
        case 'productType':
        case 'productLine':
        case 'SKU':
        case 'UPC':
        case 'color':
        case 'notes':
            return dispatch(updateProductAction({[field]: ev.target.value}));
        case 'active':
        case 'sellAsSelf':
        case 'sellAsMix':
        case 'sellAsColors':
            return dispatch(updateProductAction({[field]: ev.target.checked}));
        }
    }
    const submitHandler = (ev:FormEvent) => {
        ev.preventDefault();
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <FormColumn label="Dev Code" width={colWidth}>
                    <input type="text" className="form-control form-control-sm" value={product.devCode}
                           onChange={changeHandler('devCode')} />
                </FormColumn>
                <FormColumn label="Name" width={colWidth}>
                    <input type="text" className="form-control form-control-lg" value={product.name}
                           onChange={changeHandler('name')} />
                </FormColumn>
                <FormColumn label="Active" width={colWidth}>
                    <FormCheck label={'Active Product'} checked={product.active} onChange={changeHandler('active')}  type="checkbox" />
                </FormColumn>
                <FormColumn label="Status" width={colWidth}>
                    <ProductStatusEditor />
                </FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
                <FormColumn label="" width={colWidth}></FormColumn>
            </form>
            <JSONView data={product}/>
        </>
    )
}

export default ProductEditor;
