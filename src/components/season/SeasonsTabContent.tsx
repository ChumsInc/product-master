import {lazy, Suspense} from "react";

const SeasonsContainer = lazy(() => import("@/components/season/SeasonsContainer.tsx"));

export default function SeasonsTabContent() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SeasonsContainer/>
        </Suspense>
    )
}
