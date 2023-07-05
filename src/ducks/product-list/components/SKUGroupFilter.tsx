import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../../app/configureStore";
import {useSelector} from "react-redux";
import {selectProductLines, selectSKUGroups} from "../../settings/selectors";
import {selectProductListPLFilter, selectProductListSGFilter} from "../selectors";
import {InputGroup, Select} from "chums-components";
import {setListPLFilterAction, setListSGFilterAction} from "../index";
import {productLineSorter} from "../../settings/utils";

const SKUGroupFilter = () => {
    const dispatch = useAppDispatch();
    const skuGroups = useSelector(selectSKUGroups);
    const skuGroup = useSelector(selectProductListSGFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        const id = Number(ev.target.value);
        dispatch(setListSGFilterAction(id));
    }
    return (
        <InputGroup bsSize="sm">
            <div className="input-group-text">SKU Group</div>
            <Select value={skuGroup} onChange={changeHandler}>
                <option value="">All</option>
                <option value="" disabled>--</option>
                {skuGroups
                    .filter(sg => sg.active)
                    .map(sg => (<option key={sg.id} value={sg.id}>{sg.code} ({sg.description})</option>))}
            </Select>

        </InputGroup>
    )
}

export default SKUGroupFilter;
