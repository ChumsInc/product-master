import {FormSelect, type FormSelectProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSortedProductLines} from "@/ducks/settings/productLinesSlice.ts";

export interface ProductLineSelectProps extends FormSelectProps {
    includeAll?: boolean;
    includeDiscontinued?: boolean;
}

export default function ProductLineSelect({
                                              includeAll,
                                              includeDiscontinued,
                                              value,
                                              onChange,
                                              ...rest
                                          }: ProductLineSelectProps) {
    const productLines = useAppSelector(selectSortedProductLines);
    return (
        <FormSelect value={value} onChange={onChange} {...rest}>
            {includeAll && (
                <option value="">All</option>
            )}
            {productLines
                .filter(pl => includeDiscontinued || pl.active)
                .map(pl => (
                    <option key={pl.ProductLine} value={pl.ProductLine}>
                        {pl.ProductLineDesc} ({pl.ProductLine})
                    </option>
                ))
            }
        </FormSelect>
    )
}
