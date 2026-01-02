import {lazy, Suspense} from "react";

const ProductContent = lazy(() => import("@/components/product-editor/ProductContent.tsx"));


export default function ProductTabContent() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductContent />
        </Suspense>
    )
}
