import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class NumberInput extends PureComponent {
    static propTypes = {
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        onSave: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
    }


    onChange(ev) {
        this.props.onChange(Number(ev.target.value));
    }

    onIncrement() {
        const {step = 1, max} = this.props;
        let {value} = this.props;
        value += Number(step);
        if (max !== undefined && value > Number(max)) {
            value = Number(max);
        }
        this.props.onChange(value);
    }

    onDecrement() {
        const {step = 1, min} = this.props;
        let {value} = this.props;
        value -= Number(step);
        if (min !== undefined && value < Number(min)) {
            value = Number(min);
        }
        this.props.onChange(value);
    }

    render() {
        const {value, onChange, onSave, className, ...rest} = this.props;
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <button type="button" className="btn btn-sm btn-outline-secondary"
                            onClick={this.onDecrement}>
                        <span className="oi oi-minus"/>
                    </button>
                </div>
                <input type="number" className={classNames("form-control form-control-sm right", className)}
                       value={value} onChange={this.onChange} {...rest} />
                <div className="input-group-append">
                    <button type="button" className="btn btn-sm btn-outline-secondary"
                            onClick={this.onIncrement}>
                        <span className="oi oi-plus"/>
                    </button>
                </div>
                {
                    typeof onSave === 'function' &&
                    <div className="input-group-append">
                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                onClick={this.onIncrement}>
                            <span className="oi oi-check" title="Save" />
                        </button>
                    </div>
                }
            </div>
        );
    }
}
