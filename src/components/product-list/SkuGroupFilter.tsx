import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectShowInactive, selectSkuGroupFilter, setSkuGroupFilter} from "@/ducks/productList/productListSlice.ts";
import {InputGroup} from "react-bootstrap";
import {useId} from "react";
import SkuGroupSelect from "@/components/common/SkuGroupSelect.tsx";

export default function SkuGroupFilter() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSkuGroupFilter);
    const includeInactive = useAppSelector(selectShowInactive)
    const id = useId();

    const changeHandler = (value: number | null) => {
        dispatch(setSkuGroupFilter(value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>SKU Group</InputGroup.Text>
            <SkuGroupSelect includeAll value={value} id={id} onChange={changeHandler} includeInactive={includeInactive}/>
        </InputGroup>
    )
}
