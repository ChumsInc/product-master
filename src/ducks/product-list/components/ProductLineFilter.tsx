import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductLines} from "../../settings/selectors";
import {selectProductListPLFilter} from "../selectors";
import {InputGroup, Select} from "chums-components";
import {setListPLFilterAction} from "../index";
import {productLineSorter} from "../../settings/utils";

const ProductLineFilter = () => {
    const dispatch = useAppDispatch();
    const productLines = useSelector(selectProductLines);
    const productLine = useSelector(selectProductListPLFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setListPLFilterAction(ev.target.value));
    }
    return (
        <InputGroup bsSize="sm">
            <div className="input-group-text">PL</div>
            <Select value={productLine} onChange={changeHandler}>
                <option value="">All</option>
                <option value="" disabled>--</option>
                {productLines
                    .filter(pl => pl.ProductLineDesc.substring(0,1) !== '#')
                    .sort(productLineSorter('ProductLineDesc'))
                    .map(pl => (<option key={pl.ProductLine} value={pl.ProductLine}>{pl.ProductLineDesc} ({pl.ProductLine})</option>))}
            </Select>

        </InputGroup>
    )
}

export default ProductLineFilter;
