import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectShowInactive, setShowInactive} from "@/ducks/productList/productListSlice.ts";
import {type ChangeEvent, useId} from "react";
import {FormCheck} from "react-bootstrap";

export default function ProductShowInactiveCheckbox() {
    const dispatch = useAppDispatch();
    const showInactive = useAppSelector(selectShowInactive);
    const id = useId();
    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowInactive(ev.target.checked));
    }
    return (
        <FormCheck type="checkbox" label="Include Inactive"
                   id={id} checked={showInactive}
                   onChange={changeHandler}/>
    )
}
