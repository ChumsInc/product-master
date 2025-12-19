import type {ReactNode} from "react";
import {Tab, Tabs} from "react-bootstrap";

export const tabProductList = 'product-list';
export const tabProductEdit = 'product-edit';
export const tabSettings = 'settings';
export const tabAbout = 'about';

const tabs: TabProps[] = [
    {id: tabProductList, title: 'Products'},
    {id: tabProductEdit, title: 'Edit Product'},
    {id: tabSettings, title: 'Settings'},
    {id: tabAbout, title: 'About'}
]

export interface AppNavigationProps {
    tab: string,
    onChangeTab: (tab: string|null) => void
}
export default function AppNavigation({tab, onChangeTab}:AppNavigationProps) {
    return (
        <Tabs className="mb-3" activeKey={tab} onSelect={onChangeTab}>
            {tabs.map(t => (
                <Tab key={t.id} title={t.title} eventKey={t.id} disabled={t.disabled} />
            ))}
        </Tabs>
    )
}

export interface TabProps {
    id: string,
    title: string|ReactNode,

    /** Bootstrap icon className */
    icon?: string,

    canClose?: boolean,
    disabled?: boolean,
}
