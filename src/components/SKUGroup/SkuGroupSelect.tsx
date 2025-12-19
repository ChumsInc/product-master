import {FormSelect, type FormSelectProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSKUGroups} from "@/ducks/settings/skuGroupsSlice.ts";
import {skuGroupSorter} from "@/ducks/settings/utils.ts";
import type {ChangeEvent} from "react";

export interface SkuGroupSelectProps extends Omit<FormSelectProps, 'value'|'onChange'> {
    value: number|null
    onChange: (value: number|null) => void;
    productLine?: string;
    includeAll?: boolean;
    includeInactive?: boolean;

}
export default function SkuGroupSelect({value, onChange, productLine, includeInactive, includeAll, ...rest}:SkuGroupSelectProps) {
    const skuGroups = useAppSelector(selectSKUGroups);
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        onChange(ev.target.value ? +ev.target.value : null);
    }
    const groups = skuGroups
        .filter(sg => includeInactive === true || sg.active)
        .filter(sg => !productLine || sg.productLine === productLine)
        .sort(skuGroupSorter({field: 'description', ascending: true}));

    return (
        <FormSelect value={value ?? ''} onChange={changeHandler} {...rest}>
            {includeAll && <option value="">All</option> }
            {groups.map(sg => <option key={sg.id} value={sg.id}>
                {sg.description} ({sg.code})
            </option> )}
        </FormSelect>
    )
}
