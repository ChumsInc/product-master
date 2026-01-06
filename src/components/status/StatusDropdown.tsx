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
    status: ProductStatusAttributes|null;
    onChange: (status: ProductStatusAttributes|null) => void;
    showAbbreviations?: boolean;
    buttonAttributes?: DropdownToggleProps;
    includeAll?: boolean;
}

export default function StatusDropdown({status, onChange, showAbbreviations, id, buttonAttributes, includeAll, ...rest}: StatusDropdownProps) {
    const changeHandler = (code: keyof ProductStatusAttributes) => {
        if (!status) {
            onChange({[code]: true});
            return;
        }
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
                    <>
                        <StatusDropdownItem code="all" checked={!status}
                                            onClick={() => onChange(null)}/>
                        <Dropdown.Divider/>
                    </>
                )}
                {statusKeys.map(k => (
                    <StatusDropdownItem key={k} code={k} checked={status?.[k]}
                                        onClick={() => changeHandler(k)}/>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
