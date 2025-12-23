import type {ProductStatusAttributes} from "chums-types";
import {DropdownItem, type DropdownItemProps} from "react-bootstrap";
import StatusBadge from "@/components/status/StatusBadge.tsx";

export interface StatusDropdownItemProps extends DropdownItemProps {
    code: keyof ProductStatusAttributes|'all'|'none';
    checked?: boolean;
}

export default function StatusDropdownItem({code, checked, ...rest}: StatusDropdownItemProps) {
    return (
        <DropdownItem {...rest}>
            <StatusBadge code={code} showChecked checked={checked}/>
        </DropdownItem>
    )
}
