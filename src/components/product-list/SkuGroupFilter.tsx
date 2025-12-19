import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectSkuGroupFilter, setSkuGroupFilter} from "@/ducks/productList/productListSlice.ts";
import {InputGroup} from "react-bootstrap";
import {useId} from "react";
import SkuGroupSelect from "@/components/SKUGroup/SkuGroupSelect.tsx";

export default function SkuGroupFilter() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSkuGroupFilter);
    const id = useId();

    const changeHandler = (value: number | null) => {
        dispatch(setSkuGroupFilter(value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>SKU Group</InputGroup.Text>
            <SkuGroupSelect value={value} id={id} onChange={changeHandler}/>
        </InputGroup>
    )
}
