import type {ProductStatusAttributes} from "chums-types";
import {Badge} from "react-bootstrap";
import {
    badgeStyles,
    statusAbbreviations,
    statusClassNames,
    statusKeys,
    statusTitles
} from "@/components/status/badgeStyles.ts";
import clsx from "clsx";


export interface StatusListProps {
    status: ProductStatusAttributes;
    showAbbreviations?: boolean;
}
export default function StatusList({status, showAbbreviations}:StatusListProps) {
    const titles = showAbbreviations ? statusAbbreviations : statusTitles;

    return (
        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'flex-start'}}>
            {statusKeys
                .filter(k => status[k])
                .map(k => <Badge key={k} bg={badgeStyles[k]}
                                 className={clsx(statusClassNames[k], "ms-1")}>
                    {titles[k]}
                </Badge>)}
        </div>
    )
}
