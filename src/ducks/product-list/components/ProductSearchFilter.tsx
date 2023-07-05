import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductLines} from "../../settings/selectors";
import {selectProductListPLFilter, selectProductListSearchFilter} from "../selectors";
import {InputGroup, Select} from "chums-components";
import {setListPLFilterAction, setListSearchFilterAction} from "../index";
import {productLineSorter} from "../../settings/utils";

const ProductSearchFilter = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectProductListSearchFilter);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setListSearchFilterAction(ev.target.value));
    }
    return (
        <InputGroup bsSize="sm">
            <div className="input-group-text"><span className="bi-binoculars-fill" /></div>
            <input type="search" className="form-control form-control-sm" value={search} onChange={changeHandler}/>
        </InputGroup>
    )
}

export default ProductSearchFilter;
