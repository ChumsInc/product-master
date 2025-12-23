import InputGroup from "react-bootstrap/InputGroup";
import StatusDropdown from "@/components/status/StatusDropdown.tsx";
import {useId} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectStatusFilter, setStatusFilter} from "@/ducks/productList/productListSlice.ts";
import type {ProductStatusAttributes} from "chums-types";
import {LocalStore} from "@chumsinc/ui-utils";
import {productListStatusFiltersKey} from "@/utils/storageKeys.ts";

export default function StatusFilter() {
    const dispatch = useAppDispatch();
    const currentStatus = useAppSelector(selectStatusFilter);

    const changeHandler = (status:ProductStatusAttributes) => {
        const nextStatus = {...currentStatus, ...status};
        LocalStore.setItem<ProductStatusAttributes>(productListStatusFiltersKey, nextStatus)
        dispatch(setStatusFilter(nextStatus))
    }

    const id = useId();
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Status</InputGroup.Text>
            <StatusDropdown status={currentStatus} onChange={changeHandler} includeAll />
        </InputGroup>
    )
}
