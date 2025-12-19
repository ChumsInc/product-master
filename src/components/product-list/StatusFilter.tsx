import InputGroup from "react-bootstrap/InputGroup";
import StatusDropdown from "@/components/status/StatusDropdown.tsx";
import {useId} from "react";

export default function StatusFilter() {
    const id = useId();
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>Status</InputGroup.Text>
            <StatusDropdown />
        </InputGroup>
    )
}
