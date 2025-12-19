import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectSearchFilter, setSearchFilter} from "@/ducks/productList/productListSlice.ts";
import {FormControl, InputGroup} from "react-bootstrap";
import {type ChangeEvent, useId} from "react";

export default function ProductListSearch() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSearchFilter);
    const id = useId();

    const changeHandle = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchFilter(ev.target.value));
    }
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Search</InputGroup.Text>
            <FormControl id={id} value={value ?? ''} onChange={changeHandle} />
        </InputGroup>
    )

}
