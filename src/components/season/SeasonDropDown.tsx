import type {ProductSeason} from "chums-types";
import {Dropdown, type DropdownProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSortedSeasons} from "@/ducks/settings/seasonsSlice.ts";
import SeasonBadge from "@/components/season/SeasonBadge.tsx";

export interface SeasonDropDownProps extends Omit<DropdownProps, 'onChange' | 'children'> {
    value?: number | null,
    includeAll?: boolean,
    onChange: (season: ProductSeason | null) => void,
}

export default function SeasonDropDown({value, includeAll, onChange, id, ...rest}: SeasonDropDownProps) {
    const seasons = useAppSelector(selectSortedSeasons);

    return (
        <Dropdown {...rest}>
            <Dropdown.Toggle variant="outline-secondary" id={id}>
                {value === null && 'All '}
                <SeasonBadge seasonId={value}/>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
                {includeAll && (
                    <Dropdown.Item onClick={() => onChange(null)} className="text-center">
                        All
                    </Dropdown.Item>
                )}
                {seasons.map(season => (
                    <Dropdown.Item key={season.id} onClick={() => onChange(season)} className="text-center">
                        <SeasonBadge seasonId={season.id}/>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
