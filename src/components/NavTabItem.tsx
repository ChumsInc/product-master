import React from 'react';
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import {NavTab} from "../app/types";


const NavTabItem = ({to, title, icon, disabled}: Omit<NavTab, 'id'>) => {
    // const match = useMatch(to as string);
    return (
        <li className="nav-item">
            <NavLink className={({isActive}) => classNames('nav-link', {disabled, active: isActive})} to={to}>
                {!!icon && <span className={classNames('nav-item-icon me-1', icon)}/>}
                <span className="nav-item-text">{title}</span>
            </NavLink>
        </li>
    )
}

export default NavTabItem;
