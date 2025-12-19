import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectSeasonFilter, setSeasonFilter} from "@/ducks/productList/productListSlice.ts";
import SeasonSelect from "@/components/season/SeasonSelect.tsx";
import {InputGroup} from "react-bootstrap";
import {useId} from "react";

export interface SeasonFilterProps {
    includeInactive?: boolean;
}

export default function SeasonFilter({includeInactive}: SeasonFilterProps) {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectSeasonFilter);
    const id = useId();
    const changeHandler = (value: number | null) => {
        dispatch(setSeasonFilter(value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Season</InputGroup.Text>
            <SeasonSelect value={value} onChange={changeHandler} id={id}
                          includeInactive={includeInactive} includeAll/>
        </InputGroup>
    )

}
