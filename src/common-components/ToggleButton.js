import React, {Component} from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';


export const buttonStyles = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    danger: 'danger',
    warning: 'warning',
    info: 'info',
    light: 'light',
    dark: 'dark'
};

export default class ToggleButton extends Component {
    static propTypes = {
        checked: PropTypes.bool.isRequired,
        label: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        style: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
        className: PropTypes.string,
        field: PropTypes.string,
    };


    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {field, checked} = this.props;
        this.props.onClick({field, value: !checked});
    }

    render() {
        const {checked, style = buttonStyles.secondary, label, className, children, ...rest} = this.props;
        return (
            <button type="button" {...rest}
                    className={classNames('btn btn-sm', className, {
                        [`btn-outline-${style}`]: !checked,
                        [`btn-${style}`]: checked
                    })}
                    onClick={this.onClick}>
                {label || children || 'Toggle'}
            </button>
        )
    }
};

