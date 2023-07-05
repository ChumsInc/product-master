import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectTabList, tabListCreatedAction} from "chums-connected-components";
import NavTabItem from "./NavTabItem";
import {useAppDispatch} from "../app/configureStore";
import {NavTab} from "../app/types";

export interface  NavTabsListProps {
    tabKey: string,
    tabs: NavTab[]
}

const NavTabsList = ({tabKey, tabs}:NavTabsListProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(tabListCreatedAction(tabs, tabKey));
    }, []);

    const list = useSelector(selectTabList(tabKey)) as NavTab[];
    return (
        <ul className="nav nav-tabs mb-1">
            {list.map(tab => (<NavTabItem key={tab.id} to={tab.to} title={tab.title} />))}
        </ul>
    )
}

export default NavTabsList;
