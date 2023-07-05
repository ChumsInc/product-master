import React from 'react';

const DropDownItem = ({value, label, onClick}) => {
    return (
        <a className="dropdown-item" onClick={() => onClick(value)}>{label}</a>
    )
};

export default DropDownItem;
