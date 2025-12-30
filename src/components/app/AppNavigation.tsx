import type {ReactNode} from "react";
import {Nav} from "react-bootstrap";
import {generatePath, Link as RoutedLink, useMatch} from "react-router";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentProduct} from "@/ducks/product/currentProductSlice.ts";

export const tabProductList = 'product-list';
export const tabProductEdit = 'product-edit';
export const tabSettings = 'settings';
export const tabAbout = 'about';

const tabs: TabProps[] = [
    {
        id: tabProductList,
        to: '/product-list',
        title: 'Product List'
    },
    {
        id: tabProductEdit,
        to: (id: string | null) => id ? generatePath('/product-edit/:id', {id}) : '/product-edit',
        title: 'Product Edit'
    },
    {id: 'seasons', to: '/seasons', title: 'Seasons'},
    {id: 'sku-groups', to: '/sku-groups', title: 'SKU Groups'},
    {
        id: tabSettings,
        to: '/settings',
        title: 'Settings'
    },
    {id: tabAbout, to: '/about', title: 'About'}
]

export default function AppNavigation() {
    const match = useMatch('/:tab/:id?');
    const activeKey = match?.params?.tab ?? tabs[0].id;
    const product = useAppSelector(selectCurrentProduct);
    return (
        <Nav className="mb-3" activeKey={activeKey} variant="tabs">
            {tabs.map(t => (
                <Nav.Item key={t.id}>
                    <Nav.Link as={RoutedLink} eventKey={t.id}
                              to={typeof t.to === 'function' ? t.to(`${product?.id ?? ''}`) : t.to}
                              disabled={t.disabled}>
                        {t.title}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    )
}

export interface TabProps {
    id: string,
    to: string | ((href: string) => string),
    title: string | ReactNode,

    /** Bootstrap icon className */
    icon?: string,

    canClose?: boolean,
    disabled?: boolean,
}
