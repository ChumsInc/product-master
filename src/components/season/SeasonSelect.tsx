import {FormSelect, type FormSelectProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSeasons} from "@/ducks/settings/seasonsSlice.ts";
import type {ChangeEvent, OptionHTMLAttributes} from "react";
import {seasonSorter} from "@/ducks/settings/utils.ts";
import {getSeasonStyle} from "@/components/season/utils.ts";
import type {ProductSeason} from "chums-types";

export interface SeasonSelectProps extends Omit<FormSelectProps, 'value' | 'onChange'> {
    value: number | null
    includeAll?: boolean;
    includeInactive?: boolean;
    includeDescription?: boolean;
    onChange: (value: ProductSeason | null) => void;
}

export default function SeasonSelect({
                                         value,
                                         includeInactive,
                                         includeAll,
                                         includeDescription,
                                         onChange,
                                         ...props
                                     }: SeasonSelectProps) {
    const seasons = useAppSelector(selectSeasons);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        const season = seasons.find(s => s.id === +ev.target.value);
        onChange(season ?? null);
    }

    return (
        <FormSelect value={value ?? ''} onChange={changeHandler} {...props}>
            {includeAll && (<option value="">All</option>)}
            {!includeAll && (<option value=""></option>)}
            {seasons
                .filter(s => includeInactive === true || s.active)
                .sort(seasonSorter({field: 'code', ascending: false}))
                .map(s => (
                    <SeasonOption key={s.id} value={s.id} bg={s.properties.color}>
                        {s.code}
                        {includeDescription && (<span>- {s.description}</span>)}
                    </SeasonOption>
                ))}
        </FormSelect>
    )
}

interface SeasonOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
    bg: string;
}

function SeasonOption({bg, ...rest}: SeasonOptionProps) {
    const style = getSeasonStyle(bg);
    return (
        <option {...rest} style={style}></option>
    )
}
