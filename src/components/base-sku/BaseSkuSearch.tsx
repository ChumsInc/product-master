import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectBaseSKUSearch} from "@/ducks/base-sku/baseSkuSlice.ts";
import {useDebouncedCallback} from "@mantine/hooks";
import {setSKUGroupSearch} from "@/ducks/sku-groups/skuGroupsSlice.ts";
import {type ChangeEvent, useState} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

export default function BaseSkuSearch() {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectBaseSKUSearch);
    const changeHandler = (value: string) => {
        dispatch(setSKUGroupSearch(value));
    }

    return (
        <BaseSkuFilterInput value={value} onChange={changeHandler}/>
    )
}

interface BaseSkuFilterInputProps {
    value: string;
    onChange: (value: string) => void;
}

function BaseSkuFilterInput({value, onChange}: BaseSkuFilterInputProps) {
    const [filter, setFilter] = useState<string>(value);
    const updateSearch = useDebouncedCallback(async (value: string) => {
        onChange(value);
    }, 500);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setFilter(ev.target.value);
        updateSearch(ev.target.value);
    }
    return (
        <InputGroup size="sm">
            <InputGroup.Text>Search</InputGroup.Text>
            <FormControl type="search" value={filter} onChange={changeHandler}/>
        </InputGroup>
    )
}
