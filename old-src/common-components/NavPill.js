import React from 'react';
import classNames from 'classnames';

const NavPill = ({label, to, active = false, disabled = false, onClick, children, ...props}) => {
    const handleClick = (ev) => {
        ev.preventDefault();
        onClick(to);
    }
    if (disabled) {
        props.tabIndex = -1
        props['aria-disabled'] = true;
    }
    return (
        <li className="nav-item">
            <a className={classNames('nav-link', {disabled, active})} href="#" onClick={handleClick} {...props}>
                {label || children}
            </a>
        </li>
    );
};

export default NavPill;
