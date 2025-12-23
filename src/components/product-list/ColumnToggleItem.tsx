import {DropdownItem, type DropdownItemProps} from "react-bootstrap";
import styled from "@emotion/styled";
import {type ChangeEvent, useId} from "react";
import {columnNames} from "@/ducks/productList/utils.ts";
import type {ProductMasterColumn} from "@/ducks/productList/types.ts";


const ColumnLabel = styled.label`
    flex: 1 1 100%;
`
const ColumnCheckbox = styled.input`
    flex: 0 0 1rem;
`

export interface ColumnToggleItemProps extends Omit<DropdownItemProps, 'onClick'> {
    field: ProductMasterColumn;
    visible?: boolean;
    onChangeVisibility: (visible: boolean) => void;
}

export default function ColumnToggleItem({field, visible, onChangeVisibility, ...rest}: ColumnToggleItemProps) {
    const id = useId();
    const label = columnNames[field] ?? field;

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        onChangeVisibility(ev.target.checked);
    }

    return (
        <DropdownItem {...rest} className="d-flex justify-content-between">
            <ColumnLabel htmlFor={id}>{label}</ColumnLabel>
            <ColumnCheckbox type="checkbox" id={id} checked={visible} onChange={changeHandler} />
        </DropdownItem>
    )
}
