import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectSeasonFilter, setSeasonFilter} from "@/ducks/productList/productListSlice.ts";
import {InputGroup} from "react-bootstrap";
import {useId} from "react";
import type {ProductSeason} from "chums-types";
import SeasonDropDown from "@/components/season/SeasonDropDown.tsx";


export default function SeasonFilter() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSeasonFilter);
    const id = useId();
    const changeHandler = (value: ProductSeason | null) => {
        dispatch(setSeasonFilter(value?.id ?? null));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Season</InputGroup.Text>
            <SeasonDropDown onChange={changeHandler} value={value} id={id} includeAll/>
        </InputGroup>
    )

}
