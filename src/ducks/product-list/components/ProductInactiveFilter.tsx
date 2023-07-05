import React from 'react';
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductListActiveFilter} from "../selectors";
import {FormCheck} from "chums-components";
import {setListActiveFilterAction} from "../index";
import {setLocalStorage} from "../../../utils/localStorage";

const ProductInactiveFilter = () => {
    const dispatch = useAppDispatch();
    const active = useSelector(selectProductListActiveFilter);

    const clickHandler = () => {
        // setLocalStorage()
        dispatch(setListActiveFilterAction(!active));
    }

    return (
        <FormCheck label="Include Inactive" checked={!active} onChange={clickHandler} type="checkbox" />
    )
}

export default ProductInactiveFilter;
