import {lazy, Suspense} from "react";

const SkuGroupsContent = lazy(() => import("@/components/sku-group/SKUGroupsContent.tsx"));

export default function SkuGroupsTabContent() {
    return (
        <Suspense fallback={<div>...loading</div>}>
            <SkuGroupsContent />
        </Suspense>
    )
}
