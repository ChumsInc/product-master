import {type BadgeProps} from "react-bootstrap";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSeasonById} from "@/ducks/settings/seasonsSlice.ts";
import ColorBadge from "@/components/season/ColorBadge.tsx";

export interface SeasonBadgeProps extends BadgeProps {
    seasonId?: number | null,
}

export default function SeasonBadge({seasonId, ...rest}: SeasonBadgeProps) {
    const season = useAppSelector((state) => selectSeasonById(state, seasonId ?? 0));
    if (!season) {
        return null;
    }
    return (
        <ColorBadge color={season.properties.color} {...rest}>
            {season.code}
        </ColorBadge>
    )
}
