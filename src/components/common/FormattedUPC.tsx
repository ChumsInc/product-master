import {formatGTIN} from '@chumsinc/gtin-tools'
export interface FormattedUPCProps {
    upc: string;
    raw?: boolean;
}
export default function FormattedUPC({upc, raw}: FormattedUPCProps) {
    if (!upc) return null;
    return (
        <span>
            {formatGTIN(upc, raw)}
        </span>
    )
}
