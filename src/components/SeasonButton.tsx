import React from 'react';
import CustomColorButton from "./CustomColorButton";
import classNames from 'classnames';
import {ProductSeason} from "chums-types";

export interface SeasonButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    season: ProductSeason,
    selected: boolean,
}
const SeasonButton = ({season, className = '', selected = false, onClick, ...props}:SeasonButtonProps) => {
    return (
        <CustomColorButton hexColor={season.properties?.color} className={classNames("btn btn-sm", className)}
                           onClick={onClick} title={season.description} {...props}>
            {season.code}
            {selected ? ' ✔' : ''}
        </CustomColorButton>
    );
};

export default SeasonButton;
