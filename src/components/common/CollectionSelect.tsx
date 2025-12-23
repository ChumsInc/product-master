import {FormSelect, type FormSelectProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSubCategories} from "@/ducks/settings/subCategoriesSlice.ts";

export interface CollectionSelectProps extends Omit<FormSelectProps, 'value'> {
    value: string | null
    productLine?: string;
    includeAll?: boolean;
    includeInactive?: boolean;

}

export default function CollectionSelect({
                                             value,
                                             onChange,
                                             includeAll,
                                             ...rest
                                         }: CollectionSelectProps) {
    const subCategories = useAppSelector(selectSubCategories);

    return (
        <FormSelect value={value ?? ''} onChange={onChange} {...rest}>
            {includeAll && <option value="">All</option>}
            {!includeAll && <option value=""></option>}
            {[...subCategories].sort()
                .map(sc => <option key={sc.Category3} value={sc.Category3}>
                    {sc.Category3}
                </option>)}
        </FormSelect>
    )
}
