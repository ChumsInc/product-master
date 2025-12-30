import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {
    selectSKUGroupSearch,
    selectSKUGroupsShowInactive,
    setShowInactiveSKUGroups,
    setSKUGroupSearch
} from "@/ducks/sku-groups/skuGroupsSlice.ts";
import {type ChangeEvent, useId, useState} from "react";
import {loadSkuGroups} from "@/ducks/sku-groups/actions.ts";
import {useDebouncedCallback} from "@mantine/hooks";
import {Button, Col, FormCheck, FormControl, InputGroup, Row} from "react-bootstrap";

export default function SkuGroupFilter() {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectSKUGroupSearch);
    const showInactive = useAppSelector(selectSKUGroupsShowInactive);
    const idShowInactive = useId();

    const reloadHandler = () => {
        dispatch(loadSkuGroups())
    }

    const toggleInactiveHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShowInactiveSKUGroups(ev.target.checked));
    }

    return (
        <Row className="g-3 align-items-center">
            <Col xs="auto">
                <SkuGroupFilterValue search={search} key={search}/>
            </Col>
            <Col xs="auto">
                <FormCheck id={idShowInactive} label="Show Inactive"
                           checked={showInactive} onChange={toggleInactiveHandler}/>
            </Col>
            <Col/>
            <Col xs="auto">
                <Button type="button" variant="outline-primary" size="sm" onClick={reloadHandler}>
                    Reload
                </Button>
            </Col>

        </Row>
    )
}

interface SkuGroupFilterValueProps {
    search: string;
}

function SkuGroupFilterValue({search}: SkuGroupFilterValueProps) {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>(search);
    const idSearch = useId();
    const updateSearch = useDebouncedCallback(async (value: string) => {
        dispatch(setSKUGroupSearch(value))
    }, 500);

    const onChangeSearch = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
        updateSearch(ev.target.value);
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={idSearch}>Search</InputGroup.Text>
            <FormControl type="search" id={idSearch} value={value} onChange={onChangeSearch}/>
        </InputGroup>
    )
}
