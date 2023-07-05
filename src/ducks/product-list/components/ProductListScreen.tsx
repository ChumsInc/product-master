import React from 'react';
import ProductList from "./ProductList";
import ProductInactiveFilter from "./ProductInactiveFilter";
import ProductLineFilter from "./ProductLineFilter";
import SKUGroupFilter from "./SKUGroupFilter";
import ProductSeasonFilter from "./ProductSeasonFilter";
import ProductStatusAttributesFilter from "./ProductStatusAttributesFilter";
import {SpinnerButton} from "chums-components";
import {loadProductListAction} from "../index";
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductListLoading} from "../selectors";
import {AlertList} from "chums-connected-components";
import {loadProductList} from "../actionTypes";
import ProductSearchFilter from "./ProductSearchFilter";

const ProductListScreen = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectProductListLoading);

    const reloadHandler = () => {
        if (!loading) {
            dispatch(loadProductListAction());
        }
    }

    return (
        <div>
            <AlertList context={loadProductList} />
            <div className="row g-3 align-items-baseline">
                <div className="col-auto">
                    <ProductInactiveFilter />
                </div>
                <div className="col-auto">
                    <ProductLineFilter />
                </div>
                <div className="col-auto">
                    <SKUGroupFilter />
                </div>
                <div className="col-auto">
                    <ProductSeasonFilter />
                </div>
                <div className="col-auto">
                    <ProductStatusAttributesFilter />
                </div>
                <div className="col-auto">
                    <ProductSearchFilter />
                </div>
                <div className="col-auto">
                    <SpinnerButton type="button" size="sm" onClick={reloadHandler} spinning={loading}>Reload</SpinnerButton>
                </div>
            </div>
            <ProductList />
        </div>
    )
}

export default ProductListScreen
