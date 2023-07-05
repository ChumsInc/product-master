import React from 'react';
import {useAppSelector} from "../../app/configureStore";
import {selectSeasonByCode} from "./selectors";
import {Badge} from "chums-components";

export interface SeasonBadgeProps {
    code?: string|null,
}

const SeasonBadge = ({code}:SeasonBadgeProps) => {
    if (!code) {
        return null;
    }
    const season = useAppSelector(selectSeasonByCode(code));

    return (
        <Badge color="custom" colorCode={season.properties.color} title={season.description} >{code}</Badge>
    )
}
export default SeasonBadge;
