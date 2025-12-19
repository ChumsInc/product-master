import type {ProductStatusAttributes} from "chums-types";
import type {Variant} from "react-bootstrap/types";

export const badgeStyles: Record<keyof ProductStatusAttributes, Variant> = {
    'new': 'warning',
    'updating': 'info',
    'approved': 'primary',
    'live': 'success',
    'discontinued': 'danger',
}

export const badgeTitles: Record<keyof ProductStatusAttributes, string> = {
    'new': 'New',
    'updating': 'Updating',
    'approved': 'Approved',
    'live': 'Live',
    'discontinued': 'Discontinued',
}
