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
    checked?: boolean;
    onClick: (checked: boolean) => void;
}

export default function ColumnToggleItem({field, checked, onClick, ...rest}: ColumnToggleItemProps) {
    const id = useId();
    const label = columnNames[field] ?? field;

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        onClick(ev.target.checked);
    }

    const clickHandler = () => {
        onClick(!checked);
    }

    return (
        <DropdownItem checked={checked} onClick={clickHandler} {...rest} className="d-flex justify-content-between">
            <ColumnLabel htmlFor={id}>{label}</ColumnLabel>
            <ColumnCheckbox type="checkbox" id={id} checked={checked} onChange={changeHandler}/>
        </DropdownItem>
    )
}
