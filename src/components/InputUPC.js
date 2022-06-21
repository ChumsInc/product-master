import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatUPC} from '../utils/upc';
import TextInput from "../common-components/TextInput";

export default class InputUPC extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        field: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange({field, value}) {
        this.props.onChange({field, value: value.replace(/\D/g, '')});
    }

    onBlur() {
        const {field, value} = this.props;
        this.props.onChange({field, value: formatUPC(value).replace(/\D/g, '')});
    }

    render() {
        const {value, field, onChange, ...rest} = this.props;
        const upc = formatUPC(value, false);
        return (
            <TextInput value={upc} field={field}
                       onChange={this.onChange}
                       blurFunction={formatUPC}
                   {...rest}/>
        )
    }
}
