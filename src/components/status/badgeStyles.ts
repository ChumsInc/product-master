import type {ProductStatusAttributes} from "chums-types";
import type {Variant} from "react-bootstrap/types";

export const statusKeys:Array<keyof ProductStatusAttributes> = ["new", "approved", "live", "updating", 'watch',"discontinued"];

export const badgeStyles: Record<keyof ProductStatusAttributes|'all'|'none', Variant> = {
    new: 'secondary',
    approved: 'primary',
    live: 'success',
    updating: 'info',
    watch: 'warning',
    discontinued: 'danger',
    all: 'light',
    none: 'dark',
}

export const statusTitles: Record<keyof ProductStatusAttributes|'all'|'none', string> = {
    new: 'New',
    approved: 'Approved',
    live: 'Live',
    updating: 'Updating',
    watch: 'Watch',
    discontinued: 'Discontinued',
    all: 'All',
    none: 'None',
}

export const statusAbbreviations:Record<keyof ProductStatusAttributes|'all'|'none', string> = {
    new: "N",
    updating: "U",
    approved: "A",
    live: "L",
    watch: "W",
    discontinued: "D",
    all: 'ALL',
    none: '-',
}


export const statusClassNames:Record<keyof ProductStatusAttributes|'all'|'none', string> = {
    new: "text-light",
    approved: "text-light",
    live: "text-light",
    updating: "text-dark",
    watch: "text-dark",
    discontinued: "text-light",
    all: "text-dark",
    none: "text-light",
}
