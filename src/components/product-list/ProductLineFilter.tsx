import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {
    selectProductLineFilter,
    selectShowInactive,
    setProductLineFilter
} from "@/ducks/productList/productListSlice.ts";
import {type ChangeEvent, useId} from "react";
import ProductLineSelect from "@/components/product-line/ProductLineSelect.tsx";
import {InputGroup} from "react-bootstrap";

export default function ProductLineFilter() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectProductLineFilter);
    const includeInactive = useAppSelector(selectShowInactive)
    const id = useId();


    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductLineFilter(ev.target.value))
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Product Line</InputGroup.Text>
            <ProductLineSelect value={value ?? ''} onChange={changeHandler}
                               includeAll includeDiscontinued={includeInactive}/>
        </InputGroup>
    )
}
