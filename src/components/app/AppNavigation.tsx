import type {ReactNode} from "react";
import {Nav} from "react-bootstrap";

export const tabProductList = 'product-list';
export const tabProductEdit = 'product-edit';
export const tabSettings = 'settings';
export const tabAbout = 'about';

const tabs: TabProps[] = [
    {id: tabProductList,
        title: (
            <div aria-label="Product List">
                <span className="d-none d-sm-inline" role="presentation">Product List</span>
                <span className="bi-list ms-sm-1" role="presentation"/>
            </div>
        )
    },
    {id: tabProductEdit, title: (
        <div aria-label="Product Edit">
            <span className="d-none d-sm-inline" role="presentation">Product Edit</span>
            <span className="bi-pencil-square ms-sm-1" role="presentation" />
        </div>
        )},
    {id: 'seasons', title: 'Seasons'},
    {id: tabSettings, title: 'Settings'},
    {id: tabAbout, title: 'About'}
]

export interface AppNavigationProps {
    tab: string,
    onChangeTab: (tab: string | null) => void
}

export default function AppNavigation({tab, onChangeTab}: AppNavigationProps) {
    return (
        <Nav className="mb-3" activeKey={tab} onSelect={onChangeTab} variant="tabs">
            {tabs.map(t => (
                <Nav.Item key={t.id}>
                    <Nav.Link eventKey={t.id} disabled={t.disabled}>
                        {t.title}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    )
}

export interface TabProps {
    id: string,
    title: string | ReactNode,

    /** Bootstrap icon className */
    icon?: string,

    canClose?: boolean,
    disabled?: boolean,
}
