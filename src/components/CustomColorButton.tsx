import React from 'react';
import classNames from 'classnames';
import {isLightColor} from "chums-components";

export const customColorDefaultColor = '#d9d9d9';

export interface CustomColorButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    hexColor?: string,
}
const CustomColorButton = ({hexColor = customColorDefaultColor, className, style={}, children, ...props}:CustomColorButtonProps) => {
    const isLight = isLightColor(hexColor);
    return (
        <button type="button"
                className={classNames(className, {'text-light': !isLight, 'text-dark': isLight})}
                style={{...style, backgroundColor: hexColor}} {...props}>
            {children}
        </button>
    )
};

export default CustomColorButton;
