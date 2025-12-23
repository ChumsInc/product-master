import type {ProductStatusAttributes} from "chums-types";
import {Dropdown, type DropdownProps, type DropdownToggleProps} from "react-bootstrap";
import StatusDropdownItem from "@/components/status/StatusDropdownItem.tsx";
import StatusList from "@/components/status/StatusList.tsx";
import {statusKeys} from "@/components/status/badgeStyles.ts";
import styled from "@emotion/styled";

const StatusDropdownToggle = styled(Dropdown.Toggle)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
export interface StatusDropdownProps extends Omit<DropdownProps, 'onChange'|'children'> {
    status: ProductStatusAttributes;
    onChange: (status: ProductStatusAttributes) => void;
    showAbbreviations?: boolean;
    buttonAttributes?: DropdownToggleProps;
    includeAll?: boolean;
}

const allStatus:ProductStatusAttributes = {
    new: true,
    approved: true,
    live: true,
    updating: true,
    watch: true,
    discontinued: true,
}
const noneStatus:ProductStatusAttributes = {
    new: false,
    approved: false,
    live: false,
    updating: false,
    watch: false,
    discontinued: false,
}

export default function StatusDropdown({status, onChange, showAbbreviations, id, buttonAttributes, includeAll, ...rest}: StatusDropdownProps) {
    const changeHandler = (code: keyof ProductStatusAttributes) => {
        onChange({...status, [code]: !status[code]});
    }
    return (
        <Dropdown {...rest}>
            <StatusDropdownToggle size="sm" variant="outline-secondary" id={id} aria-label="Current Status values"
                             {...buttonAttributes}>
                <StatusList status={status} showAbbreviations={showAbbreviations}/>
            </StatusDropdownToggle>
            <Dropdown.Menu>
                {includeAll && (
                    <StatusDropdownItem code="all" checked={false}
                                        onClick={() => onChange(allStatus)}/>
                )}
                {includeAll && (
                    <StatusDropdownItem code="none" checked={false}
                                        onClick={() => onChange(noneStatus)}/>
                )}
                <Dropdown.Divider/>
                {statusKeys.map(k => (
                    <StatusDropdownItem key={k} code={k} checked={status[k]}
                                        onClick={() => changeHandler(k)}/>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
