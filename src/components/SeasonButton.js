import React from 'react';
import CustomColorButton from "./CustomColorButton";
import classNames from 'classnames';

const SeasonButton = ({code, description = '', properties = {}, className = '', selected = false, onClick}) => {
    return (
        <CustomColorButton hexColor={properties?.color} className={classNames("btn btn-sm", className)}
                           onClick={onClick} title={description}>
            {code}
            {selected ? ' ✔' : ''}
        </CustomColorButton>
    );
};

export default SeasonButton;
