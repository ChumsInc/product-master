import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppTabs from "./AppTabs";
import {useAppDispatch} from "./configureStore";
import {loadSettingsAction} from "../ducks/settings/actions";
import ProductListScreen from "../ducks/product-list/components/ProductListScreen";
import ProductContainer from "../ducks/product/components/ProductContainer";
import SettingsContainer from "../components/SettingsContainer";
import SeasonsContainer from "../components/SeasonsContainer";
import ColorsContainer from "../components/ColorsContainer";
import MixesContainer from "../components/MixesContainer";
import SKUGroupsContainer from "../components/SKUGroupsContainer";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadSettingsAction());
    }, []);


    return (
        <BrowserRouter>
            <AppTabs/>
            <Routes>
                <Route path="/products" element={<ProductListScreen/>}/>
                <Route path="/product/:id" element={<ProductContainer/>}/>
                <Route path="/settings" element={<SettingsContainer />}>
                    <Route path="seasons" element={<SeasonsContainer />} />
                    <Route path="colors" element={<ColorsContainer />} />
                    <Route path="mixes" element={<MixesContainer />} />
                    <Route path="sku-groups" element={<SKUGroupsContainer />} />
                    <Route path="categories" element={<SKUGroupsContainer />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
