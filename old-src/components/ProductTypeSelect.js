import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PRODUCT_TYPES} from '../constants/defaults';

export default class ProductTypeSelect extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        includeAllTypes: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(ev) {
        this.props.onChange(ev.target.value);
    }

    render() {
        const {value, includeAllTypes, onChange, ...rest} = this.props;
        const list = Object.keys(PRODUCT_TYPES).map(key => ({key, description: PRODUCT_TYPES[key]}));
        const allTypes = includeAllTypes ? (<option value="">All</option>) : (<option />);
        return (
            <select className="form-control form-control-sm" onChange={this.onChange} value={value} {...rest}>
                {allTypes}
                {list.map((t, index) => {
                    return (
                        <option key={index} value={t.key}>{t.description}</option>
                    )
                })}
            </select>
        )
    }
}
