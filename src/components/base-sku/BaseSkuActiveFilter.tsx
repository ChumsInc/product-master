import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectShowInactiveBaseSKUs, setShowInactiveBaseSKUs} from "@/ducks/base-sku/baseSkuSlice.ts";
import {type ChangeEvent, useId} from "react";
import {FormCheck} from "react-bootstrap";

export default function BaseSkuActiveFilter() {
    const dispatch = useAppDispatch();
    const showInactive = useAppSelector(selectShowInactiveBaseSKUs);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowInactiveBaseSKUs(ev.target.checked));
    }

    return (
        <FormCheck type="checkbox" id={id} label="Show inactive" checked={showInactive} onChange={changeHandler}/>
    )
}
