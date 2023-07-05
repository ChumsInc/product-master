import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FormGroup extends PureComponent {
    static propTypes = {
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        htmlFor: PropTypes.string,
        className: PropTypes.string,
        labelClassName: PropTypes.string,
        colWidth: PropTypes.number,
        inline: PropTypes.bool,
        helpText: PropTypes.string,
    };

    static defaultProps = {
        inline: false,
        colWidth: 0,
        className: '',
        labelClassName: '',
        label: null,
        helpText: null,
    };

    render() {
        const {label, htmlFor, className = '', labelClassName, colWidth, children, inline, helpText} = this.props;

        const colLabelClassName = (!!colWidth && colWidth < 12)
            ? `col-${12 - colWidth}`
            : null;
        const colClassName = (!!colWidth && colWidth < 12)
            ? `col-${colWidth}`
            : null;
        return (
                <div className={classNames('mb-1', {'row g-3': !inline, 'd-inline-block': inline}, className)}>
                    {(!!colWidth || !!inline) && (
                        <div className={classNames(colLabelClassName)}>
                            <label htmlFor={htmlFor} className={classNames(labelClassName)}>{label}</label>
                        </div>
                    )}
                    <div className={classNames(colClassName, className)}>
                        {children}
                        {!!helpText && <small className="form-text">{helpText}</small>}
                    </div>
                </div>
            );
    }
}


