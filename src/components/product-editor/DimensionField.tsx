import {FormControl, type FormControlProps, InputGroup} from "react-bootstrap";
import clsx from "clsx";
import {useId} from "react";

export interface DimensionFieldProps extends FormControlProps {
    label: string;
    unit: string;
}
export default function DimensionField({label, value, onChange, unit, className, ...rest}:DimensionFieldProps) {
    const id = useId();
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={rest.id ?? id}>{label}</InputGroup.Text>
            <FormControl id={rest.id ?? id} value={value} onChange={onChange} className={clsx('text-end', className)} {...rest} />
            <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup>
    )
}
