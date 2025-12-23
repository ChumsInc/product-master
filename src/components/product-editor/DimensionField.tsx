import {FormControl, type FormControlProps, InputGroup} from "react-bootstrap";
import clsx from "clsx";

export interface DimensionFieldProps extends FormControlProps {
    unit: string;
}
export default function DimensionField({value, onChange, unit, className, ...rest}:DimensionFieldProps) {
    return (
        <InputGroup size="sm">
            <FormControl value={value} onChange={onChange} className={clsx('text-start', className)} {...rest} />
            <InputGroup.Text>{unit}</InputGroup.Text>
        </InputGroup>
    )
}
