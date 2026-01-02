import {HashRouter, Route, Routes} from "react-router";
import AppContent from "@/components/app/AppContent.tsx";
import {tabProductList} from "@/components/app/AppNavigation.tsx";
import ProductListContainer from "@/components/product-list/ProductListContainer.tsx";
import AppRedirect from "@/components/app/AppRedirect.tsx";
import ComingSoon from "@/components/app/ComingSoon.tsx";
import ProductTabContent from "@/components/product-editor/ProductTabContent.tsx";
import SeasonsTabContent from "@/components/season/SeasonsTabContent.tsx";
import SkuGroupsTabContent from "@/components/sku-group/SkuGroupsTabContent.tsx";

export default function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<AppContent/>}>
                    <Route index element={<AppRedirect to={`/${tabProductList}`}/>}/>
                    <Route path={`/${tabProductList}`} element={<ProductListContainer/>}/>
                    <Route path="product-edit">
                        <Route index element={<ProductTabContent/>}/>
                        <Route path=":id" element={<ProductTabContent/>}/>
                    </Route>
                    <Route path="seasons" element={<SeasonsTabContent/>}/>
                    <Route path="sku-groups">
                        <Route index element={<SkuGroupsTabContent/>}/>
                        <Route path=":id" element={<SkuGroupsTabContent/>}/>
                    </Route>
                    <Route path="colors" element={<ComingSoon/>}/>
                    <Route path="mixes" element={<ComingSoon/>}/>
                    <Route path="categories" element={<ComingSoon/>}/>
                    <Route path="about" element={<ComingSoon/>}/>
                    <Route path="*" element={<div>Content Not Found</div>}/>
                </Route>
            </Routes>
        </HashRouter>
    )
}
