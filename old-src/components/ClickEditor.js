import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextInput from "../common-components/TextInput";

export default class ClickEditor extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        isNew: PropTypes.bool,
        readOnly: PropTypes.bool,
    };

    static defaultProps = {
        readOnly: false,
        isNew: false,
    };

    state = {
        hasFocus: false
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        this.setState({hasFocus: true});
    }

    onBlur() {
        this.setState({hasFocus: false});
    }

    onChange({field, value}) {
        this.props.onChange({field, value});
    }


    render() {
        const {value, field, onChange, className, isNew, readOnly, ...rest} = this.props;
        const {hasFocus} = this.state;

        return (
            <TextInput onChange={this.onChange} value={value} field={field}
                       className="form-control-lg"
                       readOnly={!(hasFocus || isNew) || readOnly}
                       onClick={this.onClick}
                       onBlur={this.onBlur} {...rest} />
        )
    }
}
