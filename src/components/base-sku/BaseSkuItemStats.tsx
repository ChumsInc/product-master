import type {BaseSKU} from "chums-types";

export interface BaseSkuItemStats {
    stats: BaseSKU['itemStats']|null
}
export default function BaseSkuItemStats({stats}:BaseSkuItemStats) {
    if (!stats) return null;
    return (
        <span>{stats.activeItems}/{stats.items}</span>
    )
}
