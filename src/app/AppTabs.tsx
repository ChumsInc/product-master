import React from "react";
import NavTabsList from "../components/NavTabList";
import {NavTab} from "./types";


export interface KeyedNavTabList {
    [key: string]: NavTab,
}

export interface AppTabs extends KeyedNavTabList {
    products: NavTab,
    product: NavTab,
    settings: NavTab,
}

export const tabKey = 'app-tabs';
export const appTabs: AppTabs = {
    products: {id: 'products', title: 'Products', to: '/products'},
    product: {id: 'product', title: 'New Product', to: '/product/:id'},
    settings: {id: 'settings', title: 'Settings', to: '/settings'},
}

const tabList: NavTab[] = [appTabs.products, appTabs.product, appTabs.settings];

export const toProductIdPath = (id:number) => `/product/${encodeURIComponent(id)}`;


const AppTabs: React.FC = () => {
    return (
        <NavTabsList tabKey={tabKey} tabs={tabList}/>
    )
}

export default AppTabs;
