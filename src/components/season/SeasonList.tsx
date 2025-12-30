import type {ProductSeason} from "chums-types";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSortedSeasons} from "@/ducks/settings/seasonsSlice.ts";
import SeasonBadge from "@/components/season/SeasonBadge.tsx";

export interface SeasonListProps {
    onSelect: (season:ProductSeason) => void;
}
export default function SeasonList({onSelect}:SeasonListProps) {
    const seasons = useAppSelector(selectSortedSeasons);

    return (
        <div className="d-flex flex-column">
            {seasons.map(season => (
                <SeasonBadge key={season.id} as="button" seasonId={season.id} className="my-2 fs-5"
                             onClick={() => onSelect(season)}/>
            ))}
        </div>
    )

}
