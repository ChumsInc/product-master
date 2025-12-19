import {HashRouter, Route, Routes} from "react-router";
import AppContent from "@/components/app/AppContent.tsx";
import {tabProductList} from "@/components/app/AppNavigation.tsx";
import ProductListContainer from "@/components/product-list/ProductListContainer.tsx";
import AppRedirect from "@/components/app/AppRedirect.tsx";

export default function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppContent />}>
                    <Route index element={<AppRedirect to={`/${tabProductList}`} />} />
                    <Route path={`/${tabProductList}`} element={<ProductListContainer />} />
                    <Route path="*" element={<div>Content Not Found</div>} />
                </Route>
            </Routes>
        </HashRouter>
    )
}
