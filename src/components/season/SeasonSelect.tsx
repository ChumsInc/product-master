import {FormSelect, type FormSelectProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSeasons} from "@/ducks/settings/seasonsSlice.ts";
import type {ChangeEvent, OptionHTMLAttributes} from "react";
import {seasonSorter} from "@/ducks/settings/utils.ts";
import tinycolor from "tinycolor2";

export interface SeasonSelectProps extends Omit<FormSelectProps, 'value' | 'onChange'> {
    value: number | null
    includeAll?: boolean;
    includeInactive?: boolean;
    includeDescription?: boolean;
    onChange: (value: number | null) => void;
}

export default function SeasonSelect({value, includeInactive, includeAll, includeDescription, onChange, ...props}: SeasonSelectProps) {
    const seasons = useAppSelector(selectSeasons);
    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        onChange(ev.target.value ? +ev.target.value : null);
    }
    const list = seasons.filter(s => includeInactive === true || s.active)
        .sort(seasonSorter({field: 'code', ascending: false}))
    return (
        <FormSelect value={value ?? ''} onChange={changeHandler} {...props}>
            {includeAll && (<option value="">All</option>)}
            {list.map(s => (
                <SeasonOption value={s.id} bg={s.properties.color}>
                    {s.code}
                    {includeDescription && (<span>- {s.description}</span>)}
                </SeasonOption>
            ))}
        </FormSelect>
    )
}

interface SeasonOptionProps extends OptionHTMLAttributes<HTMLOptionElement>{
    bg: string;
}
function SeasonOption({bg, ...rest}:SeasonOptionProps) {
    const style = {
        backgroundColor: bg,
        color: tinycolor(bg).isLight() ? 'black' : 'white'
    };
    return (
        <option {...rest} style={style}></option>
    )
}
