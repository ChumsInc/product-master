import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductLoading, selectCurrentProduct, selectProductLoaded, selectProductLoadError} from "../selectors";
import {useParams} from "react-router-dom";
import {createNewProductAction, loadProductAction} from "../actions";
import {AlertList} from "chums-connected-components";
import {loadProduct} from "../actionTypes";
import ProductEditor from "./ProductEditor";
import {updateTabsAction} from "chums-connected-components/dist/tabs";
import {appTabs, tabKey, toProductIdPath} from "../../../app/AppTabs";
import {NavTab} from "../../../app/types";
import JSONTree from "../../../components/JSONTree";

const ProductContainer = () => {
    const dispatch = useAppDispatch();
    const product = useSelector(selectCurrentProduct);
    const loading = useSelector(selectProductLoading);
    const loaded = useSelector(selectProductLoaded);
    const loadError = useSelector(selectProductLoadError);
    const params = useParams<{id: string}>()

    useEffect(() => {
        console.log('ProductContainer', params);
        if (params.id) {
            const id = Number(params.id);
            if (id === 0 && product.id !== 0) {
                dispatch(createNewProductAction());
                return;
            }
            if (!!id && !loadError && id !== product.id && !loading) {
                // dispatch(updateTabsAction<NavTab>(tabKey, [{id: appTabs.product.id, to: toProductIdPath(id)}]))
                dispatch(loadProductAction(id));
            }
        }
    }, [params.id])

 return (
        <div>
            <AlertList context={loadProduct} />
            <div className="row g-3">
                <div className="col-4">
                    <ProductEditor />
                </div>
                <div className="col-4"></div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

export default ProductContainer;
