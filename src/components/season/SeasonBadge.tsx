import {Badge, type BadgeProps} from "react-bootstrap";
import {getSeasonStyle} from "@/components/season/utils.ts";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectSeasonById} from "@/ducks/settings/seasonsSlice.ts";

export interface SeasonBadgeProps extends BadgeProps {
    seasonId?: number | null,
}

export default function SeasonBadge({seasonId, ...rest}: SeasonBadgeProps) {
    const season = useAppSelector((state) => selectSeasonById(state, seasonId ?? 0));
    if (!season) {
        return null;
    }
    return (
        <Badge bg={season.properties.color}
               style={getSeasonStyle(season.properties.color)} {...rest}>
            {season.code}
        </Badge>
    )
}
