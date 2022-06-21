import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

export default class Badge extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['primary', 'success', 'info', 'secondary', 'danger', 'error', 'warning', 'light', 'dark']),
        text: PropTypes.string,
        backgroundColor: PropTypes.string,
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };

    static defaultProps = {
        type: 'info',
        text: '',
        className: '',
    };

    render() {
        const {type, text, backgroundColor, className, children} = this.props;
        const badgeClassNames = classNames('badge badge-pill', className, {
            'badge-primary': type === 'primary',
            'badge-success': type === 'success',
            'badge-info': type === 'info' || (type === undefined && backgroundColor === undefined),
            'badge-secondary': type === 'secondary',
            'badge-danger': type === 'danger' || type === 'error',
            'badge-warning': type === 'warning',
            'badge-light': type === 'light',
            'badge-dark': type === 'dark',
        });
        return (
            <span className={badgeClassNames} style={{backgroundColor}}>{text || children || ''}</span>
        );
    }
}
